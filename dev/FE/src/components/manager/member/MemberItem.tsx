import { useState } from 'react';
import Modal from '@/components/common/Modal';
import { MemberInfomation } from './MemberInfomation';
import TagLists from './TagLists';
import { MemberInfo } from '@/types/member.type';

// interface MemberitemProps {}

export const MemberItem = (item: MemberInfo) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLElement> = () => {
    setIsModalOpen(true);
  };

  const handleRegiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <li
      onClick={handleClick}
      className="flex justify-evenly items-center h-12 basis-32 text-center cursor-pointer"
    >
      <span className="w-24">{item.name}</span>
      <span className="w-20">{item.userId}</span>
      <span className="w-28">{item.phoneNumber}</span>
      <span className="w-16">{item.sex}</span>
      <span className="w-28">{item.regist}</span>
      <span className="w-44" onClick={handleRegiClick}>
        {createTagRegi(item.deviceCode)}
      </span>

      <Modal onClose={handleClose} isOpen={isModalOpen}>
        <MemberInfomation {...item} />
      </Modal>
    </li>
  );
};

const createTagRegi = (tagStatus: string | null) => {
  const [isTagListOpen, setIsTagListOpen] = useState(false);
  const handleIsTagListClick = () => {
    setIsTagListOpen(true);
  };
  const handleIstagListClose = () => {
    setIsTagListOpen(false);
  };
  const dummyClose = () => {
    console.log('해제하는 기능 들어가는곳');
  };
  if (tagStatus === null) {
    return (
      <>
        <TagRegiButton
          handleEvent={handleIsTagListClick}
          name="등록"
          color=""
        />
        <Modal onClose={handleIstagListClose} isOpen={isTagListOpen}>
          <TagLists />
        </Modal>
      </>
    );
  } else {
    return (
      <div className="flex justify-evenly">
        <span className="font-bold">{tagStatus}</span>
        <TagRegiButton handleEvent={dummyClose} name="해제" color="indigo" />
      </div>
    );
  }
};

interface TagRegiButtonProps {
  name: string;
  color: string;
  handleEvent: () => void;
}

export const TagRegiButton = ({
  name,
  color,
  handleEvent,
}: TagRegiButtonProps) => {
  const colorClass = color === 'indigo' ? 'bg-indigo-700' : 'bg-green-700';
  const regiBtnClassName = `w-16 h-8 text-white p-0 content-center ${colorClass}`;

  return (
    <button onClick={handleEvent} className={regiBtnClassName}>
      {name}
    </button>
  );
};
