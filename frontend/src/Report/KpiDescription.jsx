import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "@material-tailwind/react";
import { useAuth } from "../GlobalContexts/Auth-Context";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Select,
  Option,
  IconButton,
} from "@material-tailwind/react";

import { useTranslation } from "react-i18next";

// import axios from "axios";
import axiosInistance from "../GlobalContexts/Base_url";

import Switch from "../components/Switch";
import {
  deleteSelectedKpiDescriptionData,
  fetchKpiDescriptionData,
} from "../reduxToolKit/slices/kpiDescriptionSlice";
import { fetchKpiData } from "../reduxToolKit/slices/kpiSlice";

function KpiDescription() {
  const { t } = useTranslation();
  const authInfo = useAuth();
  const dispatch = useDispatch();

  const { kpiDescriptionData } = useSelector((state) => state.kpiDescription);

  useEffect(() => {
    dispatch(fetchKpiDescriptionData());
  }, []);

  //add

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  // view
  const [showModalView, setShowModalView] = useState(false);
  // const [kpiname, setKpiname] = useState(false);

  const [kpidesc, setKpidesc] = useState("");

  // const [showModalView, setShowModalView] = useState(false);

  const handleCloseModalView = () => {
    // setKpiname(KPI.name);
    setShowModalView(false);
  };
  const handleOpenModalView = (items) => {
    setKpidesc(items.description);
    console.log(kpidesc);
    setShowModalView(true);
  };
  const handleModalClickView = (e) => {
    e.stopPropagation();
  };

  //add kpi

  //fetchdata

  //addData
  const [kpi_id, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const handleAddDescription = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("kpi_id", kpi_id);
    formData.append("description", description);
    formData.append("file", file);

    const token = localStorage.getItem("access");

    try {
      const response = await axiosInistance.post(
        "/reportApp/kpidescription/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setShowModalAddDivision(false);
      dispatch(fetchKpiDescriptionData());
      setOpen(false);
      setRole("");
      setDescription("");
    } catch (error) {}
  };

  // Edit
  const [openEdit, setOpenEdit] = useState();
  const [editkpi_id, setEditKpi_id] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState("");

  const [selectedEditId, setSelectedEditId] = useState();

  const handleOpenEdit = (items) => {
    setOpenEdit(!openEdit);

    setEditKpi_id(items.kpi_id);
    setEditDescription(items.description);
    setEditFile();
    setSelectedEditId(items.id);
  };

  const handleEditDescription = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("kpi_id", editkpi_id);
    formData.append("description", editDescription);
    formData.append("file", editFile);

    const token = localStorage.getItem("access");

    try {
      const response = await axiosInistance.put(
        `/reportApp/kpidescription/${selectedEditId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setShowModalAddDivision(false);
      dispatch(fetchKpiDescriptionData());
      setOpenEdit(false);
    } catch (error) {}
  };

  //delete data

  const [selectedId, setSelectedId] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  const handleOpenDelete = (selectedId) => {
    setSelectedId(selectedId);

    setOpenDelete(!openDelete);
  };
  const handleDelete = async () => {
    dispatch(deleteSelectedKpiDescriptionData(selectedId));
    setOpenDelete(false);
  };
  // //fetch Kpi
  // const [kpiname, setKpiname] = useState();
  // const token = localStorage.getItem("access");
  // const [KPI, setKPI] = useState();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInistance.get("/planApp/getKPI", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setKPI(response.data);
  //       setKpiname(response.data[0].name);
  //       // console.log(response.data[0].name);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //fetch kpi data
  const { kpiData } = useSelector((state) => state.kpi);

  useEffect(() => {
    dispatch(fetchKpiData());
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [totalPages, setTotalPages] = useState(0); //

  useEffect(() => {
    const calculateTotalPages = () => {
      setTotalPages(
        Math.ceil(
          kpiDescriptionData ? kpiDescriptionData.length / itemsPerPage : []
        )
      );
    };
    calculateTotalPages();
  }, [kpiDescriptionData, itemsPerPage]);

  // Function to handle next page button click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page button click
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate data for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageData = kpiDescriptionData
    ? kpiDescriptionData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <>
      {authInfo ? (
        <div>
          <p className="text-base font-bold font-sans">
            {t("MAIN.SIDEBAR.REPORT.KPI_DESCRIPTION.TITLE")}
          </p>
          <Card className="w-full h-screen mt-5 rounded-md">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex items-center justify-between mt-5">
                <div>
                  <div className="w-full md:w-72">
                    <Input
                      label={t("MAIN.TABLE.SEARCH")}
                      icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  {authInfo.user.userPermissions.includes('createKpiDescription') ? (
                    <Button
                      variant="text"
                      size="md"
                      className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                      onClick={handleOpen}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      {t("MAIN.SIDEBAR.REPORT.KPI_DESCRIPTION.ADDBUTTON")}
                    </Button>
                  ) : (
                    <div></div>
                  )}
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
                    <th className="text-start font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4 px-7">
                      {t("MAIN.TABLE.ACTION")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData &&
                    currentPageData.map((items, index) => (
                      <tr key={items.id}>
                        <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {indexOfFirstItem + 1 + index}
                          </Typography>
                        </td>
                        <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {items.kpi_name}
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
                              onClick={() => handleOpenModalView(items)}
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
                            {authInfo.user.userPermissions
                              .includes('updateKpiDescription') ? (
                              <Button
                                variant="text"
                                size="sm"
                                className="hover:bg-blue-700 text-white bg-blue-700"
                                onClick={() => handleOpenEdit(items)}
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
                            ) : (
                              <div></div>
                            )}
                            <Button
                              variant="text"
                              size="sm"
                              className="hover:bg-red-900 text-white bg-red-900"
                              onClick={() => handleOpenDelete(items.id)}
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
              <div className="flex gap-2">
                <Button
                  variant="text"
                  size="sm"
                  className="hover:bg-blue-700 font-sans text-sm hover:text-white focus:bg-blue-700 focus:text-white normal-case"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  {t("MAIN.TABLE.PREVIOUS")}
                </Button>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-7 h-7  hover:text-light-blue-700"
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <IconButton className="rounded-full bg-blue-700">
                    {currentPage}
                  </IconButton>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-7 h-7 hover:text-light-blue-700"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Button
                  variant="text"
                  size="sm"
                  className="hover:bg-blue-700 font-sans text-sm hover:text-white focus:bg-blue-700 focus:text-white normal-case"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  {t("MAIN.TABLE.NEXT")}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div></div>
      )}

      {/* add */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="flex justify-between">
          <div className="text-xl ml-9">Add Kpi Description</div>
          <div className="cursor-pointer mr-5" onClick={handleOpen}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[25rem] items-center">
          <form
            onSubmit={handleAddDescription}
            className="grid gap-5 items-center w-full mx-auto"
          >
            <div className="w-11/12 justify-self-center">
              {kpiData ? (
                <Select
                  label="KPI"
                  value={kpi_id}
                  onChange={(e) => {
                    setRole(e);
                  }}
                >
                  {kpiData &&
                    kpiData.map((items) => (
                      <Option
                        key={items.id}
                        value={items.id}
                        className="focus:text-light-blue-700"
                      >
                        {items.name}
                      </Option>
                    ))}
                </Select>
              ) : (
                <div></div>
              )}
            </div>

            <div className="w-11/12 justify-self-center">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                class="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your Description here..."
              ></textarea>
            </div>
            <div class="space-y-8 font-[sans-serif] w-11/12 justify-self-center">
              <input
                type="file"
                className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                value={FormData.file}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="space-x-2 flex justify-self-end mr-8">
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="normal-case"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="text"
                size="sm"
                className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                onClick={handleAddDescription}
              >
                Add Kpi Description
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>

      {/* delete */}
      <Dialog open={openDelete} handler={handleOpenDelete}>
        <DialogHeader className="flex justify-center items-center">
          Are you sure you want to delete?
        </DialogHeader>

        <DialogFooter className="flex gap-3 justify-center items-center">
          <Button
            variant="text"
            size="md"
            className="hover:bg-light-blue-700  text-white bg-light-blue-700"
            onClick={handleOpenDelete}
          >
            No
          </Button>
          <Button variant="text" size="md" color="red" onClick={handleDelete}>
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
      {/* edit */}
      <Dialog open={openEdit} handler={handleOpenEdit} size="lg">
        <DialogHeader className="flex justify-between">
          <div className="text-xl ml-5">Update Kpi Description</div>
          <div className="cursor-pointer mr-5" onClick={handleOpenEdit}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[25rem] items-center">
          <form
            onSubmit={handleEditDescription}
            className="grid gap-5 items-center w-full mx-auto"
          >
            <div className="w-11/12 justify-self-center">
              <Select
                label="KPI"
                value={editkpi_id}
                onChange={(e) => {
                  setEditKpi_id(e);
                }}
              >
                {kpiData &&
                  kpiData.map((items) => (
                    <Option
                      key={items.id}
                      value={items.id}
                      className="focus:text-light-blue-700"
                    >
                      {items.name}
                    </Option>
                  ))}
              </Select>
            </div>

            <div className="w-11/12 justify-self-center">
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                class="block p-2.5 w-full text-sm resize-none text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your Description here..."
              ></textarea>
            </div>
            <div class="space-y-8 font-[sans-serif] w-11/12 justify-self-center">
              <input
                type="file"
                className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                value={FormData.file}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="space-x-2 flex justify-self-end mr-5">
              <Button
                variant="text"
                color="red"
                onClick={handleOpenEdit}
                className="normal-case"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="text"
                size="sm"
                className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                onClick={handleEditDescription}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>

      {/* view */}

      {showModalView && (
        <div
          onClick={() => setShowModalView(false)}
          className="fixed z-20 inset-0 flex justify-center items-center bg-black bg-opacity-25 "
        >
          <Card
            onClick={handleModalClickView}
            className=" w-3/4 h-5/6 bg-white rounded-md "
          >
            <button
              onClick={handleCloseModalView}
              className="text-black text-xl  border-0 bg-white place-self-end mr-5 mt-5 cursor-pointer"
            >
              X
            </button>
            <CardBody className="flex flex-col justify-center items-center">
              <div>
                {Array.isArray(KPI) &&
                  KPI.map((items) => (
                    <h1
                      key={items.id}
                      className="text-black font-sans font-bold text-xl"
                    >
                      {items.name}
                    </h1>
                  ))}
              </div>
              <div>
                <h1 className="font-bold text-black">Description</h1>
                <p className="ml-10 mr-10">{kpidesc}</p>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center">
              <Carousel
                loop={true}
                autoplay={true}
                className="rounded-md h-1/2 w-2/3"
              >
                <img
                  src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="image 1"
                  className="h-full w-full object-cover object-center"
                />
                <img
                  src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="image 2"
                  className="h-full w-full object-cover object-center"
                />
                <img
                  src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                  alt="image 3"
                  className="h-full w-full object-cover object-center"
                />
              </Carousel>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
export default KpiDescription;
