import { Reader } from '@/types/reader.type';

interface RegisterModalChildrenProps {
  currentZone: string;
  readerData: Reader[];
  setWholeData: (data: Reader[]) => void;
}

const RegisterModalChildren = ({
  currentZone,
  readerData,
  setWholeData,
}: RegisterModalChildrenProps) => {
  const unregisteredReaders = readerData.filter((cur) => cur.region === null);
  return (
    <div className="bg-white rounded-lg w-[440px] h-[480px] px-4 border-black border-2">
      <div className="flex justify-evenly items-center h-12 basis-32 text-center border-b-2 border-black">
        <span className="basis-1/2">리더 코드</span>
        <span className="basis-1/2"></span>
      </div>
      {unregisteredReaders.map((cur) => (
        <ReaderElement
          key={cur.reader}
          reader={cur.reader}
          onButtonClick={() => {
            const registerdData = readerData.map((r) => {
              if (cur.reader === r.reader) {
                return { ...r, region: currentZone };
              } else return r;
            });
            setWholeData(registerdData);
          }}
        />
      ))}
    </div>
  );
};

interface ReaderElementProps {
  reader: string;
  onButtonClick: () => void;
}

const ReaderElement = ({ reader, onButtonClick }: ReaderElementProps) => {
  return (
    <div className="mt-1 flex justify-evenly items-center h-12 basis-32 text-center">
      <span className="basis-1/2">{reader}</span>
      <span className="basis-1/2">
        <RegisterButton name="등록" onClick={onButtonClick} />
      </span>
    </div>
  );
};

interface RegisterButtonProps {
  name: string;
  onClick: () => void;
}

const RegisterButton = ({ name, onClick }: RegisterButtonProps) => {
  const RegisterButtonClass = 'w-12 h-8 p-0 text-white font-bold bg-green-600';
  return (
    <button onClick={onClick} className={RegisterButtonClass}>
      {name}
    </button>
  );
};

export default RegisterModalChildren;
