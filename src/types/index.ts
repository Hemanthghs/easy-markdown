export interface MarkdownEditorProps {
    initialValue?: string;
    onChange?: (markdown: string) => void;
    height?: string;
    placeholder?: string;
    className?: string;
  }
  
  export interface MarkdownViewerProps {
    markdown: string;
    className?: string;
  }
  
  export interface MarkdownEditorWithPreviewProps extends MarkdownEditorProps {
    showPreview?: boolean;
    previewPosition?: 'side' | 'bottom';
  }