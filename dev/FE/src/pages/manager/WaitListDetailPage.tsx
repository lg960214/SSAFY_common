import './waitlistpage.css';
import WaitListDetail from '@/components/manager/waitlist/WaitListDetail';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useParams } from 'react-router-dom';

export const WaitListDetailPage = () => {
  const handle = useFullScreenHandle();
  const { sectionName } = useParams(); // params에서 'item' 값을 받아옴
  console.log(sectionName);
  return (
    <>
      <FullScreen className="full-screen" handle={handle}>
        <div className="flex bg-CustomGray">
          <div className="sectionbox">
            <div className="sectionbox flex items-center">
              <p className="fontJeju text-5xl text-white ">
                {sectionName} 구역
              </p>
            </div>
          </div>
          <div className="waitlistbox">
            <WaitListDetail />
          </div>
        </div>
        <div></div>
        <button onClick={handle.enter}>전체화면 전환</button>
        <button onClick={handle.exit}>전체화면 해제</button>
      </FullScreen>
    </>
  );
};

export default WaitListDetailPage;
