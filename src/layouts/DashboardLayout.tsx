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

const links: Ilink[] = [
  { icon: <RiHome2Line size={25} />, to: "accueil" },
  { icon: <RiDashboardHorizontalFill size={25} />, to: "dashboard" },
  { icon: <RiMoneyEuroCircleLine size={25} />, to: "dettes" },
  { icon: <RiUser2Fill size={25} />, to: "creances" },
  { icon: <RiBankCard2Line size={25} />, to: "paiements" },
];
export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar links={links} />
      <div>
        
      </div>
      <Outlet />
    </div>
  );
}
