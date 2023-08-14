interface WaitTitleProps {
  text: string | null;
}

const WaitTitle = ({ text }: WaitTitleProps) => {
  return (
    <div className="w-[360px] h-14 mx-auto bg-CustomNavy flex items-center justify-center text-white rounded-lg">
      <span className="text-2xl font-bold">{text}</span>
    </div>
  );
};

export default WaitTitle;
