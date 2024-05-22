import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import ChatScreen from "./ChatScreen";

import { Card, Input } from "@material-tailwind/react";
const MessageItem = ({
  avatarSrc,
  name,
  timeAgo,
  message,
  hasUnreadIndicator = false,
}) => {
  return (
    <div className="flex gap-3">
      <img
        src={avatarSrc}
        alt={`${name}'s avatar`}
        className="shrink-0 w-12 rounded-full aspect-square"
      />
      <div className="flex flex-col grow shrink-0 self-start basis-0 w-fit ">
        <div className="flex gap-5 justify-between">
          <div className="text-sm font-semibold tracking-tight leading-5 text-gray-900">
            {name}
          </div>
          <div className="text-xs tracking-normal text-right text-slate-400">
            {timeAgo}
          </div>
        </div>
        <div className="flex gap-5 mt-2 text-xs tracking-normal text-gray-900">
          <div className="flex-auto">{message}</div>
          {hasUnreadIndicator && (
            <div className="flex flex-col justify-center p-1.5">
              <div className="shrink-0 w-2 h-2 bg-rose-500 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          <MessageItem {...message} />
          {index < messages.length - 1 && (
            <div className="shrink-0 mt-4 max-w-full h-px border-t-2  mb-3 bg-neutral-100  w-[312px]" />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const MessageScreen = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  const navigate = useNavigate();
  const messages = [
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/88c069c17cc3bab2600475fbee549d70d654b504b58e91546014b0656b2fca94?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Angelie Crison",
      timeAgo: "1 m Ago",
      message: "Thank you very much. I'm glad ...",
      hasUnreadIndicator: true,
    },
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/48efaf5c4e59e1d04bfe2b1d583e612a9913801537575e13e53ba1b9755b5948?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Jakob Saris",
      timeAgo: "2 m Ago",
      message: "You : Sure! let me tell you about w…",
    },
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e960a3f54d6e66a46998a9f84948b9cc033607f7f7215fd7ecba0f1891811dd5?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Emery Korsgard",
      timeAgo: "3 m Ago",
      message: "Thank's. You are very helpful...",
      hasUnreadIndicator: true,
    },
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e960a3f54d6e66a46998a9f84948b9cc033607f7f7215fd7ecba0f1891811dd5?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Emery Korsgard",
      timeAgo: "3 m Ago",
      message: "Thank's. You are very helpful...",
      hasUnreadIndicator: true,
    },
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/88c069c17cc3bab2600475fbee549d70d654b504b58e91546014b0656b2fca94?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Angelie Crison",
      timeAgo: "1 m Ago",
      message: "Thank you very much. I'm glad ...",
      hasUnreadIndicator: true,
    },
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/48efaf5c4e59e1d04bfe2b1d583e612a9913801537575e13e53ba1b9755b5948?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Jakob Saris",
      timeAgo: "2 m Ago",
      message: "You : Sure! let me tell you about w…",
    },
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e960a3f54d6e66a46998a9f84948b9cc033607f7f7215fd7ecba0f1891811dd5?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Emery Korsgard",
      timeAgo: "3 m Ago",
      message: "Thank's. You are very helpful...",
      hasUnreadIndicator: true,
    },
    {
      avatarSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e960a3f54d6e66a46998a9f84948b9cc033607f7f7215fd7ecba0f1891811dd5?apiKey=3061b615d14b47beba1c5888fe8aa383&",
      name: "Emery Korsgard",
      timeAgo: "3 m Ago",
      message: "Thank's. You are very helpful...",
      hasUnreadIndicator: true,
    },
  ];

  return (
    <div className="h-96">
      <div className="flex flex-col justify-center items-center bg-white w-full ">
        <header className="flex flex-col self-stretch px-6 pt-3 w-full bg-white">
          <h1 className="mt-5 text-2xl font-semibold tracking-tighter leading-9 text-gray-900 mb-5">
            Chats
          </h1>

          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </header>
        <main
          onClick={handleOpenModal}
          className=" cursor-pointer flex flex-col justify-center mt-4 w-full rounded-xl bg-neutral-50 max-w-[352px]"
        >
          <MessageList messages={messages} />
        </main>
      </div>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 backdrop-blur-sm"
        >
          <Card
            onClick={handleModalClick}
            className=" w-full h-full bg-white rounded-md"
          >
            <ChatScreen onclose={handleCloseModal} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default MessageScreen;
