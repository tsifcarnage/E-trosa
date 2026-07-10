import { FaRegUser } from "react-icons/fa";
import type { IProfileInfoFormProps } from "../../models/profils.interfaces";

export default function ProfileInfoForm({
    editForm,
    setEditForm,
    email,
    setEmail,
    profileMsg,
    loadingProfile,
    onSubmit,
}: IProfileInfoFormProps) {
    return (
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
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <label>Prénom</label>
                <input
                    type="text"
                    className="input input-primary bg-neutral w-full"
                    value={editForm.first_name}
                    onChange={(e) => setEditForm(p => ({ ...p, first_name: e.target.value }))}
                />
                <label>Nom</label>
                <input
                    type="text"
                    className="input input-primary bg-neutral w-full"
                    value={editForm.last_name}
                    onChange={(e) => setEditForm(p => ({ ...p, last_name: e.target.value }))}
                />
                <label>Email</label>
                <input
                    type="email"
                    className="input input-primary bg-neutral w-full disabled:text-gray-500 disabled:border-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                />
                <button className="btn btn-primary mt-3" disabled={loadingProfile}>
                    {loadingProfile ? "Sauvegarde..." : "Sauvegarder les modifications"}
                </button>
            </form>
        </section>
    );
}