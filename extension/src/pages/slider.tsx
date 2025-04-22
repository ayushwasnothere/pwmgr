import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function Slider({
  show,
  setShow,
  title,
  children,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-[380px] h-[600px] bg-black fixed flex flex-col top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${show ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="w-full h-16 bg-white/10 flex items-center gap-4 px-4 text-white">
        <ChevronLeftIcon
          className="h-6 w-6 text-white cursor-pointer hover:text-purple-500"
          onClick={() => {
            setShow(false);
          }}
        />
        <div className="text-lg text-white font-bold">{title}</div>
      </div>
      <div className="flex flex-1 w-full">{children}</div>
    </div>
  );
}
