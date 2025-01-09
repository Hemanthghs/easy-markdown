import React from "react";
import DOMPurify from "dompurify";

interface MarkdownViewerProps {
  markdown: string;
  className?: string;
  theme?: "light" | "dark";
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  markdown,
  className = "",
  theme = "light",
}) => {
  const markdownToHtml = (text: string): string => {
    // Helper function to process task lists
    text = text.replace(
      /^(\s*)-\s*\[([ x])\]\s*(.*?)$/gm,
      (match, indent, checked, content) => {
        const checkedAttr = checked === 'x' ? 'checked' : '';
        return `${indent}<li class="task-list-item"><input type="checkbox" disabled ${checkedAttr}> ${content}</li>`;
      }
    );

    // Process tables
    text = text.replace(/^\|(.+)\|(\r?\n\|[-:| ]+\|)(\r?\n\|.+\|)+/gm, (table) => {
      const rows = table.split('\n').filter(row => row.trim());
      const headers = rows[0].split('|').slice(1, -1);
      const alignments = rows[1]
        .split('|')
        .slice(1, -1)
        .map(cell => {
          if (cell.startsWith(':') && cell.endsWith(':')) return 'center';
          if (cell.endsWith(':')) return 'right';
          return 'left';
        });

      let html = '<div class="table-container"><table>';
      
      // Table header
      html += '<thead><tr>';
      headers.forEach((header, i) => {
        html += `<th class="text-${alignments[i]}">${header.trim()}</th>`;
      });
      html += '</tr></thead>';

      // Table body
      html += '<tbody>';
      rows.slice(2).forEach(row => {
        const cells = row.split('|').slice(1, -1);
        html += '<tr>';
        cells.forEach((cell, i) => {
          html += `<td class="text-${alignments[i]}">${cell.trim()}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      return html;
    });

    // Process standard markdown elements
    return text
      // Headers
      .replace(
        /^(#{1,6})\s+(.*?)(?:\s+\{#([^}]+)\})?$/gm,
        (match, hashes, content, id) => {
          const level = hashes.length;
          const idAttr = id ? ` id="${id}"` : '';
          return `<h${level}${idAttr}>${content}</h${level}>`;
        }
      )
      // Bold, italic, strikethrough
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/==(.*?)==/g, '<mark>$1</mark>')
      
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+?)(?:\s+"([^"]+)")?\)/g,
        (match, text, url, title) => {
          const titleAttr = title ? ` title="${title}"` : '';
          return `<a href="${url}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
        }
      )

      // Code blocks
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        (match, lang, code) => {
          const language = lang || 'plaintext';
          return `<pre><code class="language-${language}">${code.trim()}</code></pre>`;
        }
      )
      
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')

      // Lists
      .replace(/^\s*[\*\-]\s+(.*)$/gm, '<li>$1</li>')
      .replace(/((^\s*[\*\-]\s+.*\n?)+)/gm, '<ul>$1</ul>')
      .replace(/^\s*\d+\.\s+(.*)$/gm, '<li>$1</li>')
      .replace(/((^\s*\d+\.\s+.*\n?)+)/gm, '<ol>$1</ol>')

      // Blockquotes
      .replace(/^>\s*(.*$)/gm, '<blockquote>$1</blockquote>')

      // Paragraphs
      .replace(/(?:\r\n|\r|\n){2,}/g, '</p><p>')
      .replace(/^(?!<[uo]l|<blockquote|<h\d|<pre|<p)(.+)$/gm, '<p>$1</p>');
  };

  const sanitizedHtml = DOMPurify.sanitize(markdownToHtml(markdown), {
    ADD_TAGS: ['math'],
    ADD_ATTR: ['target'],
  });

  return (
    <div className={`card ${theme} ${className}`}>
      <div className="markdown-preview">
        <div
          className="markdown-content"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>
    </div>
  );
};