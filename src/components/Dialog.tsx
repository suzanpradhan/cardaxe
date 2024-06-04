import React, { useEffect, useRef } from 'react';

type DialogPropsType = {
  children: React.ReactNode;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dialog = ({
  children,
  isDialogOpen,
  setIsDialogOpen,
}: DialogPropsType) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    isDialogOpen ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isDialogOpen]);

  return (
    isDialogOpen && (
      <dialog
        ref={dialogRef}
        onClick={() => setIsDialogOpen(false)}
        className=" backdrop:bg-componentBgGrey backdrop:bg-opacity-60 rounded-xl"
      >
        {children}
      </dialog>
    )
  );
};

export default Dialog;
