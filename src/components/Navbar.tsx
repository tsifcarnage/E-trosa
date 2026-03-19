
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import type { SidebarProps } from "../models/interfaces";

export default function Navbar({ links }: SidebarProps) {
    const location = useLocation();
    const currentPath = location.pathname.split("/").pop();
    const currentLink = links.find(link => link.to === currentPath);

    return (
        <nav className="flex justify-between p-4">
            <h3 className="grow">{currentLink?.label || "Accueil"}</h3>
            <div className="ml-auto">
                <ThemeToggle />
            </div>
        </nav>
    )
}