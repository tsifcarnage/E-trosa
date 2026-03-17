import { FcMoneyTransfer } from "react-icons/fc";
import { LuPanelLeftClose } from "react-icons/lu";
import {
  RiBankCard2Line,
  RiDashboardHorizontalFill,
  RiHome2Line,
  RiMoneyEuroCircleLine,
  RiSettings3Fill,
  RiUser2Fill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

interface Ilink {
  icon: React.ReactNode;
  to: string;
}
const links: Ilink[] = [
  { icon: <RiHome2Line size={25}/>, to: "accueil" },
  { icon: <RiDashboardHorizontalFill size={25}/>, to: "dashboard" },
  { icon: <RiMoneyEuroCircleLine size={25}/>, to: "dettes" },
  { icon: <RiUser2Fill size={25}/>, to: "creances" },
  { icon: <RiBankCard2Line size={25}/>, to: "paiements" },
];
export default function Sidebar() {
  return (
    <nav className="flex flex-col bg-neutral w-full max-w-60 shadow-md h-screen">
      <div className=" flex justify-between p-2 gap-2 mb-6">
        <h2 className="flex gap-2 uppercase ">
          <FcMoneyTransfer size={30} />
          <span className="self-center">e-trosa</span>
        </h2>
        <LuPanelLeftClose size={30} />
      </div>
      <div className=" flex flex-col grow">
        {links.map((link, index) => (
          <Link key={index} to={link.to} className="flex gap-2 m-3">
             <h3 className="flex gap-2 "><span>{link.icon}</span> {link.to}</h3>
          </Link>
        ))}
      </div>
    <div className="mt-auto p-3">
        <Link className="flex gap-2 " to={"parametre"}> <span><RiSettings3Fill size={25}/></span><h3>Parametre</h3> </Link>
    </div>
    </nav>
  );
}
