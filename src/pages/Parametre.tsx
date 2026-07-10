import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "../utils/debts.service";
import ProfilUnavailable from "../components/profiles/ProfileUnavailable";
import ProfileInfoForm from "../components/profiles/ProfileInfoForm";
import PasswordForm from "../components/profiles/PasswordForm";
import ProfileCard from "../components/profiles/ProfileCard";
import ProfileStats from "../components/profiles/ProfileStats";

export default function Parametre() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 1. On récupère l'user connecté directement via Supabase (synchrone/rapide pour le statut)
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) setEmail(session.user.email ?? "");
      },
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // Remplir les champs du formulaire quand les données du profil arrivent du cache
  useEffect(() => {
    if (profile) {
      setEditForm({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      });
      if (profile.avatar_url) setAvatarPreview(profile.avatar_url);
    }
  }, [profile]);

  const handleDeleteAccount = () => {
    const modal = document.getElementById("delete_modal") as HTMLDialogElement;
    modal?.showModal();
};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    queryClient.setQueryData(["userProfile"], null); // Nettoie le cache
    navigate("/accueil");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSaveAvatar = async () => {
    if (!user || !avatarFile) return;
    setLoadingProfile(true);

    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) {
      setLoadingProfile(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    const avatar_url = `${urlData.publicUrl}?t=${Date.now()}`;

    await supabase.from("profiles").upsert({ id: user.id, avatar_url });
    await queryClient.invalidateQueries({ queryKey: ["userProfile"] });

    setAvatarFile(null);
    setLoadingProfile(false);
  };

  const handleSaveProfile = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoadingProfile(true);
    setProfileMsg(null);

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: user.id,
      first_name: editForm.first_name,
      last_name: editForm.last_name,
      avatar_url: profile?.avatar_url || null,
    });

    if (profileError) {
      setProfileMsg("Erreur : " + profileError.message);
      setLoadingProfile(false);
      return;
    }

    const { error: emailError } = await supabase.auth.updateUser({ email });
    if (emailError) {
      setProfileMsg("Erreur email : " + emailError.message);
      setLoadingProfile(false);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    setProfileMsg("✓ Profil mis à jour !");
    setLoadingProfile(false);
  };

  const handleUpdatePassword = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    if (newPassword !== confirmPassword) {
      setPasswordMsg("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    setLoadingPassword(true);
    setPasswordMsg(null);

    // Étape A : On vérifie le mot de passe actuel en tentant un "re-login" en arrière-plan
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (loginError) {
      setPasswordMsg("Le mot de passe actuel est incorrect.");
      setLoadingPassword(false);
      return;
    }

    // Étape B : Si le login réussit, le mot de passe actuel est valide, on le change !
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setPasswordMsg("Erreur lors de la mise à jour : " + updateError.message);
    } else {
      setPasswordMsg("✓ Mot de passe mis à jour !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoadingPassword(false);
  };

  if (!user) return <ProfilUnavailable />;

  return (
    <div className="px-6">
      <h2 className="mb-5 text-base-content">Profil</h2>
      <div className="flex flex-col md:flex-row gap-5 justify-between text-neutral-content">
        {/* Card profil */}
        <ProfileCard
          avatarPreview={avatarPreview}
          firstName={profile?.first_name ?? ""}
          lastName={profile?.last_name ?? ""}
          email={user.email ?? ""}
          avatarFile={avatarFile}
          loadingProfile={loadingProfile}
          onAvatarChange={handleAvatarChange}
          onSaveAvatar={handleSaveAvatar}
        />

        {/* Card stats */}
        <ProfileStats user={user} onDeleteAccount={handleDeleteAccount} onLogout={handleLogout}/>
      </div>

      <div className="flex flex-wrap flex-col sm:flex-row gap-5 justify-between my-5 text-neutral-content">
        {/* Infos personnelles */}
        <ProfileInfoForm
          editForm={editForm}
          setEditForm={setEditForm}
          email={email}
          setEmail={setEmail}
          profileMsg={profileMsg}
          loadingProfile={loadingProfile}
          onSubmit={handleSaveProfile}
        />

        {/* Mot de passe */}
        <PasswordForm
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          passwordMsg={passwordMsg}
          loadingPassword={loadingPassword}
          onSubmit={handleUpdatePassword}
        />
      </div>
    </div>
  );
}
