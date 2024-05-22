import React from "react";
import { Input } from "@material-tailwind/react";

const Message = ({ content, timestamp, isSender = false }) => {
  const messageClasses = isSender
    ? "justify-center self-end px-3 py-2 mt-3.5  bg-indigo-500 rounded-xl shadow-sm text-white"
    : "justify-center px-3 py-2 mt-7 leading-5 text-gray-900 bg-white rounded-xl  shadow-sm";

  return (
    <>
      <div className={messageClasses}>{content}</div>
      <div className="self-end mt-2.5 text-xs tracking-normal text-right text-slate-400">
        {timestamp}
      </div>
    </>
  );
};

const ChatScreen = ({ onclose }) => {
  return (
    <div className="flex flex-col bg-white ">
      <header className="flex gap-4 py-8 pr-20 pl-6 bg-white">
        <button onClick={onclose}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a10d6885e0480824dc75cf2a2dbaf6d5cdbd38571ca351afeda7c8ec977bfa7?apiKey=3061b615d14b47beba1c5888fe8aa383&"
            alt="Back arrow icon"
            className="shrink-0 my-auto w-5 aspect-square"
          />
        </button>

        <div className="flex gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d4450dc2ff054ea5c36ffa60ffeb8e9bcc57334321d589f7106bd24d3f1c9a9?apiKey=3061b615d14b47beba1c5888fe8aa383&"
            alt="User avatar"
            className="shrink-0 w-11 rounded-full aspect-square"
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold tracking-tight leading-5 text-gray-900">
              Angelie Crison
            </h2>
            <div className="flex gap-2 mt-1.5">
              <div className="flex flex-col justify-center px-0.5 py-1.5">
                <div className="shrink-0 w-2 h-2 bg-emerald-400 rounded-full" />
              </div>
              <div className="text-xs font-medium tracking-tight text-gray-900">
                Online
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex flex-col px-6 mt-1.5 w-full text-sm font-medium tracking-tight leading-5 text-white bg-blue-gray-50   border-t-2">
        <div className="justify-center self-center mt-2 px-3 py-1 font-semibold text-center whitespace-nowrap rounded-xl shadow-sm bg-gray-900 bg-opacity-50">
          Today
        </div>
        <Message
          content="Is there a plugin to do this task?"
          timestamp="Today 11:52"
          isSender
        />
        <Message
          content="No plugins. You just have to make it smaller according to the size of the phone."
          timestamp="Today 11:53"
        />
        <Message
          content="Is there a plugin to do this task?"
          timestamp="Today 11:52"
          isSender
        />
        <Message
          content="Thank you very much. I'm glad you asked about the assignment"
          timestamp="Today 11:53"
        />
        <Message
          content="Is there a plugin to do this task?"
          timestamp="Today 11:52"
          isSender
        />
        <Message
          content="Thank you very much. I'm glad you asked about the assignment"
          timestamp="Today 11:53"
        />
        <Message
          content="Is there a plugin to do this task?"
          timestamp="Today 11:52"
          isSender
        />
        <Message
          content="Thank you very much. I'm glad you asked about the assignment"
          timestamp="Today 11:53"
        />
      </main>
      <footer className="flex flex-col pb-3.5 mt-4 w-full bg-white">
        <div className="w-full bg-neutral-100 border-neutral-100 min-h-[1px]" />
        <form className="flex gap-10 self-center px-5 mt-3.5 w-full max-w-[367px]">
          <input
            size="lg"
            placeholder="Send your message"
            className="border-none focus:outline-none w-full"
          />
          <div className="flex gap-5">
            <button
              type="submit"
              className="flex justify-center items-center w-7 h-7 bg-indigo-500 rounded-xl"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/70e935e08fc5ab8ec70d55d0b4955f816b9e12c6a9eb58fa69267401abb9c8de?apiKey=3061b615d14b47beba1c5888fe8aa383&"
                alt="Send icon"
                className="w-6 aspect-square"
              />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatScreen;
