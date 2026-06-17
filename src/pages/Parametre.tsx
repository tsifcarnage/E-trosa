import { FaLock, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Parametre() {
    return (
        <div className="px-6">
            <h2 className="mb-5 text-base-content">Profil</h2>
            <div className="flex flex-wrap gap-5 justify-between text-neutral-content">
                <section className="flex flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px] items-center">
                    <p className="rounded-full bg-white h-30 w-30" />
                    <div>
                        <h3>User name</h3>
                        <h3>Adresse@email.com</h3>
                        <p className="badge badge-outline badge-success my-3"> ✓ Compte vérifié</p>
                    </div>
                </section>
                <section className="flex-2 flex flex-wrap justify-between items-center bg-neutral p-5 rounded-[10px]">
                    <div>
                        <h3>Total dette: 1000€</h3>
                        <h3>Total créance: 2000€</h3>
                        <h3 className="text-success">Financièrement bon</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to={'/dashboard'} className="btn btn-info">Dashboard</Link>
                        <button className="btn btn-error">Déconnexion</button>
                    </div>
                </section>
            </div>
            <div className="flex flex-wrap gap-5 justify-between my-5 text-neutral-content">
                <section className="flex flex-col flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px]">
                    <h3 className="text-white flex gap-1"> <span className="self-center text-primary"><FaRegUser size={20}/></span>Informations Personnelles</h3>
                    <form action="" className="flex flex-col gap-2">
                        <label>Nom Complet</label>
                        <input type="text" className="input input-sm input-primary bg-neutral w-full"/>
                        <label>Email</label>
                        <input type="email" className="input input-sm input-primary bg-neutral w-full"/>
                        <button className="btn btn-primary mt-3">Sauvegarder les modifications</button>
                    </form>
                </section>

                <section className="flex flex-col flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px]">
                    <h3 className="text-white flex gap-1"> <span className="self-center text-primary"><FaLock size={20}/></span>Informations Personnelles</h3>
                    <form action="" className="flex flex-col gap-2">
                        <label>Mot de passe actuel</label>
                        <input type="password" className="input input-sm input-primary bg-neutral w-full"/>
                        <label>Nouveau mot de passe</label>
                        <input type="password" className="input input-sm input-primary bg-neutral w-full"/>
                        <button className="btn btn-primary mt-3">Mettre à jour le mot de passe</button>
                    </form>
                </section>
            </div>
        </div>
    )
}