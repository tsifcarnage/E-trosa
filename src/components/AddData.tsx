import { IoIosAddCircleOutline } from "react-icons/io"
interface IAdding {
    title: string;
    onClick: ()=>void;
}

function AddData({ title, onClick }: IAdding) {
    return (
        <h3 onClick={onClick} className="flex justify-center self-center cursor-pointer transition-colors duration-300 text-secondary font-medium hover:text-info"><IoIosAddCircleOutline size={25} className="self-center mx-1 " />Ajouter {title}</h3>
    )
}

export default AddData
