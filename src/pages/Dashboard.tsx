import Card from "../components/cardHeader/Card"
import type { ICardGrad } from "../models/ui.interfaces"

const cardDash: ICardGrad[] = [
    { title: "Total à payer", label: 9000.00, unit: "€", color: "text-red-500", grad: "red-card-grad" },
    { title: "Total à recevoir", label: 9000.00, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "Solde net", label: 9000.00, unit: "€", color: "text-orange-500", grad: "orange-card-grad" },
    { title: "Dette en retard", label: 5, unit: "Dettes", color: "text-blue-300", grad: "blue-card-grad" },
]

function Dashboard() {
    return (
        <div>
            <Card cards={cardDash} />
        </div>
    )
}

export default Dashboard
