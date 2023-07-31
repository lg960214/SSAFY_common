interface TimeInputProps {
  hour: number;
  minute: number;
  setHour: (num: number) => void;
  setMinute: (num: number) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({
  hour,
  minute,
  setHour,
  setMinute,
}) => {
  //   const [hour, setHour] = useState<number>(0);
  //   const [minute, setMinute] = useState<number>(0);

  //   useEffect(() => {
  //     const date = new Date();
  //     const roundedMinute = Math.ceil(date.getMinutes() / 10) * 10;
  //     setHour(date.getHours());
  //     setMinute(roundedMinute);
  //   }, []);

  const minutes = Array.from({ length: 6 }, (_, i) => i * 10);

  return (
    <div className="h-11">
      <select
        className="h-11 w-16 rounded-xl p-2"
        value={hour}
        onChange={(e) => setHour(Number(e.target.value))}
      >
        {Array.from({ length: 24 }, (_, i) => i).map((_, i) => (
          <option key={i} value={i}>
            {i < 10 ? '0' + i : i}
          </option>
        ))}
      </select>
      <span className="text-black text-xl">시 </span>
      <select
        className="h-11 w-16 rounded-xl p-2"
        value={minute}
        onChange={(e) => setMinute(Number(e.target.value))}
      >
        {minutes.map((minute) => (
          <option key={minute} value={minute}>
            {minute === 0 ? '00' : minute}
          </option>
        ))}
      </select>
      <span className="text-black text-xl">분</span>
    </div>
  );
};

export default TimeInput;
