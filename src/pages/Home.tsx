import { RiDashboardHorizontalFill } from "react-icons/ri";
import CoinAnimation from "../components/CoinAnimation";
import type { Ilink } from "../models/ui.interfaces";
import CallToAction from "../components/CallToAction";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; // Import de TanStack
import { supabase } from "../utils/supabaseClient";
import { fetchUserProfile } from "../utils/debts.service";

const ctActions: Ilink[] = [
    { title: "Dashboard", label: "Vue globale de l'application", icon: <RiDashboardHorizontalFill size={50} />, to: "/dashboard" },
    { title: "Dettes", label: "Liste et modification des dettes ", icon: <GiPayMoney size={50} />, to: "/dettes" },
    { title: "Créances", label: "Liste et modification des créances", icon: <GiReceiveMoney size={50} />, to: "/creances" },
    { title: "Paiements", label: "Historique de paiement effectué", icon: <GiTakeMyMoney size={50} />, to: "/paiements" },
];

function Home() {
    const queryClient = useQueryClient();

    // 1. Branchement TanStack Query
    const { data: profile, isLoading } = useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
        staleTime: 1000 * 60 * 10, // Cache de 10 minutes
    });

    // 2. Écouteur magique : Si la session change, on force le rafraîchissement global !
    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            queryClient.invalidateQueries({ queryKey: ["debts"] });
        });
        return () => listener.subscription.unsubscribe();
    }, [queryClient]);

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            {/* Affichage de l'avatar*/}
            {!isLoading && profile && (
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
            {/* Si connecté, affiche Nom/Prénom, sinon juste Bienvenue */}
            <h1 className="purple text-center">
                Bienvenu(e) {profile ? `${profile.first_name} ${profile.last_name}` : ""}
            </h1>

            <h3 className="text-center w-full px-2 max-w-2xl self-center">
                Cette plateforme vous permet d'enregistrer et de gérer vos dettes et vos créances, ainsi que de suivre vos paiements et visualiser votre progression.
            </h3>

            <CoinAnimation />
            <CallToAction ctActions={ctActions} />
        </div>
    );
}

export default Home;