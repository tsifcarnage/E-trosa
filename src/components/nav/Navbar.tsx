import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import type { ISidebarProps } from "../../models/ui.interfaces";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Navbar({ links }: ISidebarProps) {
    const location = useLocation();
    const currentPath = location.pathname.split("/").pop();
    const currentLink = links.find(link => link.to === currentPath);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);

    const handleClick = () => {
        setIsSummaryOpen(false);
    };

    return (
        <nav className="flex justify-between p-4 sticky top-0 z-100 bg-base-100">
            <h3 className="grow self-center">{currentLink?.label || ""}</h3>
            <section className="ml-auto flex gap-2">
                <ThemeToggle />

                {/* user logo */}
                <div className="relative">
                    <button
                        className="flex cursor-pointer gap-2 bg-neutral rounded-full p-2 text-[#c9cbd0] border-2 border-secondary"
                        onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                    >
                        <FaRegUserCircle size={40} />
                        <h3 className="self-center">User Name</h3>
                    </button>

                    {isSummaryOpen && (
                        <ul className="  dropdown-content bg-neutral btn-neutral box-shad-user w-full rounded-b-2xl text-center p-2 absolute -z-1 top-10 left-0">
                            <li className=" pt-4 text-[#c9cbd0] hover:text-[#3bf538c8] border-b border-b-[#8a38f5c8] py-2 cursor-pointer">
                                <Link to={"/parametre"} onClick={handleClick}>Voir Profil</Link>
                            </li>
                            <li className="py-2 cursor-pointer text-red-500" onClick={handleClick}>Se déconnecter</li>
                        </ul>
                    )}
                </div>
            </section>
        </nav>
    );
}