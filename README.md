# React Advanced Markdown Viewer

A feature-rich React component for rendering Markdown with support for advanced formatting, math expressions, automatic numbering, and nested elements.

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

## Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/react-advanced-markdown.git

# Navigate to project
cd react-advanced-markdown

# Install dependencies
npm install

# Start development server
npm run dev
```

2. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

### Development Guidelines

1. Code Style
- Use TypeScript for new code
- Follow existing code formatting
- Use meaningful variable/function names
- Add comments for complex logic
- Write unit tests for new features

2. Commits
- Use semantic commit messages:
  - feat: New feature
  - fix: Bug fix
  - docs: Documentation
  - style: Formatting
  - refactor: Code restructuring
  - test: Tests
  - chore: Maintenance

3. Testing
```bash
# Run tests
npm test

# Run linter
npm run lint
```

### Pull Request Process

1. Update documentation for new features
2. Add tests for new functionality
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Submit PR with detailed description
6. Address review comments

### Issue Reporting

1. Check existing issues
2. Use issue template
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details

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
npm run dev        # Start development server
npm run build      # Build for production
npm test          # Run tests
npm run lint      # Run linter
npm run format    # Format code
```

## License

MIT