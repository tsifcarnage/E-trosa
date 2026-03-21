import type { ICardGrad } from "../models/ui.interfaces"

const cardGrad: ICardGrad[] = [
    { title: "total à payer", label: 9000.00, unit: "€", color: "text-red-500", grad: "red-card-grad" },
    { title: "total à recevoir", label: 9000.00, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "total à payer", label: 9000.00, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "total à payer", label: 9000.00, unit: "€", color: "text-red-500", grad: "red-card-grad" },
]
export default function Card() {
    return (
        (<div className="flex flex-col gap-2 mx-5 p-6 green-card-grad w-60 rounded-[10px]">
            <h4 className="text-amber-50">Total à payer</h4>
            <h3 className="text-green-500">9000.00 €</h3>
        </div>)
    )
}
