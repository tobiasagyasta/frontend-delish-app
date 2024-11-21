"use client";
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenLine } from 'lucide-react';

const AvatarWithEditButton = () => {

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Avatar className="mt-10 h-28 w-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

      {/* Edit Button */}
      <PenLine
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          bottom: 2,
          right: 2,
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '8px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          border: '2px solid #E62E05',
          cursor: 'pointer',
          color: '#E62E05',
        }}
      >
      </PenLine>
    </div>
  );
};
export default AvatarWithEditButton;
