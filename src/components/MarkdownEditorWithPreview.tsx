import React, { useState } from 'react';
import { MarkdownEditor } from './MarkdownEditor';
import { MarkdownViewer } from './MarkdownViewer';
import { MarkdownEditorWithPreviewProps } from '../types';

export const MarkdownEditorWithPreview: React.FC<MarkdownEditorWithPreviewProps> = ({
  initialValue = '',
  onChange,
  height = 'h-64',
  placeholder,
  showPreview = true,
  previewPosition = 'side',
  className = '',
  theme = 'light', // Theme support
}) => {
  const [markdown, setMarkdown] = useState(initialValue);

  const handleChange = (value: string) => {
    setMarkdown(value);
    onChange?.(value);
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`${
          previewPosition === 'side' ? 'flex flex-wrap gap-4' : 'space-y-4'
        }`}
      >
        <div className={previewPosition === 'side' ? 'w-full md:w-1/2' : 'w-full'}>
          <MarkdownEditor
            initialValue={markdown}
            onChange={handleChange}
            height={height}
            placeholder={placeholder}
            theme={theme}
          />
        </div>
        {showPreview && (
          <div className={previewPosition === 'side' ? 'w-full md:w-1/2' : 'w-full'}>
            <MarkdownViewer markdown={markdown} theme={theme} />
          </div>
        )}
      </div>
    </div>
  );
};
