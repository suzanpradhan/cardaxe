'use client';

import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#popUpModal');

interface AlertDialogProps {
  // onClickYes: () => void;
  // onClickNo: () => void;
  isOpen: boolean;
}

const AlertDialog = (props: AlertDialogProps) => {
  return (
    <Modal
      isOpen={props.isOpen}
      // onRequestClose={props.onClickNo}
      style={customStyles}
      overlayClassName="z-[60] fixed inset-0"
      contentLabel="Warning"
    >
      <div className="w-full max-w-lg bg-white">
        <div className="text-base">Content</div>
        <div className="mt-4 flex gap-2">
          {/* <Button
            className="flex-1 h-8"
            text="Yes"
            kind="danger"
            onClick={props.onClickYes}
          />
          <Button
            className="flex-1 h-8"
            text="No"
            kind="secondary"
            onClick={props.onClickNo ?? props.onClickNo}
          /> */}
        </div>
      </div>
    </Modal>
  );
};
export default AlertDialog;
