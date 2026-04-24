import type { CustomCellEditorProps } from "ag-grid-react";
import { statusBadge } from "../../utils/debts.logic";

export const statusCellRenderer = (params: CustomCellEditorProps) => {
    const badgeClass = statusBadge(params.value);
    return (
        <div className="w-full">
            <span className={`${badgeClass} text-xs w-full max-w-20 font-medium`}>{params.value}</span>
        </div>
    );
};