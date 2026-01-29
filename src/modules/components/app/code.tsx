
type props = {
    data: object;
}

export const Code = ({ data }: props) => {
    return (
        <>
            {data && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-2">Datos Enviados (Simulación)</h3>
                    <pre className="text-sm overflow-x-auto p-2 bg-white rounded">
                        <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                </div>
            )}
        </>
    )
}