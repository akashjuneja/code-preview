import { chatSession } from "@/configs/AiModel"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    const {prompt}=await req.json()
    try {
        const res=await chatSession.sendMessage(prompt)
        const resp=res.response.text()
        return NextResponse.json({result:resp})
    } catch (error) {
        return NextResponse.json({error:error})

    }
}