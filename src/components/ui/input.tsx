// src/components/ui/input.tsx
import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none px-3 py-2",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
