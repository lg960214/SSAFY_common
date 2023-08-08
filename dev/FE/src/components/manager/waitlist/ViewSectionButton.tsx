interface ViewSectionButtonProps {
  section: string;
  onClick: () => void;
}

const ViewSectionButton = ({ section, onClick }: ViewSectionButtonProps) => {
  return (
    <button
      className="w-60 h-36 bg-CustomGray m-10 pt-3 shadow-gray-400 shadow-right-bottom"
      onClick={onClick}
    >
      <span className="fontJeju text-4xl">
        <span className="fontBungee">{section}</span> 구역
      </span>
    </button>
  );
};

export default ViewSectionButton;
