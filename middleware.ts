export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile/:path*", "/post/update/:path*"],
};
