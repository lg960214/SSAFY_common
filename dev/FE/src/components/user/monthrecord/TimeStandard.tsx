import { Exercise } from '@/pages/user/RecordPage';
import SectionHeader from './SectionHeader';

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
    <div className="flex flex-col mt-[16px]">
      <SectionHeader title="사용 시간 TOP3" width="310px" />
      <div className="flex justify-evenly mt-[20px] bg-CustomBg w-[320px] h-[120px] ms-[20px] rounded-[20px]">
        {sortedTimeReaders.length > 0 ? (
          sortedTimeReaders
            .slice(0, Math.min(3, sortedTimeReaders.length))
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
                    {Math.round(readerCountTimeMap[`${item}`])} 분
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

export default TimeStandard;
