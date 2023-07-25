interface TableMenuProps {
  name: string;
}

export const TableMenu = (props: TableMenuProps) => {
  return (
    <div className="w-40 h-24 absolute p-2 text-center border-2 border-black rounded-2xl text-xl">
      {props.name}
    </div>
  );
};
