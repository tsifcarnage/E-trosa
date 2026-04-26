import { useEffect, useRef } from "react";

export default function ModalLayout({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (dialogRef.current) dialogRef.current.showModal();
    }, []);
    return (
        <dialog ref={dialogRef} onClose={onClose} className="modal bg-[#00000094]">
            <div className="modal-box">
                {children}
            </div>
            <form method="dialog" className="modal-backdrop"><button onClick={onClose}>Fermer</button></form>
        </dialog>
    )
}
