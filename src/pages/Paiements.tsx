import Creances from "./Creances";
import Dettes from "./Dettes";


export default function Paiements() {
    return (
        <>
            <Dettes filterTitle="dettes payée" filterCard={true} filterStatus={true} />
            <Creances sortDescDate={true} filterTitle="créances payée" filterCard={true} filterStatus={true} />
        </>
    )
}