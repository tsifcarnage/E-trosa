import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import type { ISidebarProps } from "../../models/ui.interfaces";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { LoginModal } from "../modal/LoginModal";
import { SignUpModal } from "../modal/SignUpModal";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabaseClient";

export default function Navbar({ links }: ISidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const currentLink = links.find((link) => link.to === currentPath);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    //Fetch loading session 
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    //Listen auth event in real time
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe();
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsSummaryOpen(false)
  }

  const handleClick = () => {
    setIsSummaryOpen(false);
  };

  return (
    <nav className="flex justify-between p-6 sticky top-0 z-20 bg-base-100">
      <h3 className={`grow self-center ${!user ? "hidden md:flex" : ""}`}>
        {currentLink?.label || ""}
      </h3>
      <section className="ml-auto flex gap-2">
        <ThemeToggle />

        {/* connexion */}
        {!user && (
          <div>
            <button className="self-center cursor-pointer bg-secondary hover:bg-success rounded-full px-3 py-2.5 text-base-100 font-medium transition-all duration-100 " onClick={() => setOpenLogin(true)}>
              Se connecter
            </button>
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
          </div>)}

        {/* user logo */}
        <div className="relative">
          <button
            className={`flex cursor-pointer gap-1 bg-neutral rounded-full px-3 py-2 text-neutral-content ${isSummaryOpen ? "text-success" : "hover:text-success"
              }`}
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
          >
            <FaRegUserCircle size={25} className="self-center" />
            <h3 className="self-center truncate max-w-24 sm:max-w-48">{user ? user.email : "Anonyme"}</h3>
          </button>

          {isSummaryOpen && (
            <ul className="  dropdown-content bg-neutral btn-neutral box-shad-user w-full rounded-b-2xl text-center p-2 absolute -z-1 top-6 left-0">
              <li className=" pt-4 text-neutral-content hover:scale-105 border-b border-b-[#8a38f5c8] py-2 cursor-pointer">
                <Link to={"/parametre"} onClick={handleClick}>
                  Voir Profil
                </Link>
              </li>
              {user ? (
                <li
                  className="py-2 cursor-pointer text-red-500 hover:scale-105"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </li>
              ) : (
                <li
                  className="py-2 cursor-pointer text-primary hover:scale-105"
                  onClick={() => { setOpenLogin(true); setIsSummaryOpen(false); }}
                >
                  Se connecter
                </li>
              )}
            </ul>
          )}
        </div>
      </section>
    </nav>
  );
}
