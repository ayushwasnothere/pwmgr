interface ButtonProps {
  name: string;
  onClick: () => void;
}
export const PurpleButton = ({ name, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-8 w-full py-3.5 text-base rounded-lg  font-bold text-white bg-purple-500"
    >
      {name}
    </button>
  );
};
