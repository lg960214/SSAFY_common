interface ReaderAddButtonProps {
  onClick: () => void;
}

const ReaderAddButton = ({ onClick }: ReaderAddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-32 h-32 mt-11 ml-8 bg-gray-300 shadow-lg rounded-full flex justify-center items-center"
    >
      +
    </button>
  );
};

export default ReaderAddButton;
