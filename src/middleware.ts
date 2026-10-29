import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // هنا انا جبت التوكن اللي متشفر في الكوكيز
    const token = await getToken({req:request})
    //هنا بجيب الباث اللي كتبه اليوزر  
    const {pathname} = request.nextUrl;

    // هنا بجيب صفحات الاوث
     const authPages = ["/login","/register"]
    // هنا بجيب كل الصغحات ما عدا الاوث
   const routes = ["/", "/productDetails","/cart","/categories","/brands","/checkout","/allorders","/wishlist","/profile","/change-password"]
    // هنا بقوله لو مفيش توكن واللي كتبه اليوز من ضمن الصفحات العاديه رجعه لصفحه اللوجن
   if (!token && routes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
   }
    //نا بقوله لو فيه توكن واللي كتبه اليوز من ضمن الصفحات اللوجن رجعه لصفحه الهوم
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
  matcher: ["/", "/productDetails","/cart","/categories","/brands","/login","/register","/checkout","/allorders","/wishlist","/profile","/change-password"],
}