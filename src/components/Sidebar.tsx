import { useState } from "react";
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
import { Link, NavLink } from "react-router-dom";

interface Ilink {
  icon: React.ReactNode;
  to: string;
}
const links: Ilink[] = [
  { icon: <RiHome2Line size={25} />, to: "accueil" },
  { icon: <RiDashboardHorizontalFill size={25} />, to: "dashboard" },
  { icon: <RiMoneyEuroCircleLine size={25} />, to: "dettes" },
  { icon: <RiUser2Fill size={25} />, to: "creances" },
  { icon: <RiBankCard2Line size={25} />, to: "paiements" },
];
export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <nav
      className={`flex flex-col bg-neutral w-full shadow-md h-screen duration-300 ${open ? " max-w-60" : "max-w-13"}`}
    >
      {/* en-tete */}
      <div className=" flex justify-between p-2 gap-2 mb-6">
        <h2 className={` ${!open ? "hidden" : "flex gap-2 uppercase"}`}>
          <FcMoneyTransfer size={30} />
          <span className="self-center">e-trosa</span>
        </h2>

        <LuPanelLeftClose
          size={30}
          onClick={() => setOpen(!open)}
          className={`cursor-pointer duration-300 ${open ? "" : "rotate-180 "}`}
        />
      </div>

      {/* menu */}
      <div className="flex flex-col mt-10 grow">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex gap-2 m-3 ${isActive ? "purple" : "transparent"}`
            }
          >
            <span>{link.icon}</span>{" "}
            <h3 className={`capitalize ${!open ? "hidden" : "block"}`}>
              {link.to}
            </h3>
          </NavLink>
        ))}
      </div>

      {/* parametre */}
      <div className="mt-auto p-3">
        <Link className="flex gap-2 " to={"parametre"}>
          <span>
            <RiSettings3Fill size={25} />
          </span>
          <h3 className={`capitalize ${!open ? "hidden" : "block"}`}>
            Parametre
          </h3>
        </Link>
      </div>
    </nav>
  );
}
