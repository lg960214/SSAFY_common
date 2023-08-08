import './waitlistpage.css';
import WaitListDetail from '@/components/manager/waitlist/WaitListDetail';
import { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useParams } from 'react-router-dom';

export const WaitListDetailPage = () => {
  const handle = useFullScreenHandle();
  const [isFull, setIsFull] = useState<boolean>(false);
  const { sectionName } = useParams(); // params에서 'item' 값을 받아옴

  const handleFullScreen = () => {
    if (isFull) {
      setIsFull(false);
      handle.exit();
    } else {
      setIsFull(true);
      handle.enter();
    }
  };

  return (
    <>
      <FullScreen className="bg-[#f2f2f2]" handle={handle}>
        <div className="flex justify-between">
          <SectionHeader section={sectionName} />
          <div>
            <img
              className="hover:cursor-pointer"
              src="/img/wait/fullscreen.svg"
              alt="full"
              width={30}
              onClick={handleFullScreen}
            />
          </div>
        </div>
        <WaitListDetail section={sectionName ?? '?'} />
      </FullScreen>
    </>
  );
};

export default WaitListDetailPage;

interface SectionHeaderProps {
  section?: string;
}

const SectionHeader = ({ section }: SectionHeaderProps) => {
  return (
    <div className="flex justify-center items-center bg-[#ff8000] p-5 w-[280px] shadow-right-bottom shadow-gray-400">
      <span className="fontJeju text-7xl text-white ">{section} 구역</span>
    </div>
  );
};
