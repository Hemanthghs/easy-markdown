# Easy Markdown

A React component for rendering Markdown with Markdown Editor and Viewer

## Features

- Advanced Markdown syntax support
- Math expressions using KaTeX
- Automatic nested list numbering
- Multi-level blockquotes
- Syntax highlighting for code blocks
- Dark mode support
- DOMPurify sanitization
- Tailwind CSS styling

## Setup

### Prerequisites
- Node.js ≥14.0.0
- npm ≥6.0.0
- React ≥16.8.0
- Tailwind CSS ≥3.0.0

### Installation Steps

1. Install the package and its dependencies:
```bash
npm install react-advanced-markdown katex unified remark-parse remark-math remark-rehype rehype-katex rehype-stringify dompurify
```

2. Install TypeScript types (if using TypeScript):
```bash
npm install -D @types/katex @types/dompurify
```

3. Configure Tailwind CSS:

Add the following to your `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Import KaTeX CSS in your main application file:
```typescript
import 'katex/dist/katex.min.css';
```

5. Set up the component:

Create a new file `MarkdownViewer.tsx`:
```tsx
// Copy the MarkdownViewer component code here
```

### Environment Setup

Required environment variables:
```env
NODE_ENV=development
```

## Usage

```tsx
import { MarkdownViewer } from './components/MarkdownViewer';
import 'katex/dist/katex.min.css';

function App() {
  const markdown = `
# Example
1. Numbered list
   1. Auto-numbered nested item
   2. Another nested item
2. Back to main list

Math: $E = mc^2$

> Single quote
>> Nested quote
  `;

  return (
    <MarkdownViewer 
      markdown={markdown}
      theme="light" // or "dark"
      className="custom-class"
    />
  );
}
```

## Supported Syntax

### Headers
```markdown
# H1 Header
## H2 Header {#custom-id}
```

### Lists
```markdown
1. Automatic
   1. Numbered
      1. Nesting
```

### Math Expressions
```markdown
Inline: $E = mc^2$
Block: $$\sum_{i=1}^n i^2$$
```

### Blockquotes
```markdown
> Level 1
>> Level 2
>>> Level 3
```

### Code Blocks
```markdown
```javascript
const example = "syntax highlighting";
```

### Text Formatting
```markdown
**bold**
*italic*
***bold italic***
~~strikethrough~~
==highlight==
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| markdown | string | required | Markdown content to render |
| theme | 'light' \| 'dark' | 'light' | Theme for the viewer |
| className | string | '' | Additional CSS classes |



## Dependencies

- React ≥16.8.0
- KaTeX ≥0.16.9
- DOMPurify ≥3.0.0
- unified ≥11.0.4
- remark-parse ≥11.0.0
- remark-math ≥6.0.0
- remark-rehype ≥11.0.0
- rehype-katex ≥7.0.0
- rehype-stringify ≥10.0.0

## Scripts

```bash
npm run dev        # Start development
npm run build      # Build for production
```

