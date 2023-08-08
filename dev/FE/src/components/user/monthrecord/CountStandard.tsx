import { Exercise } from '@/pages/user/RecordPage';

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
    <div className="flex justify-evenly my-10">
      {sortedCountReaders.length > 0 ? (
        sortedCountReaders
          .slice(0, Math.min(3, sortedCountReaders.length))
          .map((item) => (
            <div key={item}>
              <img
                className="w-[76px] h-[76px]"
                src={`/img/equipments/${item}.png`}
                alt={`${item}.png`}
              />
              <p className="text-center"> {readerCountMap[`${item}`]} 회</p>
            </div>
          ))
      ) : (
        <div>검색 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default CountStandard;
