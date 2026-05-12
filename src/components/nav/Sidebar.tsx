import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiSettings3Fill, RiMenuUnfoldLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import type { ISidebarProps } from "../../models/ui.interfaces";

export default function Sidebar({ links = [] }: ISidebarProps) {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <aside
      className={`flex self-start text-amber-50 sticky z-2 top-0 flex-col  bg-neutral w-full shadow-md shadow-secondary h-screen duration-300 ${open ? " max-w-60" : "max-w-13"}`}
    >
      {/* en-tete */}
      <div className=" flex justify-between p-2 pt-7 gap-2 mb-6">
        <Link to={"accueil"} className={`text-xl ${!open ? "hidden" : " flex gap-2 uppercase"}`}>
          <FcMoneyTransfer size={30} />
          <span className="self-center whitespace-nowrap">e-trosa</span>
        </Link>

        <RiMenuUnfoldLine
          size={30}
          onClick={() => setOpen(!open)}
          className={`cursor-pointer duration-300 ${open ? "" : "rotate-180"}`}
        />
      </div>

      {/* menu */}
      <div className="flex flex-col gap-10 pt-10 grow text-[clamp(18px,3vw,22px)]">
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.to}
            className={({ isActive }) =>
              `flex gap-2 m-3 transition-colors hover:text-secondary ${isActive ? "text-secondary" : "transparent"}`
            }
            title={!open ? link.to.toUpperCase() : undefined}
          >
            <span>{link.icon}</span>{" "}
            <h3 className={`capitalize ${!open ? "hidden" : "block "}`}>
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
    </aside>
  );
}
