import { ScoutDataTable } from "./datatable/socout-datatable"

interface ScoutPanelProps {
    type: 'LOBITO' | 'JUNIOR' | 'SENIOR' | 'TRUCKER'
}

export default function ScoutPanel({ type }: Readonly<ScoutPanelProps>) {
    return (
        <ScoutDataTable type={type}/>
    )
}