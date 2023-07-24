import React, { FC, ReactNode, useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    onClose(); // 배경 클릭시 모달 닫기
    e.stopPropagation();
    // console.log('aaa');
  };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 모달 내용 클릭시 이벤트 전파 방지
  };

  return (
    <>
      {showModal && (
        <div
          className="modal-content fixed border-2 top-0 left-0 flex align-middle justify-center bg-white border-black w-full h-full z-20"
          onClick={handleBackgroundClick}
        >
          <div className="h-1/2" onClick={handleContentClick}>
            {children}
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
