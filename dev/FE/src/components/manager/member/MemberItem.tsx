import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';
import { MemberInfomation } from './MemberInfomation';
import TagLists from './TagLists';
import { MemberInfo } from '@/types/member.type';

interface MemberItemProps {
  item: MemberInfo;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MemberItem = ({
  item,
  currentPage,
  setCurrentPage,
}: MemberItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTagListOpen, setIsTagListOpen] = useState(false);

  useEffect(() => {
    handleClose();
  }, [isTagListOpen]);

  const handleClick: React.MouseEventHandler<HTMLElement> = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleIstagListClose = () => {
    setIsTagListOpen(false);
  };

  return (
    <li>
      <div
        onClick={handleClick}
        className={` bg-slate-200 rounded-lg text-center cursor-pointer  hover:scale-105 duration-150`}
      >
        <div className="flex justify-evenly items-center h-12  border-b-[1px] border-CustomNavy/10">
          <span className="w-20">{item.userId}</span>
          <span className="w-24">{item.name}</span>
          <span className="w-32">{item.phoneNumber}</span>
          <span className="w-16">{item.sex}</span>
          <span className="w-28">
            <TagRegister
              id={item.id}
              deviceCode={item.deviceCode}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              isTagListOpen={isTagListOpen}
              setIsTagListOpen={setIsTagListOpen}
            />
          </span>
        </div>
      </div>

      <Modal onClose={handleClose} isOpen={isModalOpen}>
        <MemberInfomation {...item} />
      </Modal>
      <Modal onClose={handleIstagListClose} isOpen={isTagListOpen}>
        <TagLists
          currentPaginationIdx={currentPage}
          setCurrentPaginationIdx={setCurrentPage}
          onClose={handleIstagListClose}
          id={item.id}
        />
      </Modal>
    </li>
  );
};

interface TagRegisterProps {
  id: string;
  deviceCode: string | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isTagListOpen: boolean;
  setIsTagListOpen: (status: boolean) => void;
}

const TagRegister = ({ deviceCode, setIsTagListOpen }: TagRegisterProps) => {
  const handleIsTagListClick = () => {
    setIsTagListOpen(true);
  };

  if (deviceCode === null) {
    return (
      <>
        <TagRegiButton
          handleEvent={handleIsTagListClick}
          name="등록"
          color=""
        />
      </>
    );
  } else {
    return (
      <div className="flex justify-evenly">
        <span className="font-bold">{deviceCode}</span>
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
  const colorClass = color === 'indigo' ? 'bg-indigo-700' : 'bg-CustomOrange';
  const regiBtnClassName = `w-16 h-8 text-white p-0 content-center ${colorClass}`;

  return (
    <button onClick={handleEvent} className={regiBtnClassName}>
      {name}
    </button>
  );
};
