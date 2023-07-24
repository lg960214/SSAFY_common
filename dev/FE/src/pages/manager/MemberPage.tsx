import { useState } from 'react';
import { TagTableList } from '@/components/manager/member/TagTableList';
import { TableMenu } from '@/components/manager/member/TableMenu';
import { MemberTableList } from '@/components/manager/member/MemberTableList';
import Modal from '@/components/common/Modal';
import { ApproveContent } from '@/components/manager/member/ApproveContent';

export const MemberPage = () => {
  const [isApproveModalOpen, setIsApproveModal] = useState(false);
  const openApproveModal = () => {
    setIsApproveModal(!isApproveModalOpen);
  };
  const closeModal = () => {
    if (isApproveModalOpen) setIsApproveModal(false);
  };
  return (
    <div
      onClick={closeModal}
      className="flex justify-evenly"
      style={{ height: '900px' }}
    >
      <div className="w-1/2">
        <TableMenu name="태그 현황" />
        <TagTableList />
      </div>
      <div className="w-1/2">
        <Modal isOpen={isApproveModalOpen}>
          <ApproveContent />
        </Modal>
        <TableMenu name="회원 정보" />
        <MemberTableList />
        <div>
          <button onClick={openApproveModal}>승인 요청</button>
        </div>
      </div>
    </div>
  );
};
