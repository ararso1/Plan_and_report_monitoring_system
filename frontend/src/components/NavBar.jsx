import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MessageScreen from "../Chats/Chat";
import avatarImage from "../assets/EAII.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import axiosInstance from "../GlobalContexts/Base_url";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Select,
  Option,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { fetchLogo } from "../reduxToolKit/slices/settingSlice";
// import { changeLanguage } from "i18next";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Setting",
    icon: SunIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function MessageMenu() {
  const [isMenuOpenMessage, setIsMenuOpenMessage] = useState(false);
  const closeMessage = () => setIsMenuOpenMessage(true);

  return (
    <Menu
      open={isMenuOpenMessage}
      handler={setIsMenuOpenMessage}
      placement="bottom-end"
    >
      <div className="flex items-center gap-7">
        <MenuHandler>
          <button
            className="flex items-center gap-1
          rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </button>
        </MenuHandler>
      </div>
      <MenuList>
        <MessageScreen />
      </MenuList>
    </Menu>
  );
}

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    // window.location.reload();
    navigate("/");

    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
  };
  const handleMyprofile = () => {
    navigate("/Home/MyProfile");
  };
  const handleSetting = () => {
    navigate("/Home/Setting");
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <div className="flex items-center gap-7 ">
        <a className=" cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>
        </a>

        <MenuHandler>
          <button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1
          rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </MenuHandler>
      </div>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          const myProfile = key === profileMenuItems.length - 3;
          const setting = key === profileMenuItems.length - 2;

          return (
            <MenuItem
              key={label}
              // onClick={closeMenu}
              onClick={
                (isLastItem && handleLogout) ||
                (myProfile && handleMyprofile) ||
                (setting && handleSetting)
              }
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
                // onClick={isLastItem?{hand }}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

function NavBar({ onSidebarToggle }) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  // const [open, setOpen] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("en"); // Default selected option

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleDropdown(); // Close the dropdown after selecting an option
  };

  const handleAmharic = () => {
    i18next.changeLanguage("am");
    setIsOpen(false);
  };
  const handleEnglish = () => {
    i18next.changeLanguage("en");
    setIsOpen(false);
  };
  const handleOromic = () => {
    i18next.changeLanguage("oro");
    setIsOpen(false);
  };
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { logo } = useSelector((state) => state.setting);

  useEffect(() => {
    dispatch(fetchLogo());
  }, []);

  console.log(logo);

  return (
    <div className="w-full h-16 rounded-none bg-gray-50 fixed z-10 border-l-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* <div className="flex justify-between items-center gap-7 "> */}
        <div className="flex gap-3 mt-2 items-center justify-center">
          <a onClick={onSidebarToggle}>
            <FontAwesomeIcon icon={faBars} className="cursor-pointer ml-10" />
          </a>
          <img
            src={logo ? logo.logo_image : avatarImage}
            alt={`avatar`}
            className="w-12 ml-3"
          />
          <h1 className=" mr-10 font-bold text-black text-xl">
            {t("MAIN.TITLE")}
          </h1>
        </div>

        <div className="flex gap-3 mt-3 mr-7 justify-center items-center relative">
          <div onClick={toggleDropdown} className="flex gap-1 cursor-pointer">
            <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
            <FontAwesomeIcon
              icon={faCaretDown}
              className={isOpen ? "rotate-180 " : ""}
            />
          </div>

          {isOpen && (
            <div className="absolute top-full text-center -left-1/3 border rounded-md w-2/4  mt-2 bg-white">
              <div
                onClick={handleAmharic}
                className="px-2 py-1 cursor-pointer hover:bg-gray-200 font-sans"
              >
                አማርኛ
              </div>
              <div
                onClick={handleEnglish}
                className="px-2 py-1 cursor-pointer hover:bg-gray-200 font-sans"
              >
                English
              </div>
              <div
                onClick={handleOromic}
                className="px-2 py-1 cursor-pointer hover:bg-gray-200 font-sans"
              >
                Oromoo
              </div>
            </div>
          )}
          <MessageMenu />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
export default NavBar;
