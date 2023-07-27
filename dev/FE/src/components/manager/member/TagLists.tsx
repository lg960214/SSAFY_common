const TagLists = () => {
  const dummyTagList = [
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
    'TG001',
  ];
  return (
    <div className="text-black bg-blue-300 w-[440px] h-[612px] p-4 rounded-2xl">
      <div className="h-16 text-xl font-bold border-b-2 border-black">
        <p>태그 목록</p>
      </div>
      <div className="flex flex-wrap justify-around">
        {dummyTagList.map((item) => {
          return <TagButton device_code={item} />;
        })}
      </div>
    </div>
  );
};

interface TagButtonProps {
  device_code: string;
}

const TagButton = ({ device_code }: TagButtonProps) => {
  return (
    <div className="w-[88px] h-[52px] my-2 align-middle content-center bg-[#DFDCDE] text-lg rounded-2xl">
      {device_code}
    </div>
  );
};

export default TagLists;
