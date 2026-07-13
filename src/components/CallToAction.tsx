import { Link } from "react-router-dom";
import type { ICallToActionProps } from "../models/ui.interfaces";

export default function CallToAction({ ctActions = [] }: ICallToActionProps) {
    return (
        <section className="flex justify-center gap-5 flex-wrap max-w-300 mx-5 md:my-5 mb-24">
            {ctActions.map((ctAction, index) => (
                <Link to={ctAction.to} className=" z-0 flex gap-5 w-full max-w-125 p-8 bg-neutral sm:flex-row flex-col shadow-md shadow-secondary rounded-lg scale-100 hover:scale-101" key={index}>
                    <span className="self-center text-secondary">
                        {ctAction.icon}
                    </span>
                    <div className="flex flex-col justify-center items-center sm:items-start gap-1 text-amber-50 text-sm md:text-md">
                        <h2>{ctAction.title}</h2>
                        <h4>{ctAction.label}</h4>
                    </div>
                </Link>))}
        </section>
    )
}