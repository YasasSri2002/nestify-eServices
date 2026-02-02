import { NextRequest, NextResponse } from "next/server";
export async function GET(request:NextRequest) {
  const userId = request.cookies.get('x-user-id')?.value;
  const userName = request.cookies.get('x-user-name')?.value;
  const userEmail = request.cookies.get('x-user-email')?.value;
  const roles = request.cookies.get('x-user-roles')?.value;

  const rolesArray = JSON.parse(roles!);

  console.log("form -api ->"+userId)
    return NextResponse.json( {userId,userName , userEmail , rolesArray})
}