// src/components/ui/card.tsx
import React from "react";
import { cn } from "@/lib/utils";

// Card Container
export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("bg-white shadow rounded-lg", className)}>{children}</div>
);

// Card Content
export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("p-4", className)}>{children}</div>
);

// Card Footer
export const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn("border-t p-4", className)}>{children}</div>
);
