import React from 'react';

interface TableCardProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const TableCard = ({ children, footer }: TableCardProps) => {
  return (
    <div className="bg-whiteShade custom-scrollbar overflow-x-auto rounded-lg px-4 py-2">
      <table className="w-full table-auto border-separate border-spacing-y-2">
        {children}
      </table>
      {footer}
    </div>
  );
};

export default TableCard;
