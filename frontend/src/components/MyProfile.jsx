import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@material-tailwind/react";
import { useAuth } from "../GlobalContexts/Auth-Context";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchUserData } from "../reduxToolKit/slices/userSlice";
import { fetchRoleData } from "../reduxToolKit/slices/roleSlice";
import { fetchMonitoringData } from "../reduxToolKit/slices/monitoringSlice";
import { fetchSectorgData } from "../reduxToolKit/slices/sectorSlice";
import { deleteSelectedUser } from "../reduxToolKit/slices/userSlice";
import { changeStatusOfSelectedUser } from "../reduxToolKit/slices/userSlice";
// import { addNewUser } from "../reduxToolKit/slices/userSlice";
import { useCountries } from "use-react-countries";
import avatarImage from "../assets/EAII.png";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  IconButton,
  CardBody,
  CardFooter,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { useTranslation } from "react-i18next";

function MyProfile() {
  const { t } = useTranslation();
  const authInfo = useAuth();

  console.log(authInfo);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  if (authInfo) {
    useEffect(() => {
      setFirstName(authInfo.user.first_name);
      setEmail(authInfo.user.email);
      setLastName(authInfo.user.last_name);
      setPhone(authInfo.user.phone);
      setGender(authInfo.user.gender);
      setRole(authInfo.user.userRole);
    }, []);
  }
  return (
    <div>
      {authInfo ? (
        <>
          <p className="text-base font-bold font-sans">Account Setting </p>
          <Card className="w-full h-screen mt-5 rounded-md">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none"
            ></CardHeader>
            <CardBody className="xl:flex md:grid gap-5">
              <Card className="flex justify-center xl:w-1/2 md:full h-4/6 gap-5 rounded-md">
                <div className="m-10 ">
                  <h1 className="text-black font-bold text-xl">
                    Change Pofile
                  </h1>
                  <h1>Change your profile from here</h1>
                </div>
                <div className="grid justify-center items-center">
                  <div className="flex justify-center">
                    <img
                      src={avatarImage}
                      alt="avatar"
                      className="w-1/3 mr-10"
                    />
                  </div>

                  <div className="flex gap-5 justify-center items-center m-5">
                    <Button
                      variant="text"
                      size="xl"
                      className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                      onClick={handleClick}
                    >
                      Upload
                    </Button>
                    <Button
                      variant="text"
                      color="red"
                      className="normal-case border border-red-700"
                      size="xl"
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="mb-10">
                    <h1>Allowed JPG, GIF OR PNG. Max size of 800K</h1>
                  </div>
                </div>
              </Card>
              <Card className="flex justify-center xl:w-1/2 md:full h-full gap-5 rounded-md">
                <div className="m-5">
                  <h1 className="text-black font-bold text-xl">
                    Personal Deatils
                  </h1>
                  <h1>
                    To change your personal Deatils, edit and save from here
                  </h1>
                </div>
                <form className="grid gap-5 items-center w-11/12 mb-10  mx-auto">
                  <div className="w-full justify-self-center">
                    <input type="file" ref={fileInputRef} className="hidden" />
                    <Input
                      type="text"
                      id="firstName"
                      label="First Name"
                      size="lg"
                      value={firstName}
                    />
                  </div>
                  <div className="w-full justify-self-center">
                    <Input
                      type="text"
                      id="lastName"
                      label="Last Name"
                      size="lg"
                      value={lastName}
                    />
                  </div>
                  <div className="w-full justify-self-center">
                    <Input
                      type="email"
                      id="email"
                      label="Email"
                      size="lg"
                      value={email}
                    />
                  </div>
                  <div className="w-full justify-self-center">
                    <label size="lg" className="ml-2">
                      Role
                    </label>
                    <Input
                      type="text"
                      id="role"
                      label="Role"
                      size="lg"
                      value={role}
                      disabled
                    />
                  </div>

                  <div className="w-full justify-self-center">
                    <Input
                      type="text"
                      id="phone"
                      label="Phone"
                      size="lg"
                      value={phone}
                    />
                  </div>

                  <div className="w-full justify-self-center">
                    <Select label="Gender" value={gender}>
                      <Option
                        value="Male"
                        className="focus:text-light-blue-700"
                      >
                        Male
                      </Option>
                      <Option
                        value="Female"
                        className="focus:text-light-blue-700"
                      >
                        Female
                      </Option>
                    </Select>
                  </div>

                  <div className="space-x-2 flex justify-self-end">
                    <Button
                      variant="text"
                      size="xl"
                      className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                    >
                      Save
                    </Button>
                    <Button
                      variant="text"
                      color="red"
                      className="normal-case"
                      size="xl"
                    >
                      <span>Cancel</span>
                    </Button>
                  </div>
                </form>
              </Card>
            </CardBody>
            <CardFooter className="flex items-center justify-between p-4"></CardFooter>
          </Card>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default MyProfile;
