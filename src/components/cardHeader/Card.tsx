import type { ICardGradProps } from "../../models/ui.interfaces"

export default function Card({ cards = [] }: ICardGradProps) {
    return (
        <div className="flex gap-5 justify-center flex-wrap lg:flex-nowrap mx-6">
            {cards.map((c, index) => (<div className={`flex flex-col gap-3 p-6 w-full rounded-[10px] ${c.grad}`} key={index}>
                <h3 className="text-amber-50">{c.title}</h3>
                <h3 className={` py-3 ${c.color}`}>{c.label} <span>{c.unit}</span></h3>
            </div>))
            }
        </div>
    )
}
