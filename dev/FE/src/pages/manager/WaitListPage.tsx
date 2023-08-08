import ViewSectionButton from '@/components/manager/waitlist/ViewSectionButton';
import './waitlistpage.css';
import { useQuery } from '@tanstack/react-query';
import { Reader } from '@/types/reader.type';
import { getReaders } from '@/api/equipmentApi';
import { useEffect, useState } from 'react';
const WaitListPage = () => {
  const [sectionList, setSectionList] = useState<(string | null)[]>(['A']);

  const { data, isLoading } = useQuery<Reader[]>(['regions'], getReaders);

  useEffect(() => {
    if (data) {
      const extractRegions = data
        ?.map((cur) => cur.region)
        .filter((cur) => !!cur);
      const regionsSet = new Set(extractRegions);
      const makeArray = [...regionsSet];
      makeArray.sort();
      setSectionList(makeArray);
    }
  }, [data, isLoading]);

  const handleOpenNewTab = (url: string | null) => {
    if (url) {
      window.open(
        `http://localhost:3000/waitlist/${url}`,
        '_blank',
        'width=1920,height=1080',
      );
    }
  };

  return (
    <div className="waitpage mx-auto">
      <div>
        <p className="fontJeju text-4xl text-center pt-20">구역을 선택하세요</p>
      </div>
      <div>
        <ul className="flex selectbox mx-auto mt-20">
          {sectionList.map((sect) =>
            sect ? (
              <ViewSectionButton
                key={sect}
                section={sect}
                onClick={() => handleOpenNewTab(sect)}
              />
            ) : null,
          )}
        </ul>
      </div>
    </div>
  );
};

export default WaitListPage;
