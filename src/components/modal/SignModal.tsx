import ModalLayout from "../../layouts/ModalLayout";

interface SignModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const SignModal = ({
    onClose,
    onSuccess,
}: SignModalProps) => {
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        // ton appel API d'inscription
        // await registerUser(...)

        onSuccess();
    };

    return (
        <ModalLayout onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <h3 className="text-base-content font-medium">
                    Inscription
                </h3>

                <label>Email</label>
                <input
                    type="email"
                    className="input input-primary w-full"
                />

                <label>Mot de passe</label>
                <input
                    type="password"
                    className="input input-primary w-full"
                />

                <button
                    type="submit"
                    className="btn btn-primary mt-5"
                >
                    S'inscrire
                </button>
            </form>
        </ModalLayout>
    );
};