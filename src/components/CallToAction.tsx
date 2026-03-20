import { Link } from "react-router-dom";
import type { CallToActionProps } from "../models/interfaces";

export default function CallToAction({ ctActions = [] }: CallToActionProps) {
    return (
        <section className="flex justify-center gap-3 flex-wrap max-w-300 m-5">
            {ctActions.map((ctAction, index) => (
                <Link to={ctAction.to} className="flex gap-5 w-125 p-8 bg-neutral rounded-lg" key={index}>
                    <div className="self-center purple ">
                        {ctAction.icon}
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2>{ctAction.title}</h2>
                        <h4>{ctAction.label}</h4>
                    </div>
                </Link>))}
        </section>
    )
}