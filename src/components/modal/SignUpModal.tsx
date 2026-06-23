import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import { supabase } from "../../utils/supabaseClient";

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
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
setLoading(true);
        setErrorMsg(null);

        // 3. Appel de l'API Supabase pour l'inscription
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            // L'inscription a fonctionné ! On appelle ton callback de succès
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
                <input
                    type="password"
                    className="input input-primary w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

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