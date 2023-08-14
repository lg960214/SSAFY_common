import { Exercise } from '@/pages/user/RecordPage';
import SectionHeader from './sectionHeader';

interface TotalDaysProps {
  exerciseList1: Exercise[];
}

const TotalDays = ({ exerciseList1 }: TotalDaysProps) => {
  const countDate: number = new Set(exerciseList1.map((item) => item.tagData))
    .size;

  return (
    <div className="">
      <SectionHeader title="총 운동일" />
      <div className="font-Jeju text-[18px]">
        <p className="text-center">{countDate} 일</p>
      </div>
    </div>
  );
};

export default TotalDays;
