import React from 'react';

const Card = ({ children, className = '', hoverable = true, padded = true, borderDashed = false, ...props }) => {
  return (
    <div
      className={`
        bg-[var(--color-card-bg)] 
        border 
        ${borderDashed ? 'border-dashed border-zinc-300 dark:border-zinc-800' : 'border-[var(--color-border)]'} 
        rounded-2xl
        shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]
        ${padded ? 'p-6' : ''} 
        ${hoverable ? 'hover:shadow-md hover:scale-[1.01] hover:border-zinc-300 dark:hover:border-zinc-700' : ''} 
        transition-all 
        duration-200 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
