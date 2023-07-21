"use client";

import { FC } from "react";

import { useChat } from "ai/react";
import { BsSend } from "react-icons/bs";

interface ChatMessagesProps {}

const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  const { messages, handleInputChange, input, handleSubmit, isLoading } =
    useChat();
  const inverseMessages = [...messages].reverse();

  return (
    <div className="h-[450px] w-full">
      <div className="flex h-[325px] flex-col-reverse gap-2 overflow-y-auto">
        {inverseMessages.map((m) => (
          <div
            key={m.id}
            className={`flex p-2 ${m.role === "user" ? "justify-end" : ""}`}
          >
            <p
              className={`max-w-[300px] break-words rounded-md px-2.5 py-1.5 ${
                m.role === "user" ? "bg-accent text-black" : "bg-neutral-200"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}
      </div>
      {messages.length &&
      messages[messages.length - 1].role.toString() !== "user" &&
      isLoading ? (
        <p className="fixed bottom-0 mb-4 w-full text-center font-josefin text-xl font-semibold">
          Bebibot is typing...
        </p>
      ) : (
        <form
          className="fixed bottom-0 mx-auto w-full px-2"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 rounded-xl bg-white px-3 py-2">
            <input
              className="w-full border-none outline-none"
              placeholder="Need ideas?"
              value={input}
              onChange={handleInputChange}
            />
            <button type="submit">
              <BsSend className="text-xl text-primary transition duration-200 hover:scale-110 hover:text-blue-600" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatMessages;

// <div className="relative overflow-y-auto flex flex-col justify-between px-4 py-2">
//   {/* Chat Box */}
//   <div className="flex-1 flex-grow">
//     {messages.map((message) => (
//       <div key={message.id}>
//         <div
//           className={`flex items-end ${
//             message.role === "user" ? "justify-end" : ""
//           }`}
//         >
//           <div
//             className={`mx-2 flex max-w-xs flex-col space-y-2 overflow-x-hidden
//           ${
//             message.role === "user"
//               ? "order-1 items-end"
//               : "order-2 items-start"
//           }`}
//           >
//             <p
//               className={`rounded-lg px-4 py-2
//               ${
//                 message.role === "user"
//                   ? "bg-primary text-black"
//                   : "bg-gray-200 text-gray-900"
//               }`}
//             >
//               {message.content}
//             </p>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
//   <ChatInput />
// </div>
