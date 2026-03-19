import CoinAnimation from "../components/CoinAnimation"

function Home() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="purple text-center">Bienvenue</h1>
            <h3 className="text-center w-full px-2 max-w-2xl self-center">Cette plateforme vous permet d'enregistrer et de gérer vos dettes et vos créances, aussi suivre vos paiements et visualiser votre progression.</h3>
            <CoinAnimation />
        </div>
    )
}

export default Home
