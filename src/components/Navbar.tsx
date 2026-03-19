
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import type { SidebarProps } from "../models/interfaces";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar({ links }: SidebarProps) {
    const location = useLocation();
    const currentPath = location.pathname.split("/").pop();
    const currentLink = links.find(link => link.to === currentPath);

    return (
        <nav className="flex justify-between p-4 sticky bg-base-100">
            <h3 className="grow">{currentLink?.label || ""}</h3>
            <section className="ml-auto flex gap-2">
                <ThemeToggle />
                <div className="flex gap-2 bg-neutral rounded-full p-2 text-[#c9cbd0] box-shad-user">
                    <FaRegUserCircle size={40} />
                    <h3 className="self-center">User Name</h3>
                </div>
            </section>
        </nav>
    )
}