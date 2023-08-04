import React, { FC, ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    onClose(); // 배경 클릭시 모달 닫기
    e.stopPropagation();
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 모달 내용 클릭시 이벤트 전파 방지
  };

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on the body by setting overflow to hidden
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup method to reset body's overflow property when component is unmounted
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="modal-content fixed top-0 left-0 flex justify-center items-center bg-black/40  w-full h-full z-20"
          onClick={handleBackgroundClick}
        >
          <div onClick={handleContentClick}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
