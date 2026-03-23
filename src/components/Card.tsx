import type { ICardGrad } from "../models/ui.interfaces"

const cardGrad: ICardGrad[] = [
    { title: "Total à payer", label: 9000.00, unit: "€", color: "text-red-500", grad: "red-card-grad" },
    { title: "Total à recevoir", label: 9000.00, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "Solde net", label: 9000.00, unit: "€", color: "text-orange-500", grad: "orange-card-grad" },
    { title: "Dette en retard", label: 5, unit: "Dettes", color: "text-blue-300", grad: "blue-card-grad" },
]
export default function Card() {
    return (
        <div className="flex gap-5 justify-center flex-wrap lg:flex-nowrap mx-6">
            {cardGrad.map((c, index) => (<div className={`flex flex-col gap-3 mx-2 p-6 w-full rounded-[10px] ${c.grad}`} key={index}>
                <h3 className="text-amber-50">{c.title}</h3>
                <h3 className={` py-3 ${c.color}`}>{c.label} <span>{c.unit}</span></h3>
            </div>))
            }
        </div>
    )
}
