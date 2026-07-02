import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import { supabase } from "../../utils/supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignUpModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const SignUpModal = ({
    onClose,
    onSuccess,
}: SignUpModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            onSuccess();
        }
    };

    return (
        <ModalLayout onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <h3 className="text-base-content font-medium">
                    Inscription
                </h3>
                {errorMsg && (
                    <p className="text-error bg-error/10 p-2 rounded text-sm text-center">
                        {errorMsg}
                    </p>
                )}
                <label>Email</label>
                <input
                    type="email"
                    className="input input-primary w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Mot de passe</label>
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="input input-primary w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="btn btn-outline border-none p-0 hover:bg-transparent hover:scale-105 absolute inset-y-0 right-3 flex items-center "
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mt-5"
                    disabled={loading}
                >
                    {loading ? "Création du compte..." : "S'inscrire"}
                </button>
            </form>
        </ModalLayout>
    );
};