interface TableMenuProps {
  name: string;
}

export const TableMenu = (props: TableMenuProps) => {
  return (
    <div className="w-40 h-24 p-2 bg-CustomOrange -z-10 text-white text-center rounded-2xl text-xl">
      {props.name}
    </div>
  );
};
