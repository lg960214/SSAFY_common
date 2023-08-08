// WaitListPage.tsx
import ViewSectionButton from '@/components/manager/waitlist/ViewSectionButton';
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
        <p className="fontJeju text-4xl text-center pt-20">구역을 선택하세요</p>
      </div>
      <div>
        <ul className="flex selectbox mx-auto mt-20">
          {sectionData.map((sect) => (
            <ViewSectionButton
              key={sect}
              section={sect}
              onClick={() => handleOpenNewTab(sect)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WaitListPage;
