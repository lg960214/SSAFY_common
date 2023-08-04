import { useEffect, useState } from 'react';
import waitListApi from '@/api/waitListApi';
import { EquipList } from '@/types/wait.type';
import WaitCard from './WaitCard';

interface WaitListDetailProps {
  section: string;
}

const WaitListDetail = ({ section }: WaitListDetailProps) => {
  const [waitEquipList, setWaitEquipList] = useState<EquipList[]>([]);
  useEffect(() => {
    waitListApi(setWaitEquipList);
  }, []);
  const filterwaitEquipList = waitEquipList.filter(
    (listitem) => listitem.region === section,
  );

  return (
    <>
      <div className="flex flex-wrap mt-[70px] ml-[150px] fontJeju">
        {filterwaitEquipList.map((item) => (
          <WaitCard key={item.reader} data={item} time={'00:00'} />
        ))}
      </div>
    </>
  );
};

export default WaitListDetail;
