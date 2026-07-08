import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import type { IPasswordFormProps } from "../../models/profils.interfaces";

export default function PasswordForm({
    currentPassword, setCurrentPassword,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    showPassword, setShowPassword,
    passwordMsg, loadingPassword, onSubmit,
}: IPasswordFormProps) {
    return (
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
            <form onSubmit={onSubmit} className="flex flex-col gap-2">
                <label>Mot de passe actuel</label>
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input input-primary bg-neutral w-full"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe actuel"
                        required
                    />
                    <button type="button" className="btn btn-outline border-none p-0 hover:bg-transparent absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>
                <label>Nouveau mot de passe</label>
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input input-primary bg-neutral w-full"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Entrez un nouveau mot de passe"
                        required
                    />
                    <button type="button" className="btn btn-outline border-none p-0 hover:bg-transparent absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>
                <label>Confirmer le nouveau mot de passe</label>
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input input-primary bg-neutral w-full"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmer le mot de passe"
                        required
                    />
                    <button type="button" className="btn btn-outline border-none p-0 hover:bg-transparent absolute inset-y-0 right-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>
                <button className="btn btn-primary mt-3" disabled={loadingPassword}>
                    {loadingPassword ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                </button>
            </form>
        </section>
    );
}