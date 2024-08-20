import { NextResponse } from "next/server"

export const nextResponseCreator=(statusCode=200,message='',data=[])=>{
    let response =  NextResponse.json({message,data,ok:statusCode===200},{status:statusCode})
    return response
}