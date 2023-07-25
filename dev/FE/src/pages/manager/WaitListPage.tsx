import './waitlistpage.css';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

const WaitListPage = () => {
  const handle = useFullScreenHandle();
  const sectionData = ['A', 'B', 'C', 'D', 'E'];
  const handleOpenNewTab = (url: string) => {
    window.open(url, '_blank', 'width=1800,height=1000');
  };
  return (
    <>
      <div className="waitpage mx-auto">
        <div>
          <p className="fontJeju text-4xl text-center pt-20">
            구역을 선택하세요.
          </p>
        </div>
        <div>
          <ul className="flex selectbox mx-auto mt-20">
            {sectionData.map((item) => (
              <button className="w-60 h-36 bg-CustomGray m-10 pt-3" key={item}>
                <span className="fontJeju text-4xl">
                  <span className="fontBungee">{item}</span> 구역
                </span>
              </button>
            ))}
          </ul>
          <button
            onClick={() => handleOpenNewTab('http://localhost:3000/waitlist')}
          >
            Naver 이동
          </button>
          <div>
            <FullScreen className="full-screen" handle={handle}>
              <button onClick={handle.enter}>전체화면 전환</button>
              <button onClick={handle.exit}>전체화면 해제</button>
              <h1>전체화면 테스트</h1>
            </FullScreen>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default WaitListPage;
