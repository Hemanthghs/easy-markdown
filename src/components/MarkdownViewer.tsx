import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MarkdownViewerProps } from '../types';

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  markdown,
  className = '',
}) => {
  const markdownToHtml = (text: string): string => {
    return text
      // Headers
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      // Lists
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p>')
      // Line breaks
      .replace(/\n/g, '<br>');
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardContent>
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
        />
      </CardContent>
    </Card>
  );
};