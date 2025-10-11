import { DataTableDemo } from "./datatable"

interface ScoutPanelProps {
    type: 'lobito' | 'junior' | 'senior' | 'trucker'
}

export default function ScoutPanel({ type }: Readonly<ScoutPanelProps>) {
    return (
        <DataTableDemo/>
    )
}