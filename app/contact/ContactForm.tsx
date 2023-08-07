"use client";

import { FC, FormEvent, useEffect, useRef, useState } from "react";

import emailjs from "@emailjs/browser";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Disclaimer from "./Disclaimer";

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = ({}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);
  var now = new Date().getTime();

  useEffect(() => {
    const sentMessageTime = localStorage.getItem("sentMessageTime");
    if (sentMessageTime) {
      if (now - parseInt(sentMessageTime) > 3 * 60 * 60 * 1000) {
        // Delete the local storage after 3 hours
        localStorage.removeItem("sentMessageTime");
      } else {
        setIsMessageSent(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMessageSent) {
    return (
      <EmptyState
        title="Thanks for your submission!"
        subtitle="You'll be able to submit another message again after 3 hours."
      />
    );
  }

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (!formRef) {
      return;
    }

    //@ts-ignore
    if (formRef.current[2].value.length < 50) {
      toast.error("Message is too short!");
      return;
    }

    emailjs
      .sendForm(
        "service_rafjm4f",
        "template_je7ya2a",
        formRef.current!,
        "FojtL_6mOjiB2gO7H"
      )
      .then(
        () => {
          localStorage.setItem("sentMessageTime", "" + now);
          setIsMessageSent(true);
        },
        (error) => {
          return;
        }
      );
  };

  return (
    <Container>
      <motion.main
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        className="mx-auto my-12 max-w-[800px] space-y-4 rounded-lg border-2 p-4 shadow-lg"
      >
        <Heading title="Contact" />

        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="flex flex-col justify-center gap-4"
        >
          <div className="relative">
            <input
              id="name"
              type="text"
              name="user_name"
              placeholder=" "
              required
              className={`peer w-full rounded-md border-2 px-4 py-3 outline-none focus:border-zinc-800`}
            />
            <label
              className={`absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
            >
              Name
            </label>
          </div>

          <div className="relative">
            <input
              id="email"
              type="email"
              name="user_email"
              placeholder=" "
              required
              className={`peer w-full rounded-md border-2 px-4 py-3 outline-none focus:border-zinc-800`}
            />
            <label
              className={`absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
            >
              Email
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              rows={5}
              placeholder=" "
              required
              className="peer w-full resize-none rounded-md border-2 px-2.5 py-1.5 outline-none focus:border-zinc-800"
            />
            <label
              className={`absolute left-3 top-3 origin-left -translate-y-6 scale-75  select-none rounded-md bg-bg px-2 text-neutral-500 transition peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:text-neutral-800`}
            >
              Message
            </label>
          </div>

          <button
            aria-label="submit button"
            type="submit"
            className="border-2 border-zinc-800 p-2 transition duration-300 hover:bg-zinc-800 hover:text-white md:text-lg"
          >
            Send Message
          </button>
        </form>
        <Disclaimer
          title="For Your Information"
          content={`> You'll only be able to send a message every few hours.\n> Feel free to report a bug or leave any feedback through this form!`}
        />
      </motion.main>
    </Container>
  );
};

export default ContactForm;
