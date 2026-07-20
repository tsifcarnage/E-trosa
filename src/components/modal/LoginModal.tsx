import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import { supabase } from "../../utils/supabaseClient";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
interface LoginModalProps {
    onClose: () => void;
    onSignUp: () => void;
}
export const LoginModal = ({ onClose, onSignUp }: LoginModalProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        setLoading(false);
        if (error) {
            setErrorMsg(error.message);
        } else {
            navigate('/accueil')
            onClose();
        }
    }
    return (
        <ModalLayout onClose={onClose} >
            <form className="flex flex-col gap-2" onSubmit={handleLogin}>
                <h3 className=" text-base-content font-medium">Connexion</h3>
                {/* On affiche le message d'erreur s'il y en a un */}
                {errorMsg && (
                    <p className="text-error bg-error/10 p-2 rounded text-sm text-center">
                        {errorMsg === "Invalid login credentials"
                            ? "Email ou mot de passe incorrect."
                            : errorMsg}
                    </p>
                )}
                <label >Email</label>
                <input type="email" className="input input-primary w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple@mail.com" required />
                <label >Mot de passe</label>

                <div className="relative w-full">
                    <input type={showPassword ? "text" : "password"} className="input input-primary w-full" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******" required />
                    <button
                        type="button"
                        className="btn btn-outline border-none p-0 bg-transparent hover:scale-105 absolute inset-y-0 right-3 flex items-center "
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </button>
                </div>

                <button className="btn btn-primary mt-5" disabled={loading}>{loading ? "Connexion en cours..." : "Se connecter"}</button>

                <small>Vous n'avez pas de compte? <button
                    type="button"
                    className="hover:link text-primary"
                    onClick={onSignUp}
                >
                    Inscrivez-vous
                </button></small>
            </form>
        </ModalLayout>
    )
}