import { Exercise } from '@/pages/user/RecordPage';

interface TotalDaysProps {
  exerciseList1: Exercise[];
}

const TotalDays = ({ exerciseList1 }: TotalDaysProps) => {
  const countDate: number = new Set(exerciseList1.map((item) => item.tagData))
    .size;

  return (
    <div className="flex justify-between ms-5 me-[120px]">
      <p>총 운동일</p>
      <p>{countDate} 일</p>
    </div>
  );
};

export default TotalDays;
