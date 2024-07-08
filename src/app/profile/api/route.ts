import { type NextRequest } from "next/server";
import { headers, cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders.get("Authorization"));

  const headerList = headers();
  console.log(headerList.get("Authorization"));

  request.cookies.delete("theme");
  // request.cookies.set("theme", "white");
  const theme = request.cookies.get("theme");
  console.log(theme);

  console.log(cookies().getAll());

  cookies().set("resultsPerPage", "20");

  return new Response("<h1>Profile Data</h1>", {
    headers: {
      "Content-Type": "text/html",
      // "Set-Cookie": "theme=dark",
    },
  });
}
