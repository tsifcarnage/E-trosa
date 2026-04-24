import type { CustomCellEditorProps } from "ag-grid-react";
import { MdDelete } from "react-icons/md";
import { TbMoneybagMoveBack } from "react-icons/tb";

export const actionsCellRenderer = (params: CustomCellEditorProps) => {
    const handleDelete = () => {
        params.context.onDelete(params.data);
    };
    return (
        <div className="flex justify-center gap-2">
            <div className="cursor-pointer text-success self-center"><TbMoneybagMoveBack size={20} /></div>{params.value}
            <p>|</p>
            <div onClick={handleDelete} className="cursor-pointer text-error self-center"><MdDelete size={20} /></div>
        </div>
    )
}
