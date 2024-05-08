// route.ts files cannot exist on the same level where there is a page.tsx file
// Page	               Route	           Result
// app/page.js	       app/route.js	     Conflict
// app/page.js	       app/api/route.js	 Valid
// app/[user]/page.js	 app/api/route.js	 Valid

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET() {}
// export async function GET(request: Request) {}

