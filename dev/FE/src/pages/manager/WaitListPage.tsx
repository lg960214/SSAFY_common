import ViewSectionButton from '@/components/manager/waitlist/ViewSectionButton';
import './waitlistpage.css';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getReaders } from '@/api/equipmentApi';
import { Reader } from '@/types/reader.type';
const WaitListPage = () => {
  const handleOpenNewTab = (url: string) => {
    window.open(
      `http://localhost:3000/waitlist/${url}`,
      'width=1920,height=1080',
    );
  };
  const tmpSectionData: { [key: string]: number } = {};
  const [readerData, setReaderData] = useState<Reader[]>([]);
  const { data, isLoading } = useQuery<Reader[]>(['regions'], getReaders);
  useEffect(() => {
    if (!isLoading && data != undefined) {
      setReaderData(data);
      readerData.map((reader: Reader) => {
        const region = reader.region;
        if (region != null) {
          if (region in tmpSectionData) {
            tmpSectionData[region] += 1;
          } else {
            tmpSectionData[region] = 0;
          }
        }
      });
    }
  }, [data, isLoading]);

  const sectionData = Object.keys(tmpSectionData);
  return (
    <div className="waitpage mx-auto">
      <div>
        <p className="fontJeju text-4xl text-center pt-20">
          구역을 선택하세요.
        </p>
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
