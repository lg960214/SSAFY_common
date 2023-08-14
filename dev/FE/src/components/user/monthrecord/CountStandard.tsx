import { Exercise } from '@/pages/user/RecordPage';
import SectionHeader from './sectionHeader';

interface CountStandardProps {
  exerciseList1: Exercise[];
}
const CountStandard = ({ exerciseList1 }: CountStandardProps) => {
  const readerCountMap: { [key: string]: number } = {};

  exerciseList1.forEach((record: Exercise) => {
    const tmpReader = record.name;
    const reader = tmpReader.replace(/\d+/g, '');

    if (reader in readerCountMap) {
      readerCountMap[reader]++;
    } else {
      readerCountMap[reader] = 1;
    }
  });

  const sortedCountReaders = Object.keys(readerCountMap).sort(
    (a: string, b: string) => readerCountMap[b] - readerCountMap[a],
  );

  return (
    <div className="flex flex-col">
      <SectionHeader title="사용 횟수 TOP3" width="310px" />
      <div className="flex justify-evenly mt-[20px] bg-CustomBg w-[320px] h-[120px] ms-[20px] rounded-[20px]">
        {sortedCountReaders.length > 0 ? (
          sortedCountReaders
            .slice(0, Math.min(3, sortedCountReaders.length))
            .map((item) => (
              <div key={item}>
                <div>{item}</div>
                <img
                  className="mx-auto w-[50px] h-[50px] bg-white rounded-[20px] mt-[10px]"
                  src={`/img/equipments/${item}.png`}
                  alt={`${item}.png`}
                />
                <div className="font-Jeju mt-[10px]">
                  <div className="text-center">
                    {' '}
                    {readerCountMap[`${item}`]} 회
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="my-auto font-Jeju">검색 데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default CountStandard;
