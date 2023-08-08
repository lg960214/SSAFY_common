import { Exercise } from '@/pages/user/RecordPage';

interface TimeStandardProps {
  exerciseList1: Exercise[];
}
const TimeStandard = ({ exerciseList1 }: TimeStandardProps) => {
  const readerCountTimeMap: { [key: string]: number } = {};

  exerciseList1.forEach((record: Exercise) => {
    if (record.endTime != null) {
      const tmpReader = record.name;
      const reader = tmpReader.replace(/\d+/g, '');
      const startTime: any = new Date(record.startTime);
      const endTime: any = new Date(record.endTime);
      const durationInMinutes = (endTime - startTime) / (1000 * 60); // 밀리초를 분으로 변환

      if (reader in readerCountTimeMap) {
        readerCountTimeMap[reader] += durationInMinutes;
      } else {
        readerCountTimeMap[reader] = durationInMinutes;
      }
    }
  });

  const sortedTimeReaders = Object.keys(readerCountTimeMap).sort(
    (a: string, b: string) => readerCountTimeMap[b] - readerCountTimeMap[a],
  );

  return (
    <div className="flex justify-evenly">
      {sortedTimeReaders.length > 0 ? (
        sortedTimeReaders
          .slice(0, Math.min(3, sortedTimeReaders.length))
          .map((item) => (
            <div key={item}>
              <img
                className="w-[76px] h-[76px]"
                src={`/img/equipments/${item}.png`}
                alt={`${item}.png`}
              />
              <p className="text-center">
                {' '}
                {Math.round(readerCountTimeMap[`${item}`])} 분
              </p>
            </div>
          ))
      ) : (
        <div>검색 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default TimeStandard;
