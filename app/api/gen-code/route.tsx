import { codeGeneration } from "@/configs/AiModel"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    const {prompt}=await req.json()
    try {
        const res=await codeGeneration.sendMessage(prompt)
        const resp=res.response.text()
        return NextResponse.json(JSON.parse(resp))
    } catch (error) {
        return NextResponse.json({error:error})

    }
}