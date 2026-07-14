import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import { supabase } from "../../utils/supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignUpModalProps {
    onClose: () => void;
    // onSuccess: () => void;
}

export const SignUpModal = ({ onClose }: SignUpModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        setSuccessMsg("Un email de confirmation a été envoyé à " + email + ". Vérifiez votre boîte mail avant de vous connecter.");

    };

    return (
        <ModalLayout onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <h3 className="text-base-content font-medium text-lg mb-2">Inscription</h3>

                {errorMsg && (
                    <p className="text-error bg-error/10 p-2 rounded text-sm text-center">
                        {errorMsg}
                    </p>
                )}
                {successMsg && (
                    <p className="text-success bg-success/10 p-2 rounded text-sm text-center">
                        {successMsg}
                    </p>
                )}
                <label className="text-sm font-medium">Prénom</label>
                <input
                    type="text"
                    className="input input-primary w-full"
                    value={firstName}
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <label className="text-sm font-medium">Nom</label>
                <input
                    type="text"
                    className="input input-primary w-full"
                    value={lastName}
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <label className="text-sm font-medium">Email</label>
                <input
                    type="email"
                    className="input input-primary w-full"
                    value={email}
                    placeholder="exemple@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label className="text-sm font-medium">Mot de passe</label>
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input input-primary w-full"
                        value={password}
                        placeholder="******"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline border-none p-0 hover:bg-transparent absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>

                <button type="submit" className="btn btn-primary mt-5" disabled={loading}>
                    {loading ? "Création du compte..." : "S'inscrire"}
                </button>
            </form>
        </ModalLayout>
    );
};