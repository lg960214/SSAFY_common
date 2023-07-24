import { useState } from 'react';
import Modal from '@/components/common/Modal';
import { MemberInfomation } from './MemberInfomation';
import { TagLists } from './TagLists';

interface MemberitemProps {
  name: string;
  userid: string;
  number: string;
  sex: string;
  date: number;
  tag: string | null;
}

export const MemberItem = (item: MemberitemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsModalOpen(true);
    // console.log('??');
    // console.log(e.currentTarget.textContent);
  };

  const handleRegiClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className="flex justify-evenly items-center h-12 basis-32 text-center"
    >
      <span className="basis-1/6">{item.name}</span>
      <span className="basis-1/6">{item.userid}</span>
      <span className="basis-1/6">{item.number}</span>
      <span className="basis-1/6">{item.sex}</span>
      <span className="basis-1/6">{item.date}</span>
      <span className="basis-1/6" onClick={handleRegiClick}>
        {createTagRegi(item.tag)}
      </span>

      <Modal onClose={handleClose} isOpen={isModalOpen}>
        <MemberInfomation {...item} />
        <button onClick={handleClose}>Close</button>
      </Modal>
    </div>
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
  if (tagStatus === null) {
    return (
      <div>
        <button onClick={handleIsTagListClick} className="text-black">
          등록
        </button>
        ;
        <Modal onClose={handleIstagListClose} isOpen={isTagListOpen}>
          <TagLists />
        </Modal>
      </div>
    );
  } else {
    return (
      <div>
        <span>{tagStatus}</span>
        <button className="text-black">해제</button>
      </div>
    );
  }
};
