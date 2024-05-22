import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import axiosInistance from "../GlobalContexts/Base_url";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import i18next from "i18next";

import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import avatarImage from "../assets/EAII.png";

function Signin() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [view, setView] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [amharic, setAmharic] = useState(true);
  const [english, setEnglish] = useState(false);
  const [oromoo, setOromoo] = useState(false);

  const handleAmharic = () => {
    i18next.changeLanguage("am");
    setAmharic(true);
    setOromoo(false);
    setEnglish(false);
  };
  const handleEnglish = () => {
    i18next.changeLanguage("en");
    setEnglish(true);
    setAmharic(false);
    setOromoo(false);
  };
  const handleOromic = () => {
    i18next.changeLanguage("oro");
    setOromoo(true);
    setAmharic(false);
    setEnglish(false);
  };
  // const { t } = useTranslation();

  // Regular expressions for validation
  // const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // if (!usernameRegex.test(username)) {
  //   return;
  // }
  // if (!passwordRegex.test(password)) {
  //   return;
  // }
  // const email = username;
  const HandleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInistance.post("/userApp/login", {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      navigate("/Home/Dashboard");
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="xl:flex md:flex justify-center items-center h-screen bg-blue-gray-50 sm:grid ">
      <Card className="xl:w-1/3 xl:h-96 md:w-1/3 md:h-4/5 rounded-md rounded-r-none sm:w-full sm:h-full  bg-gray-50 ">
        <CardBody className="flex flex-col gap-7 f justify-center items-center  h-screen">
          <img src={avatarImage} alt="avatar" className="w-1/4 mr-10" />
          <h1 className="text-black text-2xl font-sans font-bold text-center flex justify-center  ">
            {t("LOGINPAGE.LOGINPAGE")}
          </h1>
        </CardBody>
        <div className="flex ml-3 gap-3 relative">
          {/* <div
            onClick={toggleDropdown}
            className="flex gap-1 cursor-pointer"
          ></div> */}
          <div className="ml-32 absolute top-full text-center -left-1/3 border rounded-md w-2/4  mt-2 bg-white">
            <Select
              label={
                (amharic && "ቋንቋ") ||
                (english && "language") ||
                (oromoo && "afaan")
              }
            >
              <Option
                onClick={handleAmharic}
                className="focus:text-light-blue-700"
              >
                አማርኛ
              </Option>
              <Option
                onClick={handleEnglish}
                className="focus:text-light-blue-700"
              >
                English
              </Option>
              <Option
                onClick={handleOromic}
                className="focus:text-light-blue-700"
              >
                Oromoo
              </Option>
            </Select>
          </div>
        </div>
      </Card>
      <Card className="xl:w-1/4 xl:h-96 md:w-1/3 md:h-4/5 rounded-md rounded-l-none sm:w-full sm:h-full bg-gray-50">
        <CardBody className="flex flex-col gap-5 h-screen justify-center">
          <div>
            <h1 className="text-xl text-center text-black font-bold font-sans ">
              {t("LOGINPAGE.LOGIN")}
            </h1>
            <p className="text-center font-sans ">{t("LOGINPAGE.SIGNIN")}</p>
          </div>
          <form onSubmit={HandleLogin}>
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                label={t("LOGINPAGE.EMAIL")}
                id="Username"
                size="lg"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <div className="relative mt-2">
                <Input
                  type={view ? "text" : "password"}
                  id="Password"
                  label={t("LOGINPAGE.PASSWORD")}
                  size="lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />

                {view ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => setView(false)}
                      className="absolute right-2 top-1/4 text-center cursor-pointer"
                    />
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => setView(true)}
                      className="absolute right-2 top-1/4 text-center cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <h1 className="text-red-900 font-sans font-bold">
                {errorMessage ? "Email or password Invalid" : undefined}
              </h1>

              <Button
                type="submit"
                size="md"
                className=" w-full hover:bg-blue-700 text-white bg-blue-700 normal-case"
                onClick={HandleLogin}
              >
                {t("LOGINPAGE.LOGIN")}
              </Button>

              <Typography
                as="a"
                onClick={() => navigate("/ForgetPassword")}
                variant="small"
                color="blue-gray"
                className="ml-1 cursor-pointer text-center font-bold underline"
              >
                {t("LOGINPAGE.FORGETPASSWORD")}
              </Typography>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
export default Signin;
