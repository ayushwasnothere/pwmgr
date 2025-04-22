interface BottomLabelType {
  label: string;
  clickable: string;
  onClick: () => void;
}

export const BottomLabel = ({ label, clickable, onClick }: BottomLabelType) => {
  return (
    <div className="flex text-gray-400 text-xs md:text-sm">
      {label}
      <div className="text-purple-500 ml-1 cursor-pointer" onClick={onClick}>
        {clickable}
      </div>
    </div>
  );
};
