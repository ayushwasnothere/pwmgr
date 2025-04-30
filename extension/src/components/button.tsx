interface ButtonProps {
  name: string;
  onClick: () => void;
}
export const PurpleButton = ({ name, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-purple-500/50 mt-8 w-full py-3.5 text-base rounded-lg font-bold text-white bg-purple-500 active:scale-95 transition-transform duration-200 ease-in-out flex items-center justify-center gap-2"
    >
      {name}
    </button>
  );
};
