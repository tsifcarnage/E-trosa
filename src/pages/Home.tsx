import { RiDashboardHorizontalFill } from "react-icons/ri"
import CoinAnimation from "../components/CoinAnimation"
import type { Ilink } from "../models/ui.interfaces"
import CallToAction from "../components/CallToAction"
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi"

const ctActions: Ilink[] = [
    { title: "Dashboard", label: "Vue globale de l'application", icon: <RiDashboardHorizontalFill size={50} />, to: "/dashboard" },
    { title: "Dettes", label: "Liste et modification des dettes ", icon: <GiPayMoney size={50} />, to: "/dettes" },
    { title: "Créances", label: "Liste et modification des créances", icon: <GiReceiveMoney size={50} />, to: "/creances" },
    { title: "Paiements", label: "Historique de paiement effectué", icon: <GiTakeMyMoney size={50} />, to: "/paiements" },
]
function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="purple text-center">Bienvenue</h1>
            <h3 className="text-center w-full px-2 max-w-2xl self-center">Cette plateforme vous permet d'enregistrer et de gérer vos dettes et vos créances, ainsi que de suivre vos paiements et visualiser votre progression.</h3>
            <CoinAnimation />
            <CallToAction ctActions={ctActions} />
        </div>
    )
}

export default Home
