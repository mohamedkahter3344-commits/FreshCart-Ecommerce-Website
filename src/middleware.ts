import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req:request})

    const {pathname} = request.nextUrl;


     const authPages = ["/login","/register"]

   const routes = ["/", "/productDetails","/cart","/categories","/brands"]

   if (!token && routes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
   }

   if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
   }

    // if (!token) {

    //     return NextResponse.redirect(new URL('/login', request.url))
    // } else {

    //     if (pathname === "/login" || pathname === "/register") {
    //     return NextResponse.redirect(new URL('/', request.url))

    //     }
    // }

        
    
    return NextResponse.next()

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/productDetails","/cart","/categories","/brands","/login","/register"],
}