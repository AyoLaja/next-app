// Route protection middleware
export { default as middleware } from 'next-auth/middleware';

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith('/api/auth')) {
//     return NextResponse.next();
//   }

//   return NextResponse.redirect(new URL('/rrr', request.url));
// }

export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero or one
  matcher: ['/dashboard/:path*'],
};
