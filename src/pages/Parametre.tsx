import { FaCamera, FaLock, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "../utils/debts.service";

export default function Parametre() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // 1. On récupère l'user connecté directement via Supabase (synchrone/rapide pour le statut)
    const [user, setUser] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [profileMsg, setProfileMsg] = useState<string | null>(null);
    const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingPassword, setLoadingPassword] = useState(false);

    // 2. TanStack Query s'occupe du profil (Prénom, Nom, Avatar)
    const { data: profile } = useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
        staleTime: 1000 * 60 * 10,
    });

    // Formulaire d'édition local synchronisé avec le cache TanStack
    const [editForm, setEditForm] = useState({ first_name: "", last_name: "" });

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            if (data.user) setEmail(data.user.email ?? "");
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) setEmail(session.user.email ?? "");
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    // Remplir les champs du formulaire quand les données du profil arrivent du cache
    useEffect(() => {
        if (profile) {
            setEditForm({
                first_name: profile.first_name || "",
                last_name: profile.last_name || ""
            });
            if (profile.avatar_url) setAvatarPreview(profile.avatar_url);
        }
    }, [profile]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        queryClient.setQueryData(["userProfile"], null); // Nettoie le cache
        navigate('/accueil');
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    // 3. Sauvegarde simplifiée (qui invalide le cache à la fin)
    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setLoadingProfile(true);
        setProfileMsg(null);

        let avatar_url = profile?.avatar_url || null;

        if (avatarFile) {
            const fileExt = avatarFile.name.split('.').pop();
            const filePath = `${user.id}/avatar.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, avatarFile, { upsert: true });

            if (uploadError) {
                setProfileMsg("Erreur upload photo : " + uploadError.message);
                setLoadingProfile(false);
                return;
            }

            const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
            avatar_url = urlData.publicUrl;
        }

        const { error: profileError } = await supabase
            .from("profiles")
            .upsert({
                id: user.id,
                first_name: editForm.first_name,
                last_name: editForm.last_name,
                avatar_url,
            });

        if (profileError) {
            setProfileMsg("Erreur : " + profileError.message);
            setLoadingProfile(false);
            return;
        }

        if (email !== user.email) {
            const { error: emailError } = await supabase.auth.updateUser({ email });
            if (emailError) {
                setProfileMsg("Erreur email : " + emailError.message);
                setLoadingProfile(false);
                return;
            }
        }

        // LE TRUC MAGIQUE : On dit à TanStack que le profil a changé.
        // La Home et la Navbar vont instantanément se retélécharger en tâche de fond !
        await queryClient.invalidateQueries({ queryKey: ["userProfile"] });

        setAvatarFile(null);
        setProfileMsg("✓ Profil mis à jour !");
        setLoadingProfile(false);
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordMsg("Les mots de passe ne correspondent pas.");
            return;
        }
        setLoadingPassword(true);
        setPasswordMsg(null);

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            setPasswordMsg("Erreur : " + error.message);
        } else {
            setPasswordMsg("✓ Mot de passe mis à jour !");
            setNewPassword("");
            setConfirmPassword("");
        }
        setLoadingPassword(false);
    };

    if (!user) return (
        <div className="px-6 flex flex-col items-center justify-center h-[70vh] gap-6 text-neutral-content">
            <div className="bg-neutral rounded-[10px] p-10 flex flex-col items-center gap-4 max-w-md w-full text-center">
                <FaRegUser size={60} className="text-primary opacity-40" />
                <h2 className="text-base-content text-xl font-medium">Profil non disponible</h2>
                <p className="text-sm opacity-60">Connectez-vous pour accéder à votre profil et gérer vos informations personnelles.</p>
                <button className="btn btn-primary w-full mt-2" onClick={() => navigate('/accueil')}>
                    Se connecter
                </button>
            </div>
        </div>
    );

    return (
        <div className="px-6">
            <h2 className="mb-5 text-base-content">Profil</h2>
            <div className="flex flex-col md:flex-row gap-5 justify-between text-neutral-content">

                {/* Card profil */}
                <section className="flex flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px] items-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative group">
                            {avatarPreview
                                ? <img src={avatarPreview} className="rounded-full h-24 w-24 object-cover" />
                                : <div className="rounded-full border-2 border-primary h-24 w-24 flex items-center justify-center"><FaRegUser size={40} className="opacity-30 text-white" /></div>
                            }
                            <label className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <FaCamera size={20} className="text-white" />
                                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h3>{profile?.first_name} {profile?.last_name}</h3>
                        <h3>{user.email}</h3>
                        <p className="badge badge-outline badge-success my-3">✓ Compte vérifié</p>
                    </div>
                </section>

                {/* Card stats */}
                <section className="flex-2 flex flex-wrap justify-between items-center bg-neutral p-5 rounded-[10px]">
                    <div>
                        <h3>Total dette: 1000€</h3>
                        <h3>Total créance: 2000€</h3>
                        <h3 className="text-success">Financièrement bon</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to={'/dashboard'} className="btn btn-info">Dashboard</Link>
                        <button className="btn btn-error" onClick={handleLogout}>Déconnexion</button>
                    </div>
                </section>
            </div>

            <div className="flex flex-wrap flex-col sm:flex-row gap-5 justify-between my-5 text-neutral-content">
                {/* Infos personnelles */}
                <section className="flex flex-col flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px]">
                    <h3 className="text-white flex gap-1">
                        <span className="self-center text-primary"><FaRegUser size={20} /></span>
                        Informations Personnelles
                    </h3>
                    {profileMsg && (
                        <p className={`text-sm p-2 rounded text-center ${profileMsg.startsWith("✓") ? "text-success bg-success/10" : "text-error bg-error/10"}`}>
                            {profileMsg}
                        </p>
                    )}
                    <form onSubmit={handleSaveProfile} className="flex flex-col gap-2">
                        <label>Prénom</label>
                        <input
                            type="text"
                            className="input input-sm input-primary bg-neutral w-full"
                            value={editForm.first_name}
                            onChange={(e) => setEditForm(p => ({ ...p, first_name: e.target.value }))}
                        />
                        <label>Nom</label>
                        <input
                            type="text"
                            className="input input-sm input-primary bg-neutral w-full"
                            value={editForm.last_name}
                            onChange={(e) => setEditForm(p => ({ ...p, last_name: e.target.value }))}
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            className="input input-sm input-primary bg-neutral w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="btn btn-primary mt-3" disabled={loadingProfile}>
                            {loadingProfile ? "Sauvegarde..." : "Sauvegarder les modifications"}
                        </button>
                    </form>
                </section>

                {/* Mot de passe */}
                <section className="flex flex-col flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px]">
                    <h3 className="text-white flex gap-1">
                        <span className="self-center text-primary"><FaLock size={20} /></span>
                        Modifier le mot de passe
                    </h3>
                    {passwordMsg && (
                        <p className={`text-sm p-2 rounded text-center ${passwordMsg.startsWith("✓") ? "text-success bg-success/10" : "text-error bg-error/10"}`}>
                            {passwordMsg}
                        </p>
                    )}
                    <form onSubmit={handleUpdatePassword} className="flex flex-col gap-2">
                        <label>Nouveau mot de passe</label>
                        <input type="password" className="input input-sm input-primary bg-neutral w-full" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <label>Confirmer le mot de passe</label>
                        <input type="password" className="input input-sm input-primary bg-neutral w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button className="btn btn-primary mt-3" disabled={loadingPassword}>
                            {loadingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}