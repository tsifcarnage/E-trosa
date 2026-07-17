import { Link } from "react-router-dom";
import ErrorAnimation from "../components/animationLottie/ErrorAnimation";

export default function Error404() {
    return (
        <div className="flex flex-col justify-start md:justify-center w-full md:m-auto text-error">
            <h1 className="self-center text-center">Erreur: Page non trouvée</h1>
            <ErrorAnimation />
            <Link className="btn btn-primary mx-5 lg:hidden" to={'/accueil'}>Accueil</Link>
        </div>
    )
}