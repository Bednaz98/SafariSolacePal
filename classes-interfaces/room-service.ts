interface ServiceRequest{
    id: string
    room: string
    created: number
    status: "Ordered" | "Processing" | "Completed" | "Cancelled"
    requestedOffering: Offering[]
}

interface Offering{
    desc: string
    cost: number
}