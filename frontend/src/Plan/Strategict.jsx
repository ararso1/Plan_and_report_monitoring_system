import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../GlobalContexts/Base_url";
import { useTranslation } from "react-i18next";
import { useAuth } from "../GlobalContexts/Auth-Context";
import { faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSectorgData } from "../reduxToolKit/slices/sectorSlice";
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
  IconButton,
  Chip,
  Tooltip,
} from "@material-tailwind/react";
import {
  assignStrategicGoal,
  deleteSelectedStrategicGoalData,
  editSelectedStrategicGoal,
  fetchStrategicGoalData,
} from "../reduxToolKit/slices/strategicGoalSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Strategictable() {
  const { t } = useTranslation();

  const authInfo = useAuth();

  console.log(authInfo);
  const dispatch = useDispatch();

  //fetch strategicGoalData

  const { strategicGoalData, error } = useSelector(
    (state) => state.strategicGoal
  );

  useEffect(() => {
    dispatch(fetchStrategicGoalData());
  }, []);

  console.log(strategicGoalData);
  console.log(error);

  //fetch sector data
  const { sectorData } = useSelector((state) => state.sector);

  useEffect(() => {
    dispatch(fetchSectorgData());
  }, []);

  // view
  const [showModalView, setShowModalView] = useState(false);

  const handleCloseModalView = () => {
    setShowModalView(false);
  };
  const [strategicgoal, setStrategicgoal] = useState("");

  const handleOpenModalView = (items) => {
    setStrategicgoal(items.name);
    setShowModalView(true);
  };
  const handleModalClickView = (e) => {
    e.stopPropagation();
  };

  //assign
  const [openAssign, setOpenAssign] = useState(false);

  const handleOpenAssign = (itemId) => {
    setOpenAssign(!openAssign);
    setSelectedStrategicGoalId(itemId);
  };

  const handleAssignStrategicGoal = async (e) => {
    e.preventDefault();

    dispatch(assignStrategicGoal({ selectedStrategicGoalId, selectedItems }));

    dispatch(fetchStrategicGoalData());

    setOpenAssign(false);
  };

  //add

  const [open, setOpen] = useState(false);

  const handleOpen = (strategicGolaId) => {
    setSelectedStrategicGoalId(strategicGolaId);

    setOpen(!open);
  };

  const [name, setName] = useState("");

  const [weight, setWeight] = useState("");

  const [year, setYear] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageWeight, setErrorMessageWeight] = useState("");

  const handleAddStrategicGoal = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    try {
      const res = await axiosInstance.post(
        "/planApp/setStrategicGoal/",
        { name, year, weight },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchStrategicGoalData());

      setOpen(false);

      setName("");

      setYear("");

      setWeight("");

      // setNameError(false);

      toast.success(`${name} Strategic Goal added successfully`, {
        autoClose: 2000,
      });

      setErrorMessage("");
    } catch (error) {
      console.error("Error add new data:", error);
      setErrorMessage(error.response.status);
      setErrorMessageWeight(error.response.data.message);
    }
  };

  //delete
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [selectedName, setSelectedName] = useState(null);

  const handleOpenDelete = (selectedId, selectedName) => {
    setSelectedId(selectedId);

    setOpenDelete(!openDelete);

    setSelectedName(selectedName);
  };

  const handleDelete = async () => {
    dispatch(deleteSelectedStrategicGoalData(selectedId));

    setOpenDelete(false);

    toast.success(`${selectedName} deleted successfully`, {
      autoClose: 2000,
    });
  };

  //editassign
  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedStrategicGoalId, setSelectedStrategicGoalId] = useState(null);

  const handleCheckBoxThree = (itemId) => {
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      const newSelectedItems = selectedItems.filter((id) => id !== itemId);

      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  //edit
  const [openEdit, setOpenEdit] = useState(null);

  const [nameEdit, setNameEdit] = useState("");

  const [yearEdit, setYearEdit] = useState("");

  const [weightEdit, setWeightEdit] = useState("");

  const [editId, setEditId] = useState("");

  const handleOpenEdit = (items) => {
    setOpenEdit(!openEdit);

    setNameEdit(items.name);

    setYearEdit(items.year);

    setWeightEdit(items.weight);

    setEditId(items.id);
  };

  const handleEditStrategicGoal = (e) => {
    e.preventDefault();

    dispatch(
      editSelectedStrategicGoal({ nameEdit, yearEdit, weightEdit, editId })
    );
    setOpenEdit(false);
  };

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const calculateTotalPages = () => {
      setTotalPages(
        Math.ceil(
          strategicGoalData ? strategicGoalData.length / itemsPerPage : []
        )
      );
    };
    calculateTotalPages();
  }, [strategicGoalData, itemsPerPage]);

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

  const currentPageData = strategicGoalData
    ? strategicGoalData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <>
      {authInfo ? (
        <div>
          {/* {toggledRowStrategic ? ( */}
          <>
            <ToastContainer />
            <p className="text-base font-bold font-sans">
              {t("MAIN.SIDEBAR.PLAN.STRATEGIC_GOAL.TITLE")}
            </p>
            <Card className="w-full h-full mt-5 rounded-md">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
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
                    {authInfo.user.userPermissions.includes('createStrategicGoal') ? (
                      <Button
                        variant="text"
                        size="sm"
                        onClick={handleOpen}
                        className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        {t("MAIN.SIDEBAR.PLAN.STRATEGIC_GOAL.ADDBUTTON")}
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <table className="w-full  table-auto text-left border-b-2">
                  <thead>
                    <tr>
                      <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                        {t("MAIN.TABLE.NO")}
                      </th>
                      <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                        {t("MAIN.SIDEBAR.PLAN.STRATEGIC_GOAL.STRATEGIC_GOAL")}
                      </th>
                      <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                        {t("MAIN.TABLE.WEIGHT")}
                      </th>
                      <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                        {t("MAIN.TABLE.YEAR")}
                      </th>

                      <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                        {t("MAIN.TABLE.STATUS")}
                      </th>
                      <th className="text-center font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
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
                              {indexOfFirstItem + index + 1}
                            </Typography>
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal flex gap-2 items-center"
                            >
                              <div className="w-1/2">{items.name}</div>
                              {items.sector_id.includes &&
                                items.sector_id.includes(
                                  authInfo.user.sector_id
                                ) && (
                                  <Tooltip
                                    content="You are assigned this Strategic Goal"
                                    animate={{
                                      mount: { scale: 1, y: 0 },
                                      unmount: { scale: 0, y: 25 },
                                    }}
                                  >
                                    <Chip
                                      variant="ghost"
                                      color="green"
                                      size="md"
                                      value="Assigned"
                                      className="rounded-full  text-center normal-case  border border-green-700"
                                    />
                                  </Tooltip>
                                )}
                            </Typography>
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {items.weight}
                            </Typography>
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {items.year}
                            </Typography>
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={items.status}
                                onChange={() =>
                                  handleStatusUpdate(items.id, items.status)
                                }
                                className="sr-only peer"
                              />
                              <div
                                className="relative w-11 h-6
                                  rounded-full peer 
                                peer-checked:after:translate-x-full  after:absolute after:top-[1px] 
                                after:start-[1px] after:bg-red-900  
                                after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                                bg-white  border border-gray-200  peer-checked:after:bg-blue-900"
                              ></div>
                            </label>
                          </td>

                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <div className="flex items-center justify-center gap-2">
                              {authInfo.user.userPermissions.includes('createAssign') && (
                                <Tooltip
                                  content="Assign"
                                  className=""
                                  placement="top"
                                  animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                  }}
                                >
                                  <Button
                                    variant="text"
                                    size="sm"
                                    className="hover:bg-light-green-700 text-white bg-light-green-700"
                                    onClick={() => handleOpenAssign(items.id)}
                                  >
                                    <FontAwesomeIcon icon={faHandHoldingHand} />
                                  </Button>
                                </Tooltip>
                              )}
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
                                .includes('updateStrategicGoal') ? (
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
                              {authInfo.user.userPermissions
                                .includes('deleteStrategicGoal') ? (
                                <Button
                                  variant="text"
                                  size="sm"
                                  className="hover:bg-red-900 text-white bg-red-900"
                                  onClick={() =>
                                    handleOpenDelete(items.id, items.name)
                                  }
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
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
          </>
        </div>
      ) : (
        <div></div>
      )}

      {/* Edit */}
      <Dialog open={openEdit} handler={handleOpenEdit} size="sm">
        <DialogHeader className="flex justify-between">
          <div className="text-xl ml-5">Update Strategic Goal</div>
          <div className="cursor-pointer mr-5" onClick={handleOpenEdit}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[20rem] items-center">
          <form
            onSubmit={handleEditStrategicGoal}
            className="grid gap-5 items-center w-11/12 mx-auto"
          >
            <div className="w-full justify-self-center">
              <Input
                type="text"
                id="name"
                label="Strategic Goal"
                size="lg"
                color="blue"
                value={nameEdit}
                onChange={(e) => setNameEdit(e.target.value)}
              />
            </div>
            <div className="w-full justify-self-center">
              <Input
                type="text"
                id="email"
                label="year"
                color="blue"
                size="lg"
                value={yearEdit}
                onChange={(e) => setYearEdit(e.target.value)}
              />
            </div>
            <div className="w-full justify-self-center">
              <Input
                type="text"
                id="role"
                label="weight"
                color="blue"
                size="lg"
                value={weightEdit}
                onChange={(e) => setWeightEdit(e.target.value)}
              />
            </div>
            <div className="space-x-2 flex justify-self-end">
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
                onClick={handleEditStrategicGoal}
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
            <CardHeader className="border-none shadow-none mt-3 flex justify-between">
              <div></div>
              <a
                onClick={handleCloseModalView}
                className="text-black text-xl  border-0 bg-white place-self-end mr-5 mt-5 cursor-pointer"
              >
                X
              </a>
            </CardHeader>

            <CardBody className="flex gap-2 flex-col justify-center items-center">
              <div>
                <h1 className="text-black font-sans font-bold text-xl">
                  {strategicgoal}
                </h1>
              </div>

              <div>
                <h1 className="font-bold text-black">Description</h1>
                <p className="ml-10 mr-10">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  faucibus velit et purus consequat. Vestibulum ante ipsum
                  primis in faucibus orci luctus et ultrices posuere cubilia
                  curae; Pellentesque habitant morbi tristique senectus et netus
                  et malesuada fames ac turpis egestas. Nulla facilisi. Integer
                  eget libero lectus. Sed ultrices velit sit amet arcu volutpat.
                  Vivamus vitae lacus ligula. Morbi mattis fermentum velit. Sed
                  auctor vel nulla eget tristique.
                </p>
              </div>
            </CardBody>
            <CardFooter>
              <div className="grid gap-2">
                <h1 className="text-black font-sans font-bold">Year: 2024</h1>
                <h1 className="text-black font-sans font-bold">
                  status: Active
                </h1>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      <>
        {/* assign */}
        <Dialog open={openAssign} handler={handleOpenAssign}>
          <DialogHeader className="flex justify-center items-center">
            Assign Strategic Goal
          </DialogHeader>
          <DialogBody className="grid gap-3 justify-center items-center">
            {sectorData &&
              sectorData.map((items) => (
                <ul
                  key={items.id}
                  className="flex flex-col gap-3 justify-center"
                >
                  <li className="flex items-center text-center h-5">
                    <span className="">
                      <Checkbox
                        onClick={() => handleCheckBoxThree(items.id)}
                        checked={selectedItems.includes(items.id)}
                        color="blue"
                      />
                    </span>
                    <Typography className="font-sans font-bold text-sm">
                      {items.name}
                    </Typography>
                  </li>
                </ul>
              ))}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenAssign}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={handleAssignStrategicGoal}
            >
              <span>Assign</span>
            </Button>
          </DialogFooter>
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

        {/* add */}
        <Dialog open={open} handler={handleOpen} size="sm">
          <DialogHeader className="flex justify-between">
            <div className="text-xl ml-5">Add New Strategic Goal</div>
            <div className="cursor-pointer mr-5" onClick={handleOpen}>
              X
            </div>
          </DialogHeader>

          <DialogBody className="h-[22rem] items-center">
            <form
              onSubmit={handleAddStrategicGoal}
              className="grid gap-5 items-center w-11/12 mx-auto"
            >
              <div className="w-full justify-self-center">
                <Input
                  type="text"
                  id="name"
                  label="Strategic Goal"
                  size="lg"
                  color="blue"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full justify-self-center">
                <Input
                  type="text"
                  id="email"
                  label="year"
                  size="lg"
                  color="blue"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="w-full justify-self-center">
                <Input
                  type="text"
                  id="role"
                  label="weight"
                  size="lg"
                  color="blue"
                  required
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                {errorMessage && errorMessage === 403 && (
                  <h1 className="text-red-900 font-bold ml-3">
                    {errorMessageWeight}
                  </h1>
                )}
              </div>
              <div className="space-x-2 flex justify-self-end">
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
                  type="submit"
                  className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                  onClick={handleAddStrategicGoal}
                >
                  Add Strategic Goal
                </Button>
              </div>
            </form>
          </DialogBody>
        </Dialog>
      </>
    </>
  );
}
export default Strategictable;
