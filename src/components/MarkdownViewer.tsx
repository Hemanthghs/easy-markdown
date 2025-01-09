import React from "react";
import { Card, CardContent } from "./ui/card";
import DOMPurify from "dompurify";
import { themes } from "../styles/themes";
import { MarkdownViewerProps } from "../types";

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  markdown,
  className = "",
  theme = "light",
}) => {
  const currentTheme = themes[theme];

  // Helper function to handle task lists
  const processTaskLists = (text: string): string => {
    return text.replace(
      /^(\s*)-\s*\[([ x])\]\s*(.*?)$/gm,
      (match, indent, checked, content) => {
        const checkedAttr = checked === 'x' ? 'checked' : '';
        return `${indent}<li class="task-list-item"><input type="checkbox" disabled ${checkedAttr}> ${content}</li>`;
      }
    );
  };

  // Helper function to handle tables
  const processTables = (text: string): string => {
    const tableRegex = /^\|(.+)\|(\r?\n\|[-:| ]+\|)(\r?\n\|.+\|)+/gm;
    return text.replace(tableRegex, (table) => {
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

      let html = '<div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200 my-4">';
      
      // Table header
      html += '<thead><tr>';
      headers.forEach((header, i) => {
        html += `<th class="px-6 py-3 text-${alignments[i]} text-xs font-medium text-gray-500 uppercase tracking-wider">${header.trim()}</th>`;
      });
      html += '</tr></thead>';

      // Table body
      html += '<tbody class="divide-y divide-gray-200">';
      rows.slice(2).forEach(row => {
        const cells = row.split('|').slice(1, -1);
        html += '<tr>';
        cells.forEach((cell, i) => {
          html += `<td class="px-6 py-4 text-${alignments[i]}">${cell.trim()}</td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table></div>';
      return html;
    });
  };

  // Helper function to handle footnotes
  const processFootnotes = (text: string): string => {
    const footnotes = new Map();
    
    // First pass: collect footnotes
    text.replace(/^\[\^(\d+)\]:\s+(.+)$/gm, (match, ref, content) => {
      footnotes.set(ref, content.trim());
      return '';
    });

    // Second pass: replace footnote references
    text = text.replace(/\[\^(\d+)\]/g, (match, ref) => {
      if (footnotes.has(ref)) {
        return `<sup class="footnote-ref"><a href="#footnote-${ref}">${ref}</a></sup>`;
      }
      return match;
    });

    // Add footnotes section if there are any
    if (footnotes.size > 0) {
      text += '\n\n<div class="footnotes">\n<hr>\n<ol>';
      footnotes.forEach((content, ref) => {
        text += `\n<li id="footnote-${ref}">${content} <a href="#footnote-ref-${ref}" class="footnote-backref">↩</a></li>`;
      });
      text += '\n</ol>\n</div>';
    }

    return text;
  };

  // Helper function to handle math expressions
  const processMath = (text: string): string => {
    // Inline math
    text = text.replace(/\$([^\$]+)\$/g, (match, expression) => {
      return `<span class="math-inline">${expression}</span>`;
    });

    // Block math
    text = text.replace(/\$\$([^\$]+)\$\$/g, (match, expression) => {
      return `<div class="math-block">${expression}</div>`;
    });

    return text;
  };

  // Helper function to handle automatic consecutive numbering
  const processAutomaticNumbering = (text: string): string => {
    let numberingStack: number[] = [0];
    let currentLevel = 0;

    return text.replace(/^(\s*)\d+\.\s+(.*$)/gm, (match, indent, content) => {
      const level = Math.floor(indent.length / 2);
      
      if (level > currentLevel) {
        numberingStack.push(1);
      } else if (level < currentLevel) {
        numberingStack = numberingStack.slice(0, level + 1);
        numberingStack[level]++;
      } else {
        numberingStack[level]++;
      }
      
      currentLevel = level;
      const number = numberingStack[level];
      const indentation = '  '.repeat(level);
      
      return `${indentation}${number}. ${content}`;
    });
  };

  const markdownToHtml = (text: string): string => {
    // Pre-process special elements
    text = processAutomaticNumbering(text);
    text = processFootnotes(text);
    text = processMath(text);
    text = processTaskLists(text);
    text = processTables(text);

    // Process standard markdown elements
    return text
      // Headers with IDs for linking
      .replace(
        /^(#{1,6})\s+(.*?)(?:\s+\{#([^}]+)\})?$/gm,
        (match, hashes, content, id) => {
          const level = hashes.length;
          const sizes = ['3xl', '2xl', 'xl', 'lg', 'base', 'sm'];
          const margins = ['mt-8 mb-6', 'mt-8 mb-4', 'mt-6 mb-4', 'mt-4 mb-3', 'mt-4 mb-2', 'mt-3 mb-2'];
          const idAttr = id ? ` id="${id}"` : '';
          return `<h${level}${idAttr} class="text-${sizes[level-1]} font-bold ${margins[level-1]}">${content}</h${level}>`;
        }
      )
      // Text styling
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>')
      .replace(/==(.*?)==/g, '<mark class="bg-yellow-200 dark:bg-yellow-900">$1</mark>')
      
      // Links with titles
      .replace(
        /\[([^\]]+)\]\(([^)]+?)(?:\s+"([^"]+)")?\)/g,
        (match, text, url, title) => {
          const titleAttr = title ? ` title="${title}"` : '';
          return `<a href="${url}"${titleAttr} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${text}</a>`;
        }
      )

      // Code blocks with syntax highlighting support
      .replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        (match, lang, code) => {
          const language = lang || 'plaintext';
          return `<pre class="bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto"><code class="language-${language} text-gray-200 text-sm">${code.trim()}</code></pre>`;
        }
      )
      
      // Inline code
      .replace(
        /`(.*?)`/g,
        `<code class="px-1.5 py-0.5 rounded ${currentTheme.code}">$1</code>`
      )

      // Definition lists
      .replace(
        /^([^\n]+)\n:\s+([\s\S]+?)(?=\n\n|$)/gm,
        '<dl class="my-4"><dt class="font-bold">$1</dt><dd class="ml-4">$2</dd></dl>'
      )

      // Blockquotes with nested support
      .replace(
        /^(>+)\s*(.*$)/gm,
        (match, level, content) => {
          const depth = level.length;
          const padding = 4 * depth;
          return `<blockquote class="pl-${padding} border-l-4 border-gray-300 dark:border-gray-600 my-4 italic">${content}</blockquote>`;
        }
      )

      // Line breaks and paragraphs
      .replace(/(?:\r\n|\r|\n){2,}/g, '</p><p class="my-4">')
      .replace(/(?:\r\n|\r|\n)/g, "<br>")
      .replace(
        /^((?!<h|<ul|<ol|<pre|<code|<p|<li|<blockquote|<dl).*)$/gm,
        '<p class="my-4 leading-relaxed">$1</p>'
      );
  };

  const sanitizedHtml = DOMPurify.sanitize(markdownToHtml(markdown), {
    ADD_TAGS: ['math'],
    ADD_ATTR: ['target'],
  });

  return (
    <Card theme={theme} className={`w-full ${className} ${currentTheme.border}`}>
      <CardContent className={`${currentTheme.background}`}>
        <div
          className={`prose prose-sm max-w-none ${
            theme === "dark" ? "prose-invert" : ""
          } ${currentTheme.text}`}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </CardContent>
    </Card>
  );
};