// export const handleSaveAvatar = async () => {
//     if (!user || !avatarFile) return;
//     setLoadingProfile(true);

//     const fileExt = avatarFile.name.split('.').pop();
//     const filePath = `${user.id}/avatar.${fileExt}`;

//     const { error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(filePath, avatarFile, { upsert: true });

//     if (uploadError) {
//         setProfileMsg("Erreur upload photo : " + uploadError.message);
//         setLoadingProfile(false);
//         return;
//     }

//     const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
//     const avatar_url = urlData.publicUrl;

//     await supabase.from("profiles").upsert({ id: user.id, avatar_url });

//     setProfile(p => ({ ...p, avatar_url }));
//     setAvatarFile(null); // ← fait disparaître le bouton
//     setLoadingProfile(false);
// };
