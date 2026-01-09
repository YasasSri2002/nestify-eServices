
import { url } from "inspector";
import { NextResponse } from "next/server";

export default async function GET(id:string){
    const SPRING_BOOT_URL = process.env.SPRING_BOOT_API_URL;

    if(!SPRING_BOOT_URL){
        return NextResponse.json(
            {error: "Back end is not up"},
            {status: 500}
        )
    }

    const url = `${SPRING_BOOT_URL}/api/v1/providers/by-id?id=${id}`

    const response = await fetch(url,{
        method: "GET",
        next: {
            revalidate:7200
        }
    });

    const data = await response.json();

    return data;

}