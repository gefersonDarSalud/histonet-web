import type { IdName, PatientContracts } from "#/core/entities"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"


type BusinessCardProps = {
    contract: PatientContracts
    business: IdName;
    insurance: IdName;
    onDelete: (contract: PatientContracts) => void;
}

export const BusinessCard = ({ business, insurance, contract, onDelete }: BusinessCardProps) => {
    return (
        <Card id={`business-card${contract.row}`} className="mb-5">
            <CardHeader>
                <CardTitle>{business.name}</CardTitle>
                <CardDescription>{insurance.name}</CardDescription>
                <CardAction className="flex justify-between gap-3">
                    <Button variant="outline" onClick={() => onDelete(contract)}>
                        <X className="text-red-500" />
                    </Button>
                </CardAction>
            </CardHeader>
        </Card>
    )
}