import { useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiSettings3Fill, RiMenuUnfoldLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import type { SidebarProps } from "../models/interfaces";

export default function Sidebar({ links = [] }: SidebarProps) {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <aside
      className={`flex text-amber-50  flex-col box-shad bg-neutral w-full shadow-md h-screen duration-300 ${open ? " max-w-60" : "max-w-13"}`}
    >
      {/* en-tete */}
      <div className=" flex justify-between p-2 pt-4 gap-2 mb-6">
        <h2 className={` ${!open ? "hidden" : "flex gap-2 uppercase"}`}>
          <FcMoneyTransfer size={30} />
          <span className="self-center">e-trosa</span>
        </h2>

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
    </aside>
  );
}
