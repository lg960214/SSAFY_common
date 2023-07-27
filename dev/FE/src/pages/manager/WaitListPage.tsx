// WaitListPage.tsx
import './waitlistpage.css';
const WaitListPage = () => {
  const sectionData = ['A', 'B', 'C', 'D', 'E'];
  const handleOpenNewTab = (url: string) => {
    window.open(
      `http://localhost:3000/waitlist/${url}`,
      '_blank',
      'width=1920,height=1080',
    );
  };

  return (
    <div className="waitpage mx-auto">
      <div>
        <p className="fontJeju text-4xl text-center pt-20">
          구역을 선택하세요.
        </p>
      </div>
      <div>
        <ul className="flex selectbox mx-auto mt-20">
          {sectionData.map((item) => (
            <li key={item}>
              <button
                className="w-60 h-36 bg-CustomGray m-10 pt-3"
                onClick={() => handleOpenNewTab(`${item}`)}
              >
                <span className="fontJeju text-4xl">
                  <span className="fontBungee">{item}</span> 구역
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WaitListPage;
