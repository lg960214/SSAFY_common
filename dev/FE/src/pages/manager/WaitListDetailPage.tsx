import './waitlistpage.css';
import WaitListDetail from '@/components/manager/waitlist/WaitListDetail';

const WaitListDetailPage = () => {
  return (
    <>
      <div className="flex">
        <div className="sectionbox">
          <div className="sectionbox flex items-center">
            <p className="fontJeju text-5xl text-white ">A구역</p>
          </div>
        </div>
        <div className="waitlistbox">
          <WaitListDetail />
        </div>
      </div>
    </>
  );
};

export default WaitListDetailPage;
