import { Link } from "react-router-dom";
import type { ICallToActionProps } from "../models/ui.interfaces";

export default function CallToAction({ ctActions = [] }: ICallToActionProps) {
    return (
        <section className="flex justify-center gap-5 flex-wrap max-w-300 m-5">
            {ctActions.map((ctAction, index) => (
                <Link to={ctAction.to} className=" z-0 flex gap-5 w-full max-w-125 p-8 bg-neutral box-shad-Action rounded-lg scale-100 hover:scale-101" key={index}>
                    <span className="self-center text-secondary ">
                        {ctAction.icon}
                    </span>
                    <div className="flex flex-col gap-1 text-amber-50">
                        <h2>{ctAction.title}</h2>
                        <h4>{ctAction.label}</h4>
                    </div>
                </Link>))}
        </section>
    )
}