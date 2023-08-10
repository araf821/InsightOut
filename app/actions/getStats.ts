import prismaClient from "../../lib/prismadb";

export default async function getStats() {
  const userCount = await prismaClient.user.count();
  const postCount = await prismaClient.post.count();

  const posts = await prismaClient.post.findMany();
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);

  return {
    userCount,
    postCount,
    totalViews,
  };
}
