import Creances from "./Creances";
import Dettes from "./Dettes";


export default function Paiements() {
    return (
        <>
            <Dettes filterTitle="dettes payé" filterCard={true} filterStatus={true} />
            <Creances filterTitle="créances payé" filterCard={true} filterStatus={true} />
        </>
    )
}