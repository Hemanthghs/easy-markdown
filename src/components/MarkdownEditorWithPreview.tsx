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
}) => {
  const [markdown, setMarkdown] = useState(initialValue);

  const handleChange = (value: string) => {
    setMarkdown(value);
    onChange?.(value);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`${previewPosition === 'side' ? 'flex gap-4' : 'space-y-4'}`}>
        <div className={previewPosition === 'side' ? 'w-1/2' : 'w-full'}>
          <MarkdownEditor
            initialValue={markdown}
            onChange={handleChange}
            height={height}
            placeholder={placeholder}
          />
        </div>
        {showPreview && (
          <div className={previewPosition === 'side' ? 'w-1/2' : 'w-full'}>
            <MarkdownViewer markdown={markdown} />
          </div>
        )}
      </div>
    </div>
  );
};
