export default interface Problem{
    id: string
    submittedTime: number
    desc: string
    status: "Unreviewed" | "Reviewed"
    photoLink?: string
}