import { FcMoneyTransfer } from "react-icons/fc";
import { LuPanelLeftClose } from "react-icons/lu";
export default function Sidebar() {
  return (
    <nav className="bg-neutral w-full max-w-80 shadow-md h-screen">
      <div className="flex justify-between p-5 gap-2">
        <h2 className="flex gap-2 uppercase ">
          <FcMoneyTransfer className="w-8 h-8 " />
          <span className="self-center">e-trosa</span>
        </h2>
        <LuPanelLeftClose className="w-7 h-7 self-center" />
      </div>
    </nav>
  );
}
