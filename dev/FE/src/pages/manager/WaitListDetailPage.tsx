import './waitlistpage.css';
import WaitListDetail from '@/components/manager/waitlist/WaitListDetail';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useParams } from 'react-router-dom';

export const WaitListDetailPage = () => {
  const handle = useFullScreenHandle();
  const { sectionName } = useParams(); // params에서 'item' 값을 받아옴
  return (
    <>
      <FullScreen className="full-screen" handle={handle}>
        <div>
          <SectionHeader section={sectionName} />
          <WaitListDetail section={sectionName ?? 'A'} />
        </div>
        <button onClick={handle.enter}>전체화면 전환</button>
        <button onClick={handle.exit}>전체화면 해제</button>
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
    <div className="flex justify-center items-center bg-[#ff8000] p-3 w-[200px]">
      <span className="fontJeju text-5xl text-white ">{section} 구역</span>
    </div>
  );
};
