import { CloseCircle } from 'iconsax-react';
import React, { useEffect, useRef } from 'react';

type DialogPropsType = {
  children: React.ReactNode;
  triggerComponent?: React.ReactNode;
  className?: string;
  dialogClassName?: string;
};

const Dialog = ({
  children,
  triggerComponent,
  className,
  dialogClassName,
}: DialogPropsType) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  // Function to close the dialog
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      // dialogRef.current.rese;
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (dialogRef.current && event.target === dialogRef.current) {
      closeDialog();
    }
  };

  // Close dialog on pressing the Escape key
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && dialogRef.current?.open) {
      closeDialog();
    }
  };

  useEffect(() => {
    // Add event listeners when the component mounts
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleEscapeKey);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <>
      <button className={`${className}`} onClick={openDialog}>
        {triggerComponent}
      </button>
      <div className={dialogClassName}>
        <dialog
          ref={dialogRef}
          // onClick={() => setIsDialogOpen(false)}
          className={
            'rounded-xl bg-transparent backdrop:fixed backdrop:-z-50 backdrop:bg-gray-600/90 backdrop:bg-opacity-85'
          }
        >
          <button
            onClick={closeDialog}
            className="flex w-full items-end justify-end lg:hidden"
          >
            <CloseCircle size="30" color="white" variant="Bold" />
          </button>
          {dialogRef ? children : <></>}
        </dialog>
      </div>
    </>
  );
};

export default Dialog;
