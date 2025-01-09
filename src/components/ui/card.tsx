
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "light" | "dark";
  additionalStyles?: React.CSSProperties;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme = "light", additionalStyles, ...props }, ref) => (
    <div
      ref={ref}
      style={additionalStyles}
      className={`rounded-lg border shadow-sm ${
        theme === "dark" ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-200"
      } ${className}`}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { theme?: "light" | "dark" }>(
  ({ className, theme = "light", ...props }, ref) => (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${
        theme === "dark" ? "text-white" : "text-black"
      } ${className}`}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement> & { theme?: "light" | "dark" }>(
  ({ className, theme = "light", ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${
        theme === "dark" ? "text-white" : "text-black"
      } ${className}`}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement> & { theme?: "light" | "dark" }>(
  ({ className, theme = "light", ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      } ${className}`}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { theme?: "light" | "dark" }>(
  ({ className, theme = "light", ...props }, ref) => (
    <div
      ref={ref}
      className={`p-6 pt-0 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } ${className}`}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { theme?: "light" | "dark" }>(
  ({ className, theme = "light", ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 ${
        theme === "dark" ? "text-white" : "text-black"
      } ${className}`}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
