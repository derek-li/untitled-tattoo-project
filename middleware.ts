import { auth } from '@auth'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/account')) {
    const newUrl = new URL('/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})