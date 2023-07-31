import exerciseList from './RecordData';
interface RecordDetailProps {
  selectedDate: string;
}
const RecordDetail = ({ selectedDate }: RecordDetailProps) => {
  const filteredExercises = exerciseList.filter(
    (listItem) => listItem.tagDate === selectedDate,
  );

  return (
    <>
      <p className="fontJeju text-[20px] ms-[15px] my-[10px]">운동기록</p>
      <ul className="w-[340px] rounded-[12px] bg-CustomGray mx-auto pb-[20px]">
        <div className="w-[300px] h-[30px] pt-[10px] my-[10px] flex justify-between mx-auto fontJeju">
          <p className="ms-[13px] my-auto">운동기구</p>
          <p className="me-[70px]">이용시간</p>
        </div>
        {filteredExercises.map((item) => (
          <li className="w-[300px] h-[30px]  my-[15px]  flex justify-between mx-auto bg-white rounded-[8px] fontJeju">
            <p className="ms-[10px] my-auto">{item.reader}</p>
            <p className="me-[50px]">
              {item.startTime.slice(11, 16)} ~ {item.endTime.slice(11, 16)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecordDetail;
