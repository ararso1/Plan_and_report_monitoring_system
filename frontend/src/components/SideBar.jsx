import React, { useEffect, useState } from "react";
import "./Scrollbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
// import avatarImage from "../assets/EAII.png";
import { Outlet, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuth } from "../GlobalContexts/Auth-Context";
import { useTranslation } from "react-i18next";
import Loader from "react-js-loader";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { fetchUserProfile } from "../reduxToolKit/slices/authContext";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const initialState = {
  dashboard: false, // Set your desired default value for dashboard
  user: false, // Set your desired default value for user
  role: false, // Set your desired default value for role
  assignRole: false, // Set your desired default value for assignRole
  strategicplan: false, // Set your desired default value for strategicplan
  kpi: false, // Set your desired default value for kpi
  generatetable: false, // Set your desired default value for generatetable
};

function SideBar({ height, maxHeight }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authInfo = useAuth();
  console.log(authInfo ? authInfo.user : null);

  const [state, setState] = useState(initialState);

  // const [state, setState] = useState(initialState);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [open, setOpen] = useState(0);

  const handleSidebarToggle = () => {
    setIsSidebarVisible(!isSidebarVisible);

    // isSidebarVisible ? "" : window.location.reload();
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    const storedState = localStorage.getItem("myComponentState");
    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState);
        setState({ ...state, ...parsedState }); // Merge state with stored values
      } catch (error) {
        console.error("Error parsing stored state:", error);
      }
    }
  }, []);

  const handleLinkClick = (index) => {
    let newState; // Declare newState outside the switch block

    switch (index) {
      case 0:
        newState = {
          dashboard: false,
          user: true,
          role: false,
          assignRole: false,
          strategicplan: false,
          kpi: false,
          generatetable: false,
        };
        break;
      case 1:
        newState = {
          dashboard: false,
          user: false,
          role: true,
          assignRole: false,
          strategicplan: false,
          kpi: false,
          generatetable: false,
        };
        break;
      case 2:
        newState = {
          dashboard: false,
          user: false,
          role: false,
          assignRole: true,
          strategicplan: false,
          kpi: false,
          generatetable: false,
        };
        break;
      case 3:
        newState = {
          dashboard: false,
          user: false,
          role: false,
          assignRole: false,
          strategicplan: true,
          kpi: false,
          generatetable: false,
        };
        break;
      case 4:
        newState = {
          dashboard: false,
          user: false,
          role: false,
          assignRole: false,
          strategicplan: false,
          kpi: false,
          generatetable: false,
        };
        break;
      case 5:
        newState = {
          dashboard: false,
          user: false,
          role: false,
          assignRole: false,
          strategicplan: false,
          kpi: true,
          generatetable: false,
        };
        break;
      case 6:
        newState = {
          dashboard: false,
          user: false,
          role: false,
          assignRole: false,
          strategicplan: false,
          kpi: false,
          generatetable: true,
        };
        break;
      case 7:
        newState = {
          dashboard: true,
          user: false,
          role: false,
          assignRole: false,
          strategicplan: false,
          kpi: false,
          generatetable: false,
        };
        break;
      default:
        newState = {
          dashboard: false,
          user: false,
          role: false,
          assignRole: true, // Default case (optional)
          strategicplan: false,
          kpi: false,
          generatetable: false,
        };
    }

    // Update state and store in local storage (combined)
    setState(newState);
    localStorage.setItem("myComponentState", JSON.stringify(newState));
  };
  const color = "#33AFFF";

  return (
    <>
      {authInfo ? (
        <div className="flex bg-blue-gray-50 w-full ">
          <Card
            className={`sidebar ${
              isSidebarVisible
                ? `h-${height} h-[${maxHeight}] w-full max-w-[20rem] p-4 rounded-none shadow-xl shadow-blue-gray-100 overflow-y-auto scrollbar fixed z-10 h-full bg-gray-50 border-t-2`
                : `hidden h-${height} h-[${maxHeight}] w-full max-w-[20rem] p-4 rounded-none shadow-xl shadow-blue-gray-100  fixed z-10 h-full bg-gray-50`
            }`}
          >
            <List className="mt-16">
              <Link to={`/Home/Dashboard`}>
                <Accordion open={open === 1} onClick={() => handleOpen(1)}>
                  <ListItem selected={open === 1}>
                    <AccordionHeader
                      onClick={() => handleLinkClick(7)}
                      className={
                        state.dashboard
                          ? "p-0 hover:text-light-blue-700 border-b-0 text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700"
                          : "border-b-0 p-0 hover:text-light-blue-700"
                      }
                    >
                      <ListItemPrefix>
                        <FontAwesomeIcon icon={faCube} />
                      </ListItemPrefix>
                      <Typography className="mr-auto  font-normal">
                        {t("MAIN.SIDEBAR.DASHBOARD")}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                </Accordion>
              </Link>
              <Accordion
                open={open === 2}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 2 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                
                {authInfo.user.userPermissions.includes('readUser') ||
                authInfo.user.userPermissions.includes('readAdmin') ? (
                  <ListItem className="p-0" selected={open === 2}>
                    <AccordionHeader
                      onClick={() => handleOpen(2)}
                      className="border-b-0 p-3 hover:text-light-blue-700"
                    >
                      <ListItemPrefix>
                        <FontAwesomeIcon icon={faTableCellsLarge} />
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal">
                        {t("MAIN.SIDEBAR.UMS.UMS")}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                ) : (
                  <div></div>
                )}

                <AccordionBody className="py-1">
                  <List className="p-0">
                    {authInfo.user.userPermissions.includes('readAdmin') ||
                    authInfo.user.userPermissions.includes('readUser') ? (
                      <Link to={`/Home/Admin`}>
                        <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.UMS.USER.USER")}{" "}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}

                    {/* {authInfo.user.userPermissions.readUser ? (
                      <Link to={`/Home/User`}>
                        <ListItem
                          onClick={() => handleLinkClick(0)}
                          className={
                            state.user
                              ? "hover:text-light-blue-700 text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700"
                              : "hover:text-light-blue-700 active:text-light-blue-700"
                          }
                        >
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.UMS.USER.USER")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )} */}
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 3}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 3 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                {authInfo.user.userPermissions.includes('readRole') ? (
                  <ListItem className="p-0" selected={open === 3}>
                    <AccordionHeader
                      onClick={() => handleOpen(3)}
                      className="border-b-0 p-3 hover:text-light-blue-700"
                    >
                      <ListItemPrefix>
                        <FontAwesomeIcon icon={faTrophy} />{" "}
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal">
                        {t("MAIN.SIDEBAR.ROLE.ROLE")}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                ) : (
                  <div></div>
                )}

                <AccordionBody className="py-1">
                  <List className="p-0">
                    <Link to={`/Home/Role`}>
                      <ListItem
                        onClick={() => handleLinkClick(1)}
                        className={
                          state.role
                            ? "hover:text-light-blue-700 focus:text-light-blue-700 text-light-blue-700 "
                            : "hover:text-light-blue-700 active:text-light-blue-700"
                        }
                      >
                        <ListItemPrefix>
                          <svg
                            width="4"
                            height="5"
                            viewBox="0 0 4 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="0.5"
                              width="4"
                              height="4"
                              rx="2"
                              fill="#94A3B8"
                            />
                          </svg>
                        </ListItemPrefix>
                        {t("MAIN.SIDEBAR.ROLE.ROLE")}
                      </ListItem>
                    </Link>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 4}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 4 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 4}>
                  <AccordionHeader
                    onClick={() => handleOpen(4)}
                    className="border-b-0 p-3 hover:text-light-blue-700"
                  >
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faCircleDot} />{" "}
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">
                      {t("MAIN.SIDEBAR.PLAN.PLAN")}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    {authInfo.user.userPermissions.includes('readStrategicGoal') ? (
                      <Link to={`/Home/StrategicGoal`}>
                        <ListItem
                          onClick={() => handleLinkClick(3)}
                          className={
                            state.strategicplan
                              ? "hover:text-light-blue-700 text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700"
                              : "hover:text-light-blue-700 active:text-light-blue-700"
                          }
                        >
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.PLAN.STRATEGIC_GOAL.STRATEGIC_GOAL")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}
                    {authInfo.user.userPermissions.includes('readMainActivity') ? (
                      <Link to={`/Home/MainGoal`}>
                        <ListItem
                          onClick={() => handleLinkClick(4)}
                          className={
                            state.mailgoal
                              ? "hover:text-light-blue-700 text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700"
                              : "hover:text-light-blue-700 active:text-light-blue-700"
                          }
                        >
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.PLAN.MAIN_GOAL.MAIN_GOAL")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}

                    {authInfo.user.userPermissions.includes('readKpi') ? (
                      <Link to={`/Home/Kpi`}>
                        <ListItem
                          onClick={() => handleLinkClick(5)}
                          className={
                            state.kpi
                              ? "hover:text-light-blue-700 text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700"
                              : "hover:text-light-blue-700 active:text-light-blue-700"
                          }
                        >
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.PLAN.KPI.KPI")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}

                    <Link to={`/Home/GeneratePlanTable`}>
                      <ListItem
                        onClick={() => handleLinkClick(6)}
                        className={
                          state.generatetable
                            ? "hover:text-light-blue-700 text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700"
                            : "hover:text-light-blue-700 active:text-light-blue-700"
                        }
                      >
                        <ListItemPrefix>
                          <svg
                            width="4"
                            height="5"
                            viewBox="0 0 4 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="0.5"
                              width="4"
                              height="4"
                              rx="2"
                              fill="#94A3B8"
                            />
                          </svg>
                        </ListItemPrefix>
                        {t(
                          "MAIN.SIDEBAR.PLAN.GENERATE_PLAN_TABLE.GENERATE_PLAN_TABLE"
                        )}
                      </ListItem>
                    </Link>
                    <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                      <ListItemPrefix>
                        <svg
                          width="4"
                          height="5"
                          viewBox="0 0 4 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="4"
                            height="4"
                            rx="2"
                            fill="#94A3B8"
                          />
                        </svg>
                      </ListItemPrefix>
                      {t(
                        "MAIN.SIDEBAR.PLAN.GENERATE_FINAL_PLAN.GENERATE_FINAL_PLAN"
                      )}
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 5}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 5 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 5}>
                  <AccordionHeader
                    onClick={() => handleOpen(5)}
                    className="border-b-0 p-3 hover:text-light-blue-700"
                  >
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faChartPie} />{" "}
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">
                      {t("MAIN.SIDEBAR.REPORT.REPORT")}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    {authInfo.user.userPermissions.includes('readKpiDescription') ? (
                      <Link to={`/Home/KpiDescription`}>
                        <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t(
                            "MAIN.SIDEBAR.REPORT.KPI_DESCRIPTION.KPI_DESCRIPTION"
                          )}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}
                    {authInfo.user.userPermissions.includes('readSummmary') ? (
                      <Link to={`/Home/Summary`}>
                        <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.REPORT.SUMMARY.SUMMARY")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}
                    {authInfo.user.userPermissions.includes('readMeasure') ? (
                      <Link to={`/Home/Measure`}>
                        <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.REPORT.MEASURE.MEASURE")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}
                    <Link to={`/Home/GenerateReportTable`}>
                      <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                        <ListItemPrefix>
                          <svg
                            width="4"
                            height="5"
                            viewBox="0 0 4 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              y="0.5"
                              width="4"
                              height="4"
                              rx="2"
                              fill="#94A3B8"
                            />
                          </svg>
                        </ListItemPrefix>
                        {t(
                          "MAIN.SIDEBAR.REPORT.GENERATE_REPORT_TABLE.GENERATE_REPORT_TABLE"
                        )}
                      </ListItem>
                    </Link>
                    <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                      <ListItemPrefix>
                        <svg
                          width="4"
                          height="5"
                          viewBox="0 0 4 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="4"
                            height="4"
                            rx="2"
                            fill="#94A3B8"
                          />
                        </svg>
                      </ListItemPrefix>
                      {t(
                        "MAIN.SIDEBAR.REPORT.GENERATE_FINAL_REPORT.GENERATE_FINAL_REPORT"
                      )}
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 6}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 6 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === 6}>
                  <AccordionHeader
                    onClick={() => handleOpen(6)}
                    className="border-b-0 p-3 hover:text-light-blue-700"
                  >
                    <ListItemPrefix>
                      <FontAwesomeIcon icon={faBookOpen} />{" "}
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal">
                      {t("MAIN.SIDEBAR.TRACKING.TRACKING")}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                      <ListItemPrefix>
                        <svg
                          width="4"
                          height="5"
                          viewBox="0 0 4 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="4"
                            height="4"
                            rx="2"
                            fill="#94A3B8"
                          />
                        </svg>
                      </ListItemPrefix>
                      {t("MAIN.SIDEBAR.TRACKING.TEAM.TEAM")}
                    </ListItem>
                    <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                      <ListItemPrefix>
                        <svg
                          width="4"
                          height="5"
                          viewBox="0 0 4 5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            y="0.5"
                            width="4"
                            height="4"
                            rx="2"
                            fill="#94A3B8"
                          />
                        </svg>
                      </ListItemPrefix>
                      {t("MAIN.SIDEBAR.TRACKING.CLUSTER.CLUSTER")}
                    </ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
              <Accordion
                open={open === 7}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === 7 ? "rotate-180" : ""
                    }`}
                  />
                }
              >
                {authInfo.user.userPermissions.includes('readDivision') ||
                authInfo.user.userPermissions.includes('readMonitoring') ||
                authInfo.user.userPermissions.includes('readSector') ? (
                  <ListItem className="p-0" selected={open === 7}>
                    <AccordionHeader
                      onClick={() => handleOpen(7)}
                      className="border-b-0 p-3 hover:text-light-blue-700"
                    >
                      <ListItemPrefix>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.25 2A2.25 2.25 0 0 0 2 4.25v11.5A2.25 2.25 0 0 0 4.25 18h11.5A2.25 2.25 0 0 0 18 15.75V4.25A2.25 2.25 0 0 0 15.75 2H4.25Zm4.03 6.28a.75.75 0 0 0-1.06-1.06L4.97 9.47a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 0 0 1.06-1.06L6.56 10l1.72-1.72Zm4.5-1.06a.75.75 0 1 0-1.06 1.06L13.44 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06l-2.25-2.25Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal">
                        {t("MAIN.SIDEBAR.CLUSTER.CLUSTER")}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                ) : (
                  <div></div>
                )}

                <AccordionBody className="py-1">
                  <List className="p-0">
                    {authInfo.user.userPermissions.includes('readMonitoring') ? (
                      <Link to={`/Home/Monitoring`}>
                        <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.CLUSTER.MONITORING.MONITORING")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}
                    {authInfo.user.userPermissions.includes('readSector') ? (
                      <Link to={`/Home/Sector`}>
                        <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.CLUSTER.SECTOR.SECTOR")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}

                    {authInfo.user.userPermissions.includes('readDivision') ? (
                      <Link to={`/Home/Division`}>
                        <ListItem className="hover:text-light-blue-700 focus:text-light-blue-700 active:text-light-blue-700">
                          <ListItemPrefix>
                            <svg
                              width="4"
                              height="5"
                              viewBox="0 0 4 5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="0.5"
                                width="4"
                                height="4"
                                rx="2"
                                fill="#94A3B8"
                              />
                            </svg>
                          </ListItemPrefix>
                          {t("MAIN.SIDEBAR.CLUSTER.DIVISION.DIVISION")}
                        </ListItem>
                      </Link>
                    ) : (
                      <div></div>
                    )}
                  </List>
                </AccordionBody>
              </Accordion>
            </List>
          </Card>

          <div className="grid gap-6 w-full ">
            <NavBar onSidebarToggle={handleSidebarToggle} />
            <div
              className={
                state.dashboard ? "ml-3 mr-3 h-full" : "ml-3 mr-3 h-full"
              }
              id="detail"
            >
              <div
                className={
                  isSidebarVisible
                    ? "xl:ml-80 sm:ml-0 mt-24 xl:w-3/4 md:w-1/2 relative min-h-screen"
                    : "mt-24 xl:w-3/4 xl:ml-40 sm:ml-0 relative min-h-screen"
                }
              >
                <Outlet />
              </div>
            </div>
            <div
              className={
                isSidebarVisible ? "w-3/4 xl:ml-80 sm:ml-0 " : "w-full"
              }
            >
              <div className="absolute w-3/4">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Loader
            type="spinner-default"
            bgColor={color}
            color={color}
            title={"Loading..."}
            size={100}
            // time={3s}
          />
        </div>
      )}
    </>
  );
}
export default SideBar;
