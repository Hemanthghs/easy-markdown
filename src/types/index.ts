export interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (markdown: string) => void;
  height?: string;
  placeholder?: string;
  className?: string;
  theme?: 'light' | 'dark';
  additionalStyles?: React.CSSProperties;
}

export interface MarkdownViewerProps {
  markdown: string;
  className?: string;
  theme?: 'light' | 'dark';
  additionalStyles?: React.CSSProperties;
}

export interface MarkdownEditorWithPreviewProps extends MarkdownEditorProps {
  showPreview?: boolean;
  previewPosition?: 'side' | 'bottom';
}