import prismaClient from "../../lib/prismadb";

export interface IPostParams {
  keyword?: string;
  tag?: string;
}

export default async function getSearchResults(params: Promise<IPostParams>) {
  try {
    const { keyword, tag } = await params;

    if (!keyword && !tag) {
      return null;
    }

    const posts = await prismaClient.post.findMany({
      where: {
        AND: [
          {
            OR: [
              keyword
                ? {
                    title: {
                      contains: keyword,
                      mode: "insensitive",
                    },
                  }
                : {},
            ],
          },
          tag
            ? {
                tags: {
                  has: tag,
                },
              }
            : {},
          {
            published: true,
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return posts;
  } catch (e: any) {
    return null;
  }
}
