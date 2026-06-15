import { Link } from "react-router-dom";

export default function Parametre() {
    return (
        <div className="p-6">
            <h2 className="mb-5">Profil</h2>
            <div className="flex flex-wrap gap-5 justify-between">
                <section className="flex flex-wrap flex-1 gap-5 bg-neutral p-5 rounded-[10px]">
                    <img src="" alt="" className="rounded-full bg-white h-30 w-30" />
                    <div>
                        <h3>User name</h3>
                        <h3>Adresse@email.com</h3>
                        <p className="badge badge-outline badge-success my-3"> ✓ Compte vérifié</p>
                    </div>
                </section>
                <section className="flex-2 flex justify-between items-center bg-neutral p-5 rounded-[10px]">
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
        </div>
    )
}