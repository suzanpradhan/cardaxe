'use client';

import { CloseCircle } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const customStyles = {
  content: {
    background: 'rgba(0,0,0,0.15)',
  },
};

const PopUpDialog = ({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show, onClose]);

  if (!mounted || !show) return null;
  return (
    show &&
    createPortal(
      <div
        className="fixed left-0 top-0 z-[60] h-full w-full backdrop-blur-md"
        style={customStyles.content}
      >
        <div className="flex h-screen w-full justify-center">
          <div
            ref={modalRef}
            className="relative flex w-full max-w-xs items-center justify-center px-4 md:max-w-md md:px-10"
          >
            <div
              className="absolute left-0 top-0 ml-1 mt-1 aspect-square w-auto text-zinc-900"
              onClick={onClose}
            >
              <CloseCircle size={30} variant="Bulk" />
            </div>
            {children}
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default PopUpDialog;
