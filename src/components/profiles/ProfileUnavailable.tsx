import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { LoginModal } from "../modal/LoginModal";
import { SignUpModal } from "../modal/SignUpModal";

export default function ProfileUnavailable() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <div className="px-6 flex flex-col items-center justify-center h-[70vh] gap-6 text-neutral-content">
      <div className="bg-neutral rounded-[10px] p-10 flex flex-col items-center gap-4 max-w-md w-full text-center">
        <FaRegUser size={60} className="text-primary opacity-40" />
        <h2 className="text-base-content text-xl font-medium">
          Profil non disponible
        </h2>
        <p className="text-sm opacity-60">
          Connectez-vous pour accéder à votre profil et gérer vos informations personnelles.
        </p>
        <button
          className="btn btn-primary w-full mt-2"
          onClick={() => setOpenLogin(true)}
        >
          Se connecter
        </button>
      </div>

      {openLogin && (
        <LoginModal
          onClose={() => setOpenLogin(false)}
          onSignUp={() => {
            setOpenLogin(false);
            setOpenSignUp(true);
          }}
        />
      )}

      {openSignUp && (
        <SignUpModal
          onClose={() => setOpenSignUp(false)}
        />
      )}
    </div>
  );
}