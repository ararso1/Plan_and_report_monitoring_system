import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Switch from "../components/Switch";
import axiosInistance from "../GlobalContexts/Base_url";
import { useAuth } from "../GlobalContexts/Auth-Context";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  // addNewKpi,
  deleteSelectedKpiData,
  editSelectedKpi,
  fetchKpiData,
} from "../reduxToolKit/slices/kpiSlice";

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
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { useTranslation } from "react-i18next";
// import { set } from "date-fns";
import {
  // editSelectedMainGoal,
  fetchMainGoalData,
} from "../reduxToolKit/slices/mainGoalSlice";

function Kpi() {
  const { t } = useTranslation();
  const token = localStorage.getItem("access");
  const authInfo = useAuth();
  const dispatch = useDispatch();

  console.log(authInfo);

  //fetch kpi data
  const { kpiData } = useSelector((state) => state.kpi);

  useEffect(() => {
    dispatch(fetchKpiData());
  }, []);

  //fetch maingoal data
  const { mainGoalData } = useSelector((state) => state.mainGoal);

  useEffect(() => {
    dispatch(fetchMainGoalData());
  }, []);

  //add
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const [name, setName] = useState("");
  const [main_goal_id, setMain_goal_id] = useState("");
  const [initial, setInitial] = useState("");
  const [first_quarter_plan, setFirst_quarter_plan] = useState("");
  const [second_quarter_plan, setSecond_quarter_plan] = useState("");
  const [third_quarter_plan, setThird_quarter_plan] = useState("");
  const [fourth_quarter_plan, setFourth_quarter_plan] = useState("");
  const [measure, setMeasure] = useState("");
  const [weight, setWeight] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageWeight, setErrorMessageWeight] = useState("");

  const handleAddKpi = async (e) => {
    e.preventDefault();
    const measure_id = measure;
    const token = localStorage.getItem("access");
    try {
      const res = await axiosInistance.post(
        "/planApp/createKPI/",
        {
          name,
          main_goal_id,
          initial,
          first_quarter_plan,
          second_quarter_plan,
          third_quarter_plan,
          fourth_quarter_plan,
          measure_id,
          weight,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchKpiData());

      setName("");

      setMain_goal_id("");

      setInitial("");

      setFirst_quarter_plan("");

      setSecond_quarter_plan("");

      setThird_quarter_plan("");

      setFourth_quarter_plan("");

      setMeasure("");

      setWeight("");

      setOpen(false);

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
    dispatch(deleteSelectedKpiData(selectedId));

    setOpenDelete(false);

    toast.success(`${selectedName} deleted successfully`, {
      autoClose: 2000,
    });
  };

  // Edit

  const [kpiEdit, setKpiEdit] = useState("");

  const [mainGoalIdEdit, setMainGoalIdEdit] = useState("");

  const [initialEdit, setInitialEdit] = useState("");

  const [firstQuarterPlanEdit, setFirstQuarterPlanEdit] = useState("");

  const [secondQuarterPlanEdit, setSecondQuarterPlanEdit] = useState("");

  const [thirdQuarterPlanEdit, setThirdQuarterPlanEdit] = useState("");

  const [fourthQuarterPlanEdit, setFourthQuarterPlanEdit] = useState("");

  const [measureEdit, setMeasureEdit] = useState("");

  const [weightEdit, setWeightEdit] = useState("");

  const [editId, setEditId] = useState("");

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = (items) => {
    setOpenEdit(!openEdit);

    setKpiEdit(items.name);

    setMainGoalIdEdit(items.main_goal_id);

    setInitialEdit(items.initial);

    setFirstQuarterPlanEdit(items.first_quarter_plan);

    setSecondQuarterPlanEdit(items.second_quarter_plan);

    setThirdQuarterPlanEdit(items.third_quarter_plan);

    setFourthQuarterPlanEdit(items.fourth_quarter_plan);

    setMeasureEdit(items.measure_id);

    setWeightEdit(items.weight);

    setEditId(items.id);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(
      editSelectedKpi({
        mainGoalIdEdit,
        kpiEdit,
        initialEdit,
        firstQuarterPlanEdit,
        secondQuarterPlanEdit,
        thirdQuarterPlanEdit,
        fourthQuarterPlanEdit,
        measureEdit,
        weightEdit,
        editId,
      })
    );

    setOpenEdit(false);
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

  //fetch measure
  const [measureData, setMeasureData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInistance.get("/reportApp/measure/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMeasureData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [totalPages, setTotalPages] = useState(0); //

  useEffect(() => {
    const calculateTotalPages = () => {
      setTotalPages(Math.ceil(kpiData ? kpiData.length / itemsPerPage : []));
    };
    calculateTotalPages();
  }, [kpiData, itemsPerPage]);

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
  const currentPageData = kpiData
    ? kpiData.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  return (
    <>
      {authInfo ? (
        <div>
          <p className="text-base font-bold font-sans">
            {t("MAIN.SIDEBAR.PLAN.KPI.TITLE")}
          </p>
          <Card className="w-full  h-full mt-5 rounded-md">
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
                  {authInfo.user.userPermissions.includes('createKpi') ? (
                    <Button
                      variant="text"
                      size="sm"
                      onClick={handleOpen}
                      className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      {t("MAIN.SIDEBAR.PLAN.KPI.ADDBUTTON")}
                    </Button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <table className="w-full table-auto text-left border-b-2">
                <thead>
                  <tr>
                    <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                      {t("MAIN.TABLE.NO")}
                    </th>
                    <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                      {t("MAIN.SIDEBAR.PLAN.KPI.KPI")}
                    </th>
                    <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                      {t("MAIN.SIDEBAR.PLAN.MAIN_GOAL.MAIN_GOAL")}
                    </th>

                    <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                      {t("MAIN.TABLE.INITIAL")}
                    </th>

                    <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                      {t("MAIN.TABLE.WEIGHT")}
                    </th>

                    <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                      {t("MAIN.TABLE.STATUS")}
                    </th>
                    <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4 pl-16">
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
                            className="font-normal"
                          >
                            {items.name}
                          </Typography>
                        </td>

                        <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {items.maingoal_name}
                          </Typography>
                        </td>
                        <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {items.initial}
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
                          <Switch />
                        </td>
                        <td className=" py-2 border-b-2  border-blue-gray-50">
                          <div className="flex items-center justify-center gap-2">
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
                            {authInfo.user.userPermissions.includes('updateKpi') ? (
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
                            {authInfo.user.userPermissions.includes('deleteKpi') ? (
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
          <div className="text-xl ml-5">Add New Kpi</div>
          <div className="cursor-pointer mr-5" onClick={handleOpen}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[28rem] items-center">
          <form
            onSubmit={handleAddKpi}
            className="grid grid-cols-2 justify-between gap-5 items-center w-full mx-auto"
          >
            <div className="w-11/12 justify-self-center">
              <Select
                label="Main Goal"
                color="blue"
                value={main_goal_id}
                onChange={(e) => {
                  setMain_goal_id(e);
                }}
              >
                {mainGoalData &&
                  mainGoalData.map((items) => (
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
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                color="blue"
                id="thirdQuarter"
                label="3rd Quarter"
                size="lg"
                value={third_quarter_plan}
                onChange={(e) => setThird_quarter_plan(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="name"
                required
                color="blue"
                label="Kpi"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="fourthQuarter"
                color="blue"
                label="4th Quarter"
                size="lg"
                value={fourth_quarter_plan}
                onChange={(e) => setFourth_quarter_plan(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="initial"
                color="blue"
                label="Initial"
                size="lg"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Select
                label="Measure"
                color="blue"
                value={measure}
                onChange={(e) => {
                  setMeasure(e);
                }}
              >
                {Array.isArray(measureData) &&
                  measureData.map((items) => (
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
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                color="blue"
                id="firstQuarter"
                label="1st Quarter"
                size="lg"
                value={first_quarter_plan}
                onChange={(e) => setFirst_quarter_plan(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="weight"
                label="weight"
                required
                color="blue"
                size="lg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              {errorMessage && errorMessage === 403 && (
                <h1 className="text-red-900 font-bold ml-3">
                  {errorMessageWeight}
                </h1>
              )}
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="secondQuarter"
                color="blue"
                label="2nd Quarter"
                size="lg"
                value={second_quarter_plan}
                onChange={(e) => setSecond_quarter_plan(e.target.value)}
              />
            </div>
            <div className="space-x-2 flex justify-self-end mr-5">
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
                onClick={handleAddKpi}
              >
                Add kpi
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

      {/* Edit */}

      <Dialog open={openEdit} handler={handleOpenEdit} size="lg">
        <DialogHeader className="flex justify-between">
          <div className="text-xl ml-5">Update Kpi</div>
          <div className="cursor-pointer mr-5" onClick={handleOpenEdit}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[28rem] items-center">
          <form
            onSubmit={handleEdit}
            className="grid grid-cols-2 justify-between gap-5 items-center w-full mx-auto"
          >
            <div className="w-11/12 justify-self-center">
              <Select
                label="Main Goal"
                value={mainGoalIdEdit}
                onChange={(e) => {
                  setMainGoalIdEdit(e);
                }}
              >
                {mainGoalData &&
                  mainGoalData.map((items) => (
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
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="thirdQuarter"
                label="3rd Quarter"
                size="lg"
                value={thirdQuarterPlanEdit}
                onChange={(e) => setThirdQuarterPlanEdit(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="name"
                label="Kpi"
                size="lg"
                value={kpiEdit}
                onChange={(e) => setKpiEdit(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="fourthQuarter"
                label="4th Quarter"
                size="lg"
                value={fourthQuarterPlanEdit}
                onChange={(e) => setFourthQuarterPlanEdit(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="initial"
                label="Initial"
                size="lg"
                value={initialEdit}
                onChange={(e) => setInitialEdit(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Select
                label="Measure"
                value={measureEdit}
                onChange={(e) => {
                  setMeasureEdit(e);
                }}
              >
                {Array.isArray(measureData) &&
                  measureData.map((items) => (
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
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="firstQuarter"
                label="1st Quarter"
                size="lg"
                value={firstQuarterPlanEdit}
                onChange={(e) => setFirstQuarterPlanEdit(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="weight"
                label="weight"
                size="lg"
                value={weightEdit}
                onChange={(e) => setWeightEdit(e.target.value)}
              />
            </div>
            <div className="w-11/12  justify-self-center">
              <Input
                type="text"
                id="secondQuarter"
                label="2nd Quarter"
                size="lg"
                value={secondQuarterPlanEdit}
                onChange={(e) => setSecondQuarterPlanEdit(e.target.value)}
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
                onClick={handleEdit}
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
export default Kpi;
