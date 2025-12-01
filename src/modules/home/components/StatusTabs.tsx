type props = {
    statusVisit: string,
    className?: string
};

export const StatusBadge = ({ statusVisit }: props) => {
    let classes = "";
    const text = statusVisit;

    switch (statusVisit) {
        case "Ingresado": classes = "bg-blue-100 text-blue-700 border-blue-200"; break;
        case "En Espera": classes = "bg-yellow-100 text-yellow-700 border-yellow-200"; break;
        case "En Consulta":
        case "Atendido": classes = "bg-green-100 text-green-700 border-green-200"; break;
        case "Pendiente":
        default: classes = "bg-gray-100 text-gray-500 border-gray-200"; break;
    }

    return (
        <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-medium ${classes}`}>
            {text}
        </span>
    );
};