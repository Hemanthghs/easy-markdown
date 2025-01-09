import React, { useState } from 'react';
import { MarkdownEditor } from './MarkdownEditor';
import { MarkdownViewer } from './MarkdownViewer';

interface MarkdownEditorWithPreviewProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  height?: string;
  placeholder?: string;
  showPreview?: boolean;
  previewPosition?: 'side' | 'bottom';
  className?: string;
  theme?: 'light' | 'dark';
}

export const MarkdownEditorWithPreview: React.FC<MarkdownEditorWithPreviewProps> = ({
  initialValue = '',
  onChange,
  height = '16rem',
  placeholder,
  showPreview = true,
  previewPosition = 'side',
  className = '',
  theme = 'light',
}) => {
  const [markdown, setMarkdown] = useState(initialValue);

  const handleChange = (value: string) => {
    setMarkdown(value);
    onChange?.(value);
  };

  return (
    <div className={`editor-container ${className}`}>
      <div className={`editor-preview-container ${previewPosition === 'bottom' ? 'vertical' : ''}`}>
        <div className="editor-section">
          <MarkdownEditor
            initialValue={markdown}
            onChange={handleChange}
            height={height}
            placeholder={placeholder}
            theme={theme}
          />
        </div>
        {showPreview && (
          <div className="preview-section">
            <MarkdownViewer 
              markdown={markdown} 
              theme={theme} 
            />
          </div>
        )}
      </div>
    </div>
  );
};