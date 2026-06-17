import ModalLayout from "../../layouts/ModalLayout";
interface LoginModalProps {
    onClose: () => void;
    onSignUp: () => void;
}
export const LoginModal = ({ onClose, onSignUp }: LoginModalProps) => {

    return (
        <ModalLayout onClose={onClose} >
            <form className="flex flex-col gap-2">
                <h3 className=" text-base-content font-medium">Connexion</h3>
                <label >Email</label>
                <input type="email" className="input input-primary w-full" />
                <label >Mot de passe</label>
                <input type="password" className="input input-primary w-full" />
                <button className="btn btn-primary mt-5">Se connecter</button>
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