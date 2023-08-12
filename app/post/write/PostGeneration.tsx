"use client";

import { FC, useState } from "react";
import { AiTwotoneCopy } from "react-icons/ai";
import TemplateLoader from "./TemplateLoader";
import { toast } from "react-hot-toast";
import Button from "@/components/Button";
import axios from "axios";
import { FaCaretDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface PostGenerationProps {
  title: string;
}

const PostGeneration: FC<PostGenerationProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const handleRateLimiting = () => {
    toast(
      "You can only generate one template every 60 seconds.\n\nPlease try again later.",
      {
        duration: 6000,
      }
    );
  };

  const handleGenerate = () => {
    if (title.replaceAll(" ", "").length < 10) {
      toast.error("Please come up with a longer title.");
      return;
    }

    setIsLoading(true);

    axios
      .post(`/api/openai/generateTemplate`, {
        title: title,
      })
      .then((response) => {
        if (!response.data) {
          handleRateLimiting();
        } else {
          setContent(response.data.content);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        handleRateLimiting();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCopy = (generatedContent: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(generatedContent)
        .then(() => {
          toast.success("Copied!");
        })
        .catch((error) => {
          console.error("Clipboard write failed:", error);
          toast.error("Copy failed. Please try again.");
        });
    } else {
      // Handle case where clipboard API is not available
      console.error("Clipboard API is not available.");
      toast.error("Copy not supported on this device.");
    }
  };

  return (
    <div className="flex flex-col rounded-md bg-white shadow-md">
      <p
        className="flex cursor-pointer items-center gap-2 rounded-t-md px-3 py-1.5 font-josefin font-semibold text-neutral-600 transition duration-300 hover:text-neutral-800 md:text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        Need a starting template for your post?
        <FaCaretDown />
      </p>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.1 } }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: { duration: 0.2 },
            }}
            className="mb-4 space-y-4 px-3"
          >
            <hr />
            <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
              <p className="text-sm tracking-tight text-neutral-900 md:text-base">
                Based on the title you&rsquo;ve given above, you can generate a
                short template for your post if you&rsquo;d like.
              </p>
              <Button
                className=""
                small
                outline
                disabled={isLoading}
                label="Generate Post"
                onClick={handleGenerate}
              />
            </div>

            {/* Loader for the content generation */}
            {isLoading && <TemplateLoader />}

            {/* Generated Content */}
            {content ? (
              <>
                <div className="h-80 w-full resize-none overflow-y-auto overflow-x-hidden whitespace-pre-line rounded-md border-2 border-zinc-800 bg-zinc-800 px-3 py-1.5 text-white shadow-[0_0_20px_2px] shadow-black/30 md:text-lg lg:h-[500px]">
                  {content}
                </div>
                <Button
                  icon={AiTwotoneCopy}
                  label="Copy Content"
                  onClick={() => handleCopy(content)}
                  small
                  special
                  className="hover:-translate-y-1"
                />
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default PostGeneration;
