import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  RiBankCard2Line,
  RiDashboardHorizontalFill,
  RiHome2Line,
  RiMoneyEuroCircleLine,
  RiUser2Fill,
} from "react-icons/ri";
import type { Ilink } from "../models/interfaces";
import Navbar from "../components/Navbar";

const links: Ilink[] = [
  { icon: <RiHome2Line size={25} />, to: "accueil", label: "Accueil" },
  { icon: <RiDashboardHorizontalFill size={25} />, to: "dashboard", label: "Vue global" },
  { icon: <RiMoneyEuroCircleLine size={25} />, to: "dettes", label: "Gestion des Dettes" },
  { icon: <RiUser2Fill size={25} />, to: "creances", label: "Gestion des Créances" },
  { icon: <RiBankCard2Line size={25} />, to: "paiements", label: "Historique des paiements" },
];
export default function DashboardLayout() {
  return (
    <div className="flex gap-3">
      <Sidebar links={links} />
      <div className="flex flex-col w-full">
        <Navbar links={links} />
        <Outlet />
      </div>
    </div>
  );
}
