interface ZoneChoiceProps {
  isOnEdit: boolean;
  zoneList: string[];
}

const ZoneChoice = ({ isOnEdit, zoneList }: ZoneChoiceProps) => {
  return (
    <div className="m-4">
      {zoneList.map((zone) => {
        return (
          <ZoneButton
            name={zone}
            selected={false}
            onClick={() => console.log('clicked')}
          />
        );
      })}
      {isOnEdit ? (
        <ZoneButton name={'+'} onClick={() => console.log('clicked')} />
      ) : null}
    </div>
  );
};

export default ZoneChoice;

interface ZoneButtonProps {
  selected?: boolean;
  name: string;
  onClick: () => void;
}

const ZoneButton = ({ selected = false, name, onClick }: ZoneButtonProps) => {
  return (
    <button
      className={
        selected
          ? 'mx-4 bg-black text-white'
          : 'mx-4 border-solid border-2 border-black'
      }
      onClick={onClick}
    >
      {name}
    </button>
  );
};
