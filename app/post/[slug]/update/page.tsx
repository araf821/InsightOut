import { SafePost } from "@/app/types";
import { FC } from "react";

interface pageProps {
  post: SafePost;
}

const page: FC<pageProps> = ({}) => {
  return <div>Post update page</div>;
};

export default page;
