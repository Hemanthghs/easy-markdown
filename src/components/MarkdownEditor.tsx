import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { themes } from '../styles/themes';
import { LucideChevronDown, LucideBold, LucideItalic, LucideList, LucideCode, LucideHeading } from 'lucide-react';
import { MarkdownEditorProps } from '../types';

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '',
  onChange,
  height = 'h-64',
  placeholder = 'Type your markdown here...',
  className = '',
  theme = 'light',
}) => {
  const [value, setValue] = useState(initialValue);
  const currentTheme = themes[theme];

  const insertMarkdown = (syntax: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `${before}**${selected || 'bold text'}**${after}`;
        break;
      case 'italic':
        newText = `${before}_${selected || 'italic text'}_${after}`;
        break;
      case 'code':
        newText = `${before}\`${selected || 'code'}\`${after}`;
        break;
      case 'list':
        newText = `${before}\n- ${selected || 'list item'}${after}`;
        break;
      case 'heading':
        newText = `${before}\n# ${selected || 'Heading'}${after}`;
        break;
    }

    setValue(newText);
    onChange?.(newText);
  };

  return (
    <Card theme={theme} className={`w-full ${className} ${currentTheme.border}`}>
      <div className={`flex items-center space-x-2 p-2 border-b ${currentTheme.border} ${currentTheme.background}`}>
        <button
          onClick={() => insertMarkdown('heading')}
          className={`p-2 rounded hover:${currentTheme.hoveredButton} transition-colors`}
          title="Add Heading"
        >
          <LucideHeading className={currentTheme.text} size={18} />
        </button>
        <button
          onClick={() => insertMarkdown('bold')}
          className={`p-2 rounded hover:${currentTheme.hoveredButton} transition-colors`}
          title="Bold"
        >
          <LucideBold className={currentTheme.text} size={18} />
        </button>
        <button
          onClick={() => insertMarkdown('italic')}
          className={`p-2 rounded hover:${currentTheme.hoveredButton} transition-colors`}
          title="Italic"
        >
          <LucideItalic className={currentTheme.text} size={18} />
        </button>
        <button
          onClick={() => insertMarkdown('list')}
          className={`p-2 rounded hover:${currentTheme.hoveredButton} transition-colors`}
          title="List"
        >
          <LucideList className={currentTheme.text} size={18} />
        </button>
        <button
          onClick={() => insertMarkdown('code')}
          className={`p-2 rounded hover:${currentTheme.hoveredButton} transition-colors`}
          title="Code"
        >
          <LucideCode className={currentTheme.text} size={18} />
        </button>
      </div>
      <CardContent className={`p-0 ${currentTheme.background}`}>
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          className={`w-full ${height} p-4 ${currentTheme.editorBg} ${
            currentTheme.text
          } border-0 focus:ring-1 focus:ring-blue-500 resize-none font-mono text-sm leading-relaxed outline-none`}
        />
      </CardContent>
    </Card>
  );
};
