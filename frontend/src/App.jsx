import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Roletable from "./Role/Rolet";
import AssignRole from "./Role/AssignRole";
import MailGoal from "./Plan/MailGoal";
import Kpi from "./Plan/Kpi";
import GeneratePlanTable from "./Plan/GeneratePlanTable";
import GenerateReportTable from "./Report/GenerateReportTable"
// import DefaultTable from "./newtable";
import MessageScreen from "./Chats/Chat";
import ChatScreen from "./Chats/ChatScreen";
import SideBar from "./components/SideBar";
import Signin from "./Sign/Signin";
import ForgetPassword from "./Sign/ForgetPassword";
import ErrorPage from "./components/ErrorPage";
import Strategictable from "./Plan/Strategict";
import Table from "./components/Table";
import Dashboard from "./components/Dashboard";
import ChartT from "./components/Chart";
import Smallcharts from "./components/Smallcharts";
import Graphs from "./components/Graphs";
import GraphsDateTime from "./components/Gaphsdatetime";
import Monitoring from "./Cluster/Monitoring";
import Division from "./Cluster/Division";
import Sector from "./Cluster/Sector";
import Admin from "./components/Admin";
import Summary from "./Report/Summary";
import KpiDescription from "./Report/KpiDescription";
import Measure from "./Report/Measure";
import ModalDialogScrollable from "./components/ModalDialogScrollable";

import MyProfile from "./components/MyProfile";

import Setting from "./components/Setting";

import { LongDialog } from "./try/longDialog";

import ExampleDate from "./components/ExampleDate";

const token = localStorage.getItem("access");

const router = createBrowserRouter([
  {
    path: "/LongDialog",
    element: <LongDialog />,
  },

  {
    path: "/ExampleDate",
    element: <ExampleDate />,
  },
  {
    path: "/ForgetPassword",
    element: <ForgetPassword />,
  },
  {
    path: "/ModalDialogScrollable",
    element: <ModalDialogScrollable />,
  },

  {
    path: "/GraphsDateTime",
    element: <GraphsDateTime />,
  },
  {
    path: "/Graphs",
    element: <Graphs />,
  },
  {
    path: "/Smallcharts",
    element: <Smallcharts />,
  },
  {
    path: "/Chart",
    element: <ChartT />,
  },

  {
    path: "/",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Home",
    // access && userRole==='Admin'? <Edit />: <login/>,
    element: token ? <SideBar /> : <Signin />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/Home/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Home/MyProfile",
        element: <MyProfile />,
      },
      {
        path: "/Home/Setting",
        element: <Setting />,
      },
      {
        path: "/Home/Admin",
        element: <Admin />,
      },
      {
        path: "/Home/Role",
        element: <Roletable />,
      },

      {
        path: "/Home/AssignRole",
        element: <AssignRole />,
      },
      {
        path: "/Home/StrategicGoal",
        element: <Strategictable />,
      },
      {
        path: "/Home/MainGoal",
        element: <MailGoal />,
      },
      {
        path: "/Home/Kpi",
        element: <Kpi />,
      },
      {
        path: "/Home/GeneratePlanTable",
        element: <GeneratePlanTable />,
      },
      {
        path: "/Home/GenerateReportTable",
        element: <GenerateReportTable />,
      },
      {
        path: "/Home/User",
        element: <Table />,
      },
      {
        path: "/Home/Monitoring",
        element: <Monitoring />,
      },
      {
        path: "/Home/Sector",
        element: <Sector />,
      },
      {
        path: "/Home/Division",
        element: <Division />,
      },
      {
        path: "/Home/Summary",
        element: <Summary />,
      },
      {
        path: "/Home/KpiDescription",
        element: <KpiDescription />,
      },
      {
        path: "/Home/Measure",
        element: <Measure />,
      },
    ],
  },

  // {
  //   path: "/DefaultTable",
  //   element: <DefaultTable />,
  // },
  {
    path: "/MessageScreen",
    element: <MessageScreen />,
  },
  {
    path: "/ChatScreen",
    element: <ChatScreen />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
