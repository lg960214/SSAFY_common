interface SectionHeaderProps {
  title: string;
  width?: string;
}

const SectionHeader = ({ title, width }: SectionHeaderProps) => {
  return (
    <div
      className="bg-CustomOrange rounded-[20px] text-center mt-[10px] py-1 px-5 mx-auto"
      style={{ width: width }}
    >
      <span className=" font-Jeju text-white text-[18px]">{title}</span>
    </div>
  );
};

export default SectionHeader;
