import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { MarkdownEditorProps } from '../types';

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialValue = '',
  onChange,
  height = 'h-64',
  placeholder = 'Type your markdown here...',
  className = '',
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardContent>
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full ${height} p-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono`}
        />
      </CardContent>
    </Card>
  );
};