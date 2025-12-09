import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    useState,
    //useMemo,
    useCallback,
    useEffect
} from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewCall } from '../components/newCall';
import { PatientVisitTable } from '../components/PatientVisitTable';
import type { SearchResponse } from '#/data/mappers/visitMappers';
import { useServices } from '@/components/hooks/useServices';
import type { VisitRepositorySearchParams } from '#/core/repositories/visitRepository';
import { formatDate } from '#/utils/functions';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const RemoteClinic = () => {
    const { searchVisit } = useServices();
    const [visitList, setVisitList] = useState<SearchResponse[]>([]);
    const [isLoadingVisitList, setIsLoadingVisitList] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlerCurrentPage = (number: number) => {
        return () => setCurrentPage(prev => {
            if (prev == 1 && number <= 0) return prev;
            return prev + number;
        })
    }

    const tabs = ["Todos", "Pendientes", "Registrados"];
    const [activeTab, setActiveTab] = useState("Todos");
    const [textSearch, setTextSearch] = useState("");

    const fechDataVistList = useCallback(async (text: string) => {
        setIsLoadingVisitList(true)
        try {
            const currentDate = formatDate(new Date());
            const params: VisitRepositorySearchParams = {
                inicio: '1/1/2025',
                fin: currentDate,
                texto: text,
                compania: (1).toString(),
                sucursal: (2).toString(),
                cantidad: (10).toString(),
                pagina: (currentPage).toString(),
            }
            const result = await searchVisit.execute(params)

            setVisitList(result);
        }

        catch (e) {
            console.error(e);
            setIsLoadingVisitList(false);
        }

        finally {
            setIsLoadingVisitList(false);
        }
    }, [searchVisit, currentPage]);

    // const filteredVisitList = useMemo(() => {
    //     let list = visitList.filter(visit =>
    //         visit.patient.toLowerCase().includes(textSearch.toLowerCase())
    //         || visit.business.toLowerCase().includes(textSearch.toLowerCase())
    //         || visit.information.toLowerCase().includes(textSearch.toLowerCase())
    //         || visit.password.toLowerCase().includes(textSearch.toLowerCase())
    //         || visit.topic.toLowerCase().includes(textSearch.toLowerCase())
    //         || visit.observation.toLowerCase().includes(textSearch.toLowerCase())
    //         || visit.insurance.toLowerCase().includes(textSearch.toLowerCase())
    //         || visit.patient_ci.toLowerCase().includes(textSearch.toLowerCase())
    //     );

    //     switch (activeTab) {
    //         case "Pendientes":
    //             list = list.filter(p => p.status === "Pendiente" || p.status === "En Espera");
    //             break;
    //         case "Registrados":
    //             list = list.filter(p => ["Ingresado", "En Consulta", "Atendido"].includes(p.status));
    //             break;
    //     }

    //     return list;
    // }, [visitList, activeTab, textSearch]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fechDataVistList(textSearch);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [fechDataVistList, textSearch]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Panel de Recepción Header */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Telemedicina</h1>
                    {/* <p className="mt-1 text-base text-gray-500">
                        Bienvenido. Gestione la llegada de pacientes y las citas del día.
                    </p> */}
                </section>

                {/* Cola de Pacientes Card (Usando los componentes simulados de shadcn) */}
                <Card>

                    {/* Card Header (Cola de Pacientes + Botón) */}
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle>Cola de Pacientes</CardTitle>
                        <NewCall />
                    </CardHeader>

                    {/* Herramientas de Filtro y Búsqueda */}
                    <CardContent className="bg-gray-50/50 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">

                        {/* Campo de Búsqueda (shadcn Input) */}
                        <div className="w-full md:max-w-md">
                            <Input
                                // icon={SearchIcon}
                                type="text"
                                placeholder="Buscar pacientes por nombre o DNI"
                                value={textSearch}
                                onChange={(e) => setTextSearch(e.target.value)}
                            />
                        </div>

                        {/* Pestañas de Estado (shadcn Tabs) */}
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="bg-gray-200 border rounded-md">
                                {tabs.map(tab => (
                                    <TabsTrigger
                                        className="data-[state=active]:text-white data-[state=active]:bg-black"
                                        key={tab}
                                        value={tab}
                                    >
                                        {tab}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        {/* <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}

                    </CardContent>

                    <PatientVisitTable visits={visitList} isLoading={isLoadingVisitList} />

                    <CardFooter className='flex justify-between'>
                        <span className='bold'>{`Pagina: ${currentPage}`}</span>
                        <ButtonGroup className=''>
                            <Button variant='outline' onClick={handlerCurrentPage(-1)}>
                                <ChevronLeft /> Anterior
                            </Button>
                            <Button variant='outline' onClick={handlerCurrentPage(1)}>
                                Siguiente <ChevronRight />
                            </Button>
                        </ButtonGroup>

                    </CardFooter>

                </Card>

            </main>

        </div>
    );
};