interface ViewSectionButtonProps {
  section: string;
  onClick: () => void;
}

const ViewSectionButton = ({ section, onClick }: ViewSectionButtonProps) => {
  return (
    <div
      className="w-60 h-36 m-10 flex justify-center items-center rounded-xl bg-CustomOrange shadow-gray-400 shadow-right-bottom"
      onClick={onClick}
    >
      <span className="fontJeju text-4xl text-white">
        <span className="fontBungee">{section}</span> 구역
      </span>
    </div>
  );
};

export default ViewSectionButton;
