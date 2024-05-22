import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Switch from "../components/Switch";
import { useCountries } from "use-react-countries";
import { useTranslation } from "react-i18next";
import { useAuth } from "../GlobalContexts/Auth-Context";
import { useDispatch, useSelector } from "react-redux";
import axiosInistance from "../GlobalContexts/Base_url";
import {
  // addNewDivision,
  deleteSelectedDivisionData,
  editSelectedDivisionData,
  fetchDivisionData,
} from "../reduxToolKit/slices/divisionSlice";
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
  DialogBody,
  DialogHeader,
  DialogFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSectorgData } from "../reduxToolKit/slices/sectorSlice";

function Division() {
  const { t } = useTranslation();

  const token = localStorage.getItem("access");

  const authInfo = useAuth();

  const dispatch = useDispatch();

  //fetch division data

  const { divisionData } = useSelector((state) => state.division);

  useEffect(() => {
    dispatch(fetchDivisionData());
  }, []);

  // console.log(divisionData);
  //add new division

  const [namex, setname] = useState("");

  const [phone_no, setPhone] = useState("");

  const [email, setEmail] = useState("");

  const [hisSector, setHisSector] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [errorMessageDivision, setErrorMessageDivision] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleAddDivision = async (e) => {
    e.preventDefault();

    console.log(hisSector);

    const token = localStorage.getItem("access");
    try {
      const newDivisionData = await axiosInistance.post(
        "/userApp/division/",
        { name: namex, phone_no, email, sector: hisSector },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchDivisionData());

      setOpen(false);

      toast.success(`${namex} Added successfully`, {
        autoClose: 2000,
      });

      setname("");

      setPhone("");

      setEmail("");

      setHisSector("");

      setErrorMessageDivision("");
    } catch (error) {
      console.error("Error while adding data:", error);
      setErrorMessage(error.response.status);
      setErrorMessageDivision(error.response.data.name);
    }
  };

  //delete data

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [selectedName, setSelectedName] = useState(null);

  const handleOpenDelete = (divisionId, selectedName) => {
    setSelectedId(divisionId);

    setSelectedName(selectedName);

    setOpenDelete(!openDelete);
  };

  const handleDelete = async () => {
    dispatch(deleteSelectedDivisionData(selectedId));

    toast.success(`${selectedName} deleted successfully`, {
      autoClose: 2000,
    });

    setOpenDelete(!openDelete);
  };

  // Edit
  const [editDivisionId, setEditDivisionId] = useState();

  const [editName, setEditName] = useState("");

  const [editPhone, setEditPhone] = useState("");

  const [editEmail, setEditEmail] = useState("");

  const [editSector, setEditSector] = useState("");

  const [openEdit, setOpenEdit] = useState(null);

  const handleOpenEdit = (items) => {
    setOpenEdit(!openEdit);

    setEditName(items.name);

    setEditPhone(items.phone_no);

    setEditEmail(items.email);

    setEditSector(items.sector);

    setEditDivisionId(items.id);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    dispatch(
      editSelectedDivisionData({
        editName,
        editPhone,
        editEmail,
        editSector,
        editDivisionId,
      })
    );

    toast.success(`${editName} edited successfully`, {
      autoClose: 2000,
    });

    setOpenEdit(false);
  };

  //fetch sector data

  const { sectorData } = useSelector((state) => state.sector);
  useEffect(() => {
    dispatch(fetchSectorgData());
  }, []);

  //phone
  const { countries } = useCountries();

  const ethiopiaIndex = countries.findIndex(
    (country) => country.name === "Ethiopia"
  );
  const [country, setCountry] = React.useState(ethiopiaIndex);

  const { name, flags, countryCallingCode } = countries[country];

  //pagination

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const calculateTotalPages = () => {
      setTotalPages(
        Math.ceil(divisionData ? divisionData.length / itemsPerPage : [])
      );
    };
    calculateTotalPages();
  }, [divisionData, itemsPerPage]);

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

  const currentPageData = divisionData
    ? divisionData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <>
      {authInfo ? (
        <div>
          <ToastContainer />
          <>
            <p className="text-base font-bold font-sans">
              {t("MAIN.SIDEBAR.CLUSTER.DIVISION.TITLE")}
            </p>
            <Card className="w-full h-screen mt-5 rounded-md">
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
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      {/* {authInfo.user.userPermissions.createDivision ? ( */}
                      <Button
                        variant="text"
                        size="sm"
                        className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                        onClick={handleOpen}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        {t("MAIN.SIDEBAR.CLUSTER.DIVISION.ADDBUTTON")}
                      </Button>
                      {/* ) : (
                        <div></div>
                      )} */}
                    </div>
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
                        {t("MAIN.TABLE.PHONENUMBER")}
                      </th>
                      <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                        {t("MAIN.TABLE.EMAIL")}
                      </th>
                      <th className="font-sans text-black font-bold border-b-2 border-blue-gray-100 bg-blue-gray-50 p-4">
                        {/* {t("MAIN.TABLE.ROLE")} */}Sector
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
                              {items.phone_no}
                            </Typography>
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {items.email}
                            </Typography>
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {items.sector_name}
                            </Typography>
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <Switch />
                          </td>
                          <td className="px-5 py-2 border-b-2 border-blue-gray-50">
                            <div className="flex items-center justify-center gap-2">
                              {authInfo.user.userPermissions.includes('updateDivision') ? (
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
                              {authInfo.user.userPermissions.includes('deleteDivision') ? (
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
          <div className="text-xl ml-5">Add New Division</div>
          <div className="cursor-pointer mr-5" onClick={handleOpen}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[22rem] items-center">
          {errorMessage && errorMessage === 400 && (
            <div className="ml-5 mb-1 text-red-900 font-bold">
              {errorMessageDivision}
            </div>
          )}
          <form
            onSubmit={handleAddDivision}
            className="grid gap-5  items-center w-11/12 mx-auto"
          >
            {authInfo.user.userRole === "superadmin" && (
              <div className="w-full justify-self-center">
                <Select
                  label="Sector"
                  value={hisSector}
                  onChange={(e) => {
                    setHisSector(e);
                  }}
                >
                  {sectorData &&
                    sectorData.map((items) => (
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
            )}
            <div className="w-full justify-self-center">
              <Input
                type="text"
                id="name"
                label="Division"
                size="lg"
                value={namex}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="w-full justify-self-center">
              <Input
                type="text"
                id="email"
                label="Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full relative flex justify-self-center">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    {countryCallingCode}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {countries.map(
                    ({ name, flags, countryCallingCode }, index) => {
                      return (
                        <MenuItem
                          key={name}
                          value={name}
                          className="flex items-center gap-2"
                          onClick={() => setCountry(index)}
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          {name}
                          <span className="ml-auto">{countryCallingCode}</span>
                        </MenuItem>
                      );
                    }
                  )}
                </MenuList>
              </Menu>
              <Input
                type="tel"
                placeholder="Mobile Number"
                className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
                value={phone_no}
                onChange={(e) => setPhone(e.target.value)}
              />
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
                className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                onClick={handleAddDivision}
              >
                Add Division
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>

      {/* Edit */}
      <Dialog open={openEdit} handler={handleOpenEdit} size="sm">
        <DialogHeader className="flex justify-between">
          <div className="text-xl ml-5">Update Division</div>
          <div className="cursor-pointer mr-5" onClick={handleOpenEdit}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[20rem] items-center">
          <form
            onSubmit={handleEdit}
            className="grid gap-5  items-center w-11/12 mx-auto"
          >
            {authInfo.user.userRole === "superadmin" && (
              <div className="w-full justify-self-center">
                <Select
                  label="Sector"
                  value={editSector}
                  onChange={(e) => {
                    setEditSector(e);
                  }}
                >
                  {sectorData &&
                    sectorData.map((items) => (
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
            )}
            <div className="w-full justify-self-center">
              <Input
                type="text"
                id="name"
                label="Division"
                size="lg"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="w-full justify-self-center">
              <Input
                type="text"
                id="email"
                label="Email"
                size="lg"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            <div className="w-full relative flex justify-self-center">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-4 w-4 rounded-full object-cover"
                    />
                    {countryCallingCode}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {countries.map(
                    ({ name, flags, countryCallingCode }, index) => {
                      return (
                        <MenuItem
                          key={name}
                          value={name}
                          className="flex items-center gap-2"
                          onClick={() => setCountry(index)}
                        >
                          <img
                            src={flags.svg}
                            alt={name}
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          {name}
                          <span className="ml-auto">{countryCallingCode}</span>
                        </MenuItem>
                      );
                    }
                  )}
                </MenuList>
              </Menu>
              <Input
                type="tel"
                placeholder="Mobile Number"
                className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
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
                onClick={handleEdit}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
export default Division;
