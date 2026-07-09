import { FaCamera, FaRegUser } from "react-icons/fa";
import type { IProfileCardProps } from "../../models/profils.interfaces";

export default function ProfileCard({
    avatarPreview,
    firstName,
    lastName,
    email,
    avatarFile,
    loadingProfile,
    onAvatarChange,
    onSaveAvatar,
}: IProfileCardProps) {
    return (
        <section className="flex flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px] items-center">
            <div className="flex flex-col items-center gap-2">
                <div className="relative group">
                    {avatarPreview
                        ? <img src={avatarPreview} className="rounded-full h-24 w-24 object-cover" />
                        : <div className="rounded-full border-2 border-primary h-24 w-24 flex items-center justify-center"><FaRegUser size={40} className="opacity-30 text-white" /></div>
                    }
                    <label className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <FaCamera size={20} className="text-white" />
                        <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
                    </label>
                </div>
                {avatarFile && (
                    <button className="btn btn-primary btn-xs" disabled={loadingProfile} onClick={onSaveAvatar}>
                        {loadingProfile ? "..." : "Enregistrer"}
                    </button>
                )}
            </div>
            <div>
                <h3>{firstName} {lastName}</h3>
                <h3>{email}</h3>
                <p className="badge badge-outline badge-success my-3">✓ Compte vérifié</p>
            </div>
        </section>
    );
}