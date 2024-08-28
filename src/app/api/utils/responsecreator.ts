import { NextResponse } from "next/server"

export const nextResponseCreator=(statusCode:number=200,message:string='',data:any=[])=>{
    let response =  NextResponse.json({message,data,ok:statusCode===200},{status:statusCode})
    return response
}