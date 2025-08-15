import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getUserCountry } from "./lib/utils";

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/dashboard/(.*)",
  "/checkout",
  "/profile",
  "/profile/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  // Creating a basic response
  let response = NextResponse.next();

  /*---------Handle Country detection----------*/
  // Step 1: Check if country is already set in cookies
  const countryCookie = req.cookies.get("userCountry");

  if (countryCookie) {
    // If the user has already selected a country, use that for subsequent requests
    response = NextResponse.next();
  } else {
    // Step 2: Get the user country using the helper function
    const userCountry = await getUserCountry(req);

    // Step 3: Set a cookie
    response.cookies.set("userCountry", JSON.stringify(userCountry), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  return response;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
