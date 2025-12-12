

// --- 7.3. Visitas Anteriores (Tab 3) ---
const VisitasAnterioresContent = ({ visits }: { visits: typeof MOCK_PREVIOUS_VISITS }) => {
    return (
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-[#2d2d2d] shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-[#2a2a2a]">
                        <tr>
                            <th className="px-4 py-3 font-medium">Código de Visita</th>
                            <th className="px-4 py-3 font-medium">Fecha y Hora</th>
                            <th className="px-4 py-3 font-medium">Motivo</th>
                            <th className="px-4 py-3 font-medium">Médico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visits.map((visit, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-[#2d2d2d]">
                                <td className="px-4 py-3 font-medium text-primary cursor-pointer hover:underline">{visit.code}</td>
                                <td className="px-4 py-3">{visit.date}</td>
                                <td className="px-4 py-3">{visit.motive}</td>
                                <td className="px-4 py-3">{visit.doctor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};