import React, { FC, ReactNode, useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  // onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  //   const handleBackgroundClick = () => {
  //     onClose(); // 배경 클릭시 모달 닫기
  //   };

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 모달 내용 클릭시 이벤트 전파 방지
  };

  return (
    <>
      {showModal && (
        <div
          className="modal-content absolute border-2 bg-green-500 border-black w-96 h-96 z-20"
          onClick={handleContentClick}
        >
          {children}
          {/* <button onClick={onClose}>Close</button> */}
        </div>
      )}
    </>
  );
};

export default Modal;
