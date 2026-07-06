import { RiDashboardHorizontalFill } from "react-icons/ri";
import CoinAnimation from "../components/CoinAnimation";
import type { Ilink } from "../models/ui.interfaces";
import CallToAction from "../components/CallToAction";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa"; // Icône par défaut si pas d'avatar
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import type { IProfile } from "../models/debts.interfaces";

const ctActions: Ilink[] = [
    { title: "Dashboard", label: "Vue globale de l'application", icon: <RiDashboardHorizontalFill size={50} />, to: "/dashboard" },
    { title: "Dettes", label: "Liste et modification des dettes ", icon: <GiPayMoney size={50} />, to: "/dettes" },
    { title: "Créances", label: "Liste et modification des créances", icon: <GiReceiveMoney size={50} />, to: "/creances" },
    { title: "Paiements", label: "Historique de paiement effectué", icon: <GiTakeMyMoney size={50} />, to: "/paiements" },
];

function Home() {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Récupère l'utilisateur connecté
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                // 2. Récupère son profil (Prénom, Nom, Avatar)
                supabase
                    .from("profiles")
                    .select("first_name, last_name, avatar_url")
                    .eq("id", user.id)
                    .maybeSingle()
                    .then(({ data: profileData }) => {
                        if (profileData) {
                            setProfile(profileData);
                        }
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            {/* Titre Bienvenue personnalisé */}
            <h1 className="purple text-center mb-0">
                Bienvenue {profile?.first_name} {profile?.last_name}
            </h1>

            {/* Affichage de l'image de profil / Avatar récupéré depuis Parametre */}
            {!loading && profile && (
                <div className="my-2">
                    {profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt="Avatar"
                            className="rounded-full h-40 w-40 object-cover shadow-lg"
                        />
                    ) : (
                        <div className="rounded-full border-2 border-primary h-24 w-24 flex items-center justify-center bg-neutral">
                            <FaRegUser size={40} className="opacity-30 text-white" />
                        </div>
                    )}
                </div>
            )}

            <h3 className="text-center w-full px-2 max-w-2xl self-center">
                Cette plateforme vous permet d'enregistrer et de gérer vos dettes et vos créances, ainsi que de suivre vos paiements et visualiser votre progression.
            </h3>

            <CoinAnimation />
            <CallToAction ctActions={ctActions} />
        </div>
    );
}

export default Home;