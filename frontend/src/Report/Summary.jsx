import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
  Collapse,
} from "@material-tailwind/react";

import { useTranslation } from "react-i18next";

const TABLE_HEAD = ["No", "Type", "Cluster", "Action"];

const TABLE_ROWS = [
  {
    No: "1",
    Type: "Don't",
    Cluster: "Division",
  },
  {
    No: "2",
    Type: "Don't",
    Cluster: "Division",
  },
  {
    No: "3",
    Type: "Don't",
    Cluster: "Division",
  },
  {
    No: "4",
    Type: "Don't",
    Cluster: "Division",
  },
  {
    No: "5",
    Type: "Don't",
    Cluster: "Division",
  },
];

function Summary() {
  const { t } = useTranslation();
  //toggle1
  const [open1, setOpen1] = useState(false);
  const toggleOpen1 = () => {
    setOpen1((cur) => !cur);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  };
  //toggle2
  const [open2, setOpen2] = useState(false);
  const toggleOpen2 = () => {
    setOpen2((cur) => !cur);
    setOpen1(false);
    setOpen3(false);
    setOpen4(false);
  };
  //toggle3
  const [open3, setOpen3] = useState(false);
  const toggleOpen3 = () => {
    setOpen3((cur) => !cur);
    setOpen1(false);
    setOpen2(false);
    setOpen4(false);
  };
  //toggle4
  const [open4, setOpen4] = useState(false);
  const toggleOpen4 = () => {
    setOpen4((cur) => !cur);
    setOpen1(false);
    setOpen3(false);
    setOpen2(false);
  };

  //add

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const [showModalt, setShowModalt] = useState(false);

  const handleCloseModalt = () => {
    setShowModalt(false);
  };
  const handleOpenModalt = () => {
    setShowModalt(true);
  };
  const handleModalClickt = (e) => {
    e.stopPropagation();
  };

  // Edit
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

  // view
  const [showModalSummary, setShowModalSummary] = useState(false);

  const handleCloseModalSummary = () => {
    setShowModalSummary(false);
  };
  const handleOpenModalSummary = () => {
    setShowModalSummary(true);
  };
  const handleModalClickSummary = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <p className="text-base font-bold font-sans">Summary</p>
      <Card className="w-full h-min mt-5 rounded-md">
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
                className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
                onClick={handleOpen}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Summary
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <table className="w-full min-w-max table-auto text-left border-b-2">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className=" border-b-2 text-center border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-sans font-bold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ No, Type, Cluster }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-2 text-center"
                  : "p-2 text-center border-b-2 border-blue-gray-50";

                return (
                  <tr key={No}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {No}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Type}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {Cluster}
                      </Typography>
                    </td>
                    <td className={classes}>
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
                        <Button
                          variant="text"
                          size="sm"
                          className="hover:bg-blue-700 text-white bg-blue-700"
                          onClick={handleOpenModal}
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
                          onClick={() => handleOpenModalt()}
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
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between s   p-4">
          <div></div>
          <div className="flex gap-2">
            <Button
              variant="text"
              size="sm"
              className="hover:bg-blue-700 normal-case font-sans text-sm hover:text-white focus:bg-blue-700 focus:text-white"
            >
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <IconButton
                variant="text"
                size="sm"
                className="hover:bg-blue-700 normal-case font-sans text-sm hover:text-white focus:bg-blue-700 focus:text-white"
              >
                1
              </IconButton>
              <IconButton
                variant="text"
                size="sm"
                className="hover:bg-blue-700 normal-case font-sans text-sm hover:text-white focus:bg-blue-700 focus:text-white"
              >
                2
              </IconButton>
            </div>
            <Button
              variant="text"
              size="sm"
              className="hover:bg-blue-700 normal-case font-sans text-sm hover:text-white focus:bg-blue-700 focus:text-white"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* add */}
      <Dialog open={open} size="md" handler={handleOpen}>
        <DialogHeader className="flex justify-between">
          <div className="text-xl ml-5">Add Summary</div>
          <div className="cursor-pointer mr-5" onClick={handleOpen}>
            X
          </div>
        </DialogHeader>
        <form className="">
          <DialogBody className="h-[28rem]   grid items-center w-full mx-auto">
            <div className="w-11/12 justify-self-center">
              <Button
                onClick={toggleOpen1}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
              >
                Introduction
                <ChevronDownIcon
                  className={open1 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                />
              </Button>

              <Collapse open={open1}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm resize-none border-2 rounded-md border-light-blue-700"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="w-11/12 justify-self-center">
              <Button
                onClick={toggleOpen2}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
              >
                Introduction 1
                <ChevronDownIcon
                  className={open2 ? "w-5 h-5 rotate-180 " : "w-5 h-5 "}
                />
              </Button>
              <Collapse open={open2}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                    <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                      <input
                        type="file"
                        class="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="w-11/12 justify-self-center">
              <Button
                onClick={toggleOpen3}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
              >
                Introduction 2
                <ChevronDownIcon
                  className={open3 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                />
              </Button>
              <Collapse open={open3}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                    <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                      <input
                        type="file"
                        className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="w-11/12 justify-self-center">
              <Button
                onClick={toggleOpen4}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex justify-between w-full"
              >
                Introduction 3
                <ChevronDownIcon
                  className={open4 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                />
              </Button>
              <Collapse open={open4}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                    <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                      <input
                        type="file"
                        className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="text"
              color="red"
              size="md"
              onClick={handleOpen}
              className="mr-1 normal-case"
            >
              Cancel
            </Button>
            <Button
              variant="text"
              size="md"
              // onClick={handleCreateRole}
              className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case"
            >
              Add Role
            </Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="flex justify-between">
          <div className="text-xl ml-9">Add Kpi Description</div>
          <div className="cursor-pointer mr-5" onClick={handleOpen}>
            X
          </div>
        </DialogHeader>

        <DialogBody className="h-[35rem] items-center">
          <form className="grid gap-5 items-center w-full mx-auto">
            <div className="w-1/2 justify-self-center">
              <Button
                onClick={toggleOpen1}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
              >
                Introduction
                <ChevronDownIcon
                  className={open1 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                />
              </Button>

              <Collapse open={open1}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm resize-none border-2 rounded-md border-light-blue-700"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="w-1/2 justify-self-center">
              <Button
                onClick={toggleOpen2}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
              >
                Introduction 1
                <ChevronDownIcon
                  className={open2 ? "w-5 h-5 rotate-180 " : "w-5 h-5 "}
                />
              </Button>
              <Collapse open={open2}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                    <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                      <input
                        type="file"
                        class="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="w-1/2 justify-self-center">
              <Button
                onClick={toggleOpen3}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
              >
                Introduction 2
                <ChevronDownIcon
                  className={open3 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                />
              </Button>
              <Collapse open={open3}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                    <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                      <input
                        type="file"
                        className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <div className="w-1/2 justify-self-center">
              <Button
                onClick={toggleOpen4}
                className="bg-light-blue-700 text-white font-sans font-bold normal-case flex justify-between w-full"
              >
                Introduction 3
                <ChevronDownIcon
                  className={open4 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                />
              </Button>
              <Collapse open={open4}>
                <div className="my-4 mr-5 w-full">
                  <div className="grid gap-2">
                    <textarea
                      id="message"
                      rows="4"
                      className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                      placeholder="Write your Introduction here..."
                    ></textarea>
                    <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                      <input
                        type="file"
                        className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
            <DialogFooter className="space-x-2 flex justify-self-end">
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
                // onClick={handleAddDescription}
              >
                Add Kpi Description
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog> */}

      {/* add */}
      {showModalSummary && (
        <div
          onClick={() => setShowModalSummary(false)}
          className="fixed z-20 inset-0 flex justify-center items-center bg-black bg-opacity-25 "
        >
          <Card
            onClick={handleModalClickSummary}
            className=" w-3/4 h-fit bg-white rounded-md "
          >
            <CardHeader className="border-none shadow-none mt-5 flex justify-between">
              <div>
                <h1 className="text-black font-bold">Add Summary</h1>
              </div>
              <a
                onClick={handleCloseModalSummary}
                className="text-black text-xl  border-0 bg-white place-self-end mr-5 mt-5 cursor-pointer"
              >
                X
              </a>
            </CardHeader>

            <CardFooter className="grid gap-5 items-center w-full mx-auto">
              <div className="w-1/2 justify-self-center">
                <Button
                  onClick={toggleOpen1}
                  className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
                >
                  Introduction
                  <ChevronDownIcon
                    className={open1 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                  />
                </Button>

                <Collapse open={open1}>
                  <div className="my-4 mr-5 w-full">
                    <div className="grid gap-2">
                      <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm resize-none border-2 rounded-md border-light-blue-700"
                        placeholder="Write your Introduction here..."
                      ></textarea>
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="w-1/2 justify-self-center">
                <Button
                  onClick={toggleOpen2}
                  className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
                >
                  Introduction 1
                  <ChevronDownIcon
                    className={open2 ? "w-5 h-5 rotate-180 " : "w-5 h-5 "}
                  />
                </Button>
                <Collapse open={open2}>
                  <div className="my-4 mr-5 w-full">
                    <div className="grid gap-2">
                      <textarea
                        id="message"
                        rows="4"
                        className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                        placeholder="Write your Introduction here..."
                      ></textarea>
                      <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                        <input
                          type="file"
                          class="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="w-1/2 justify-self-center">
                <Button
                  onClick={toggleOpen3}
                  className="bg-light-blue-700 text-white font-sans font-bold normal-case flex w-full justify-between"
                >
                  Introduction 2
                  <ChevronDownIcon
                    className={open3 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                  />
                </Button>
                <Collapse open={open3}>
                  <div className="my-4 mr-5 w-full">
                    <div className="grid gap-2">
                      <textarea
                        id="message"
                        rows="4"
                        className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                        placeholder="Write your Introduction here..."
                      ></textarea>
                      <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                        <input
                          type="file"
                          className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="w-1/2 justify-self-center">
                <Button
                  onClick={toggleOpen4}
                  className="bg-light-blue-700 text-white font-sans font-bold normal-case flex justify-between w-full"
                >
                  Introduction 3
                  <ChevronDownIcon
                    className={open4 ? "w-5 h-5 rotate-180" : "w-5 h-5 "}
                  />
                </Button>
                <Collapse open={open4}>
                  <div className="my-4 mr-5 w-full">
                    <div className="grid gap-2">
                      <textarea
                        id="message"
                        rows="4"
                        className="block  p-2.5 w-full text-sm resize-none border-2 border-light-blue-700 rounded-md"
                        placeholder="Write your Introduction here..."
                      ></textarea>
                      <div class="space-y-8 font-[sans-serif] w-full justify-self-center">
                        <input
                          type="file"
                          className="w-full text-black text-base bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:mr-4 file:bg-light-blue-700 file:hover:bg-light-blue-700 file:text-white rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="w-1/2 justify-self-center">
                <div className="flex justify-end gap-5">
                  <Button
                    type="submit"
                    size="md"
                    className="hover:shadow-none text-white bg-red-900 normal-case"
                    onClick={handleCloseModalSummary}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="md"
                    className="hover:bg-blue-700 text-white bg-blue-700 normal-case"
                  >
                    Add Summary
                  </Button>
                </div>
              </div>
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
                  onClick={() => handleOpenModalt()}
                >
                  Yes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
      {/* Edit */}

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed z-20 inset-0 flex justify-center items-center bg-black bg-opacity-25 "
        >
          <Card
            onClick={handleModalClick}
            className=" w-2/3 h-2/3 bg-white rounded-md"
          >
            <a
              onClick={handleCloseModal}
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
export default Summary;
