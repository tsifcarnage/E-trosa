import type { ICardGrad } from "../models/ui.interfaces"

const cardGrad: ICardGrad[] = [
    { title: "Total à payer", label: 9000.00, unit: "€", color: "text-red-500", grad: "red-card-grad" },
    { title: "Total à recevoir", label: 9000.00, unit: "€", color: "text-green-500", grad: "green-card-grad" },
    { title: "Solde net", label: 9000.00, unit: "€", color: "text-orange-500", grad: "orange-card-grad" },
    { title: "total à payer", label: 9000.00, unit: "€", color: "text-red-500", grad: "red-card-grad" },
]
export default function Card() {
    return (
        <div className="flex gap-5 justify-center flex-wrap">
            {cardGrad.map((c, index) => (<div className={`flex flex-col gap-2 mx-5 p-6 w-60 rounded-[10px] ${c.grad}`} key={index}>
                <h4 className="text-amber-50">{c.title}</h4>
                <h3 className={c.color}>{c.label} <span>{c.unit}</span></h3>
            </div>))
            }
        </div>
    )
}
