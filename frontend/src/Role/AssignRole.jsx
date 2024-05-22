import React, { useState, useEffect } from "react";
import CardBox from "./Card";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../GlobalContexts/Base_url";
import { useTranslation } from "react-i18next";
import Switch from "../components/Switch";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Select,
  Option,
} from "@material-tailwind/react";

function Roletable() {
  const { t } = useTranslation();
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
  const [showModalt, setShowModalt] = useState(false);

  const handleCloseModalt = () => {
    setShowModalt(false);
  };

  const [selectedId, setSelectedId] = useState();
  const handleOpenModalt = (deleteId) => {
    setShowModalt(true);
    setSelectedId(deleteId);
  };
  const handleModalClickt = (e) => {
    e.stopPropagation();
  };

  // Edit
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };
  const handleOpenModalEdit = () => {
    setShowModalEdit(true);
  };
  const handleModalClickEdit = (e) => {
    e.stopPropagation();
  };

  // view
  const [showModalView, setShowModalView] = useState(false);

  const handleCloseModalView = () => {
    setShowModalView(false);
  };
  const handleOpenModalView = () => {
    setShowModalView(true);
  };
  const handleModalClickView = (e) => {
    e.stopPropagation();
  };

  //add Role
  const token = localStorage.getItem("access");
  const [role, setRole] = useState();
  const handleAddRole = (e) => {
    e.preventDefault();

    const name = role;
    try {
      const res = axiosInstance.post(
        "/roleApp/roles/",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {}
  };

  //fetch role data from back end
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/roleApp/roles/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // No need to use response.json() since axios already parses JSON responses
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(data);

  //delete data
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/roleApp/roles/${selectedId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) =>
        prevData.filter((items) => items.id !== selectedId)
      );
      setShowModalt(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <p className="text-base font-bold font-sans">List of Roles</p>
      <Card className="w-full h-FULL mt-5 rounded-md">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between mt-5">
            <div>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                variant="text"
                size="sm"
                onClick={() => handleOpenModal()}
                className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
              >
                <FontAwesomeIcon icon={faPlus} />
                Create New Role
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <table className="w-full min-w-max table-auto text-left border-b-2">
            <thead>
              <tr>
                <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                  {t("MAIN.TABLE.NO")}
                </th>
                <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                  {t("MAIN.TABLE.NAME")}
                </th>
                <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                  {t("MAIN.TABLE.STATUS")}
                </th>

                <th className="text-start font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4 px-16">
                  {t("MAIN.TABLE.ACTION")}
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) &&
                data.map((items) => (
                  <tr key={items.id}>
                    <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {items.id}
                      </Typography>
                    </td>
                    <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {items.name}
                      </Typography>
                    </td>
                    <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                      <Switch />
                    </td>

                    <td className="py-2  border-b-2 border-blue-gray-50">
                      <div className="flex items-center  gap-2">
                        <Button
                          variant="text"
                          size="sm"
                          className="hover:bg-blue-200 text-white bg-blue-200"
                          onClick={handleOpenModalView}
                        >
                          <svg
                            width="24"
                            height="18"
                            viewBox="0 0 24 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.9613 0.199219C4.6875 0.199219 0.375 8.69922 0.375 8.69922C0.375 8.69922 4.6875 17.1992 11.9613 17.1992C19.0625 17.1992 23.375 8.69922 23.375 8.69922C23.375 8.69922 19.0625 0.199219 11.9613 0.199219ZM11.875 3.03255C15.0662 3.03255 17.625 5.58255 17.625 8.69922C17.625 11.8442 15.0662 14.3659 11.875 14.3659C8.7125 14.3659 6.125 11.8442 6.125 8.69922C6.125 5.58255 8.7125 3.03255 11.875 3.03255ZM11.875 5.86589C10.2937 5.86589 9 7.14089 9 8.69922C9 10.2576 10.2937 11.5326 11.875 11.5326C13.4563 11.5326 14.75 10.2576 14.75 8.69922C14.75 8.41588 14.635 8.16089 14.5775 7.90589C14.3475 8.35922 13.8875 8.69922 13.3125 8.69922C12.5075 8.69922 11.875 8.07589 11.875 7.28255C11.875 6.71589 12.22 6.26255 12.68 6.03588C12.4213 5.95089 12.1625 5.86589 11.875 5.86589Z"
                              fill="white"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="text"
                          size="sm"
                          className="hover:bg-blue-700 text-white bg-blue-700"
                          onClick={() => handleOpenModal(items.id)}
                        >
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.375 0L10.375 2L14.375 6L16.375 4L12.375 0ZM8.375 4L0.375 12V16H4.375L12.375 8L8.375 4Z"
                              fill="white"
                            />
                          </svg>
                        </Button>
                        <Button
                          variant="text"
                          size="sm"
                          className="hover:bg-red-900 text-white bg-red-900"
                          onClick={() => handleOpenModalt(items.id)}
                        >
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.85891 0.910156C5.72928 0.910156 4.80503 1.85639 4.80503 3.0129H2.75115C1.62151 3.0129 0.697266 3.95913 0.697266 5.11564H15.0744C15.0744 3.95913 14.1502 3.0129 13.0206 3.0129H10.9667C10.9667 1.85639 10.0424 0.910156 8.91279 0.910156H6.85891ZM2.75115 7.21839V17.3326C2.75115 17.5639 2.91546 17.7321 3.14138 17.7321H12.6509C12.8768 17.7321 13.0411 17.5639 13.0411 17.3326V7.21839H10.9872V14.578C10.9872 15.1668 10.5354 15.6294 9.96027 15.6294C9.38518 15.6294 8.93333 15.1668 8.93333 14.578V7.21839H6.87945V14.578C6.87945 15.1668 6.42759 15.6294 5.85251 15.6294C5.27742 15.6294 4.82557 15.1668 4.82557 14.578V7.21839H2.77169H2.75115Z"
                              fill="white"
                            />
                          </svg>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between  p-4">
          <div></div>
        </CardFooter>
      </Card>
      {/* {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed  z-30 inset-0 flex justify-center items-center bg-black bg-opacity-25  "
        >
          <Card
            onClick={handleModalClick}
            className=" w-4/5 bg-white rounded-md"
          >
            <a
              onClick={handleCloseModal}
              className="text-black text-xl border-0 bg-white place-self-end mr-5 mt-5 cursor-pointer"
            >
              X
            </a>
            <CardBox />
          </Card>
        </div>
      )} */}
      {/* add */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed z-20 inset-0 flex justify-center items-center bg-black bg-opacity-25 "
        >
          <Card
            onClick={handleModalClick}
            className=" w-1/2 h-2/3 bg-white rounded-md "
          >
            <CardHeader className="border-none shadow-none mt-3 flex justify-between">
              <div></div>
              <a
                onClick={handleCloseModal}
                className="text-black text-xl  border-0 bg-white place-self-end mr-5 mt-5 cursor-pointer"
              >
                X
              </a>
            </CardHeader>

            <CardBody className="flex justify-center items-center">
              <h1 className="text-black">Create New Role</h1>
            </CardBody>
            <CardFooter>
              <form
                onSubmit={handleAddRole}
                className="grid gap-5 items-center w-1/2 mx-auto"
              >
                <div className="w-full justify-self-center">
                  <Input
                    type="text"
                    id="role"
                    label="Role"
                    size="lg"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full justify-self-center">
                  <div className="flex justify-end gap-5">
                    <Button
                      type="submit"
                      size="md"
                      className="hover:shadow-none text-white bg-red-900 normal-case"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="md"
                      className=" hover:bg-blue-700 text-white bg-blue-700 normal-case"
                      onClick={handleAddRole}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
      {showModalt && (
        <div
          onClick={() => setShowModalt(false)}
          className="fixed z-30 inset-0 flex justify-center items-center bg-black bg-opacity-25  "
        >
          <Card
            onClick={handleModalClickt}
            className=" w-2/6 h-2/6 bg-white rounded-md flex justify-center items-center"
          >
            <div className="grid justify-center items-center">
              <div>
                <h1>Are you sure You want to delete?</h1>
              </div>
              <div className="flex gap-10 py-8 justify-center items-center">
                <Button
                  variant="text"
                  size="md"
                  className="hover:bg-light-blue-700  text-white bg-light-blue-700"
                  onClick={() => handleCloseModalt()}
                >
                  No
                </Button>
                <Button
                  variant="text"
                  size="md"
                  className="hover:bg-red-900 text-white bg-red-900"
                  onClick={handleDelete}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit */}

      {showModalEdit && (
        <div
          onClick={() => setShowModalEdit(false)}
          className="fixed z-20 inset-0 flex justify-center items-center bg-black bg-opacity-25 "
        >
          <Card
            onClick={handleModalClickEdit}
            className=" w-2/3 h-2/3 bg-white rounded-md"
          >
            <a
              onClick={handleCloseModalEdit}
              className="text-black text-xl border-0 bg-white place-self-end mr-5 mt-5 cursor-pointer"
            >
              X
            </a>
            <div className="flex justify-center items-center">
              <h1>Edit</h1>
            </div>
          </Card>
        </div>
      )}

      {/* view */}

      {showModalView && (
        <div
          onClick={() => setShowModalView(false)}
          className="fixed z-20 inset-0 flex justify-center items-center bg-black bg-opacity-25 "
        >
          <Card
            onClick={handleModalClickView}
            className=" w-2/3 h-2/3 bg-white rounded-md"
          >
            <a
              onClick={handleCloseModalView}
              className="text-black text-xl border-0 bg-white place-self-end mr-5 mt-5 cursor-pointer"
            >
              X
            </a>
            <div className="flex justify-center items-center">
              <h1>View</h1>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
export default Roletable;
