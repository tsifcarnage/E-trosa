import Card from "../components/Card"
import type { ICardGrad } from "../models/ui.interfaces"

const cardDette: ICardGrad[] = [
    { title: "Total dettes", label: 12450, unit: "€", color: "text-red-500", grad: "red-card-grad" },
    { title: "Montant à payer", label: 5300, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "Montant restant", label: 7150, unit: "€", color: "text-orange-500", grad: "orange-card-grad" },
    { title: "Créanciers", label: 8, unit: "Créanciers", color: "text-blue-300", grad: "blue-card-grad" },
]
function Dettes() {
    return (
        <div>
            <Card cards={cardDette} />
        </div>
    )
}

export default Dettes
