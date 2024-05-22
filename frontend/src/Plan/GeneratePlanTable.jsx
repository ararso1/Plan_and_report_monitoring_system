import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  // addNewSector,
  fetchSectorgData,
} from "../reduxToolKit/slices/sectorSlice";

import { fetchDivisionData } from "../reduxToolKit/slices/divisionSlice";
import axiosInistance from "../GlobalContexts/Base_url";

import {
  Card,
  Button,
  CardBody,
  Select,
  Option,
} from "@material-tailwind/react";

import { useTranslation } from "react-i18next";
function GeneratePlanTable() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  //fetch sector data

  const { sectorData } = useSelector((state) => state.sector);
  useEffect(() => {
    dispatch(fetchSectorgData());
  }, []);

  //fetch division data
  const { divisionData } = useSelector((state) => state.division);
  useEffect(() => {
    dispatch(fetchDivisionData());
  }, []);

  //fetch table data
  const [data, setData] = useState("");
  const fetchData = async () => {
    const token = localStorage.getItem("access");
    try {
      const response = await axiosInistance.get("/planApp/table-data/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);

  const currentYear = new Date().getFullYear() + 1;
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => 1900 + index
  );

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event));
    // Do something with the selected year
  };

  return (
    <>
      <div className="grid gap-3 items-center">
        <h1 className="whitespace-nowrap text-left text-xl font-bold text-black">
          {t("MAIN.SIDEBAR.PLAN.GENERATE_PLAN_TABLE.TITLE")}
        </h1>
        <Card className="rounded-md">
          <div className="ml-6 mt-5"></div>
          <CardBody className="xl:flex md:grid items-center xl:gap-10 sm:gap-5">
            <div className="grid gap-2">
              <h1 className="whitespace-nowrap text-left text-md font-bold text-black">
                {t("MAIN.TABLE.YEAR")}
              </h1>
              <Select
                label={t("MAIN.TABLE.SELECT_YEAR")}
                value={selectedYear}
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <Option
                    className="focus:text-light-blue-700 whitespace-nowrap text-left text-md font-medium text-black"
                    key={year}
                    value={year}
                  >
                    {year}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="grid gap-2">
              <h1 className="whitespace-nowrap text-left text-md font-bold text-black">
                {t("MAIN.TABLE.QUARTER")}
              </h1>
              <Select label={t("MAIN.TABLE.SELECT_QUARTER")}>
                <Option
                  value="Male"
                  className="focus:text-light-blue-700 whitespace-nowrap text-left text-md font-medium text-black"
                >
                  {t("MAIN.TABLE.FIRST_QUARTER")}
                </Option>
                <Option
                  value="Female"
                  className="focus:text-light-blue-700 whitespace-nowrap text-left text-md font-medium text-black"
                >
                  {t("MAIN.TABLE.SECOND_QUARTER")}
                </Option>
                <Option
                  value="Male"
                  className="focus:text-light-blue-700 whitespace-nowrap text-left text-md font-medium text-black"
                >
                  {t("MAIN.TABLE.THIRD_QUARTER")}
                </Option>
                <Option
                  value="Female"
                  className="focus:text-light-blue-700 whitespace-nowrap text-left text-md font-medium text-black"
                >
                  {t("MAIN.TABLE.FOURTH_QUARTER")}
                </Option>
              </Select>
            </div>
            <div className="grid gap-2">
              <h1 className="whitespace-nowrap text-left text-md font-bold text-black">
                {t("MAIN.TABLE.SECTOR")}
              </h1>
              <Select label={t("MAIN.TABLE.SELECT_SECTOR")}>
                {sectorData
                  ? sectorData.map((sector) => (
                      <Option
                        key={sector.id}
                        className="focus:text-light-blue-700 whitespace-nowrap text-left text-md font-medium text-black"
                      >
                        {sector.name}
                      </Option>
                    ))
                  : []}
              </Select>
            </div>
            <div className="grid gap-2">
              <h1 className="whitespace-nowrap text-left text-md font-bold text-black">
                {t("MAIN.TABLE.DIVISION")}
              </h1>
              <Select label={t("MAIN.TABLE.SELECT_DIVISION")}>
                {divisionData
                  ? divisionData.map((division) => (
                      <Option
                        key={division.id}
                        className="focus:text-light-blue-700 whitespace-nowrap text-left text-md font-medium text-black"
                      >
                        {division.name}
                      </Option>
                    ))
                  : []}
              </Select>
            </div>
          </CardBody>
          <div className="flex justify-end mb-5 mr-12">
            <Button
              variant="text"
              size="md"
              className="flex items-center gap-1 hover:bg-blue-700 bg-blue-700 text-white focus:bg-blue-700 normal-case whitespace-nowrap text-left text-sm font-bold"
            >
              {t("MAIN.TABLE.FILTER")}
            </Button>
          </div>
        </Card>

        <Card className=" rounded-md">
          <CardBody>
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-bold text-black  tracking-wider"
                  >
                    {t("MAIN.TABLE.NO")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-bold text-black  tracking-wider"
                  >
                    {t("MAIN.TABLE.STRATEGIC_GOAL_MAIN_GOAL_AND_KPI")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-bold text-black  tracking-wider"
                  >
                    {t("MAIN.TABLE.WEIGHT")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left  text-md font-bold text-black  tracking-wider"
                  >
                    {t("MAIN.TABLE.MEASURE")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-bold text-black  tracking-wider"
                  >
                    {t("MAIN.TABLE.LAST_YEAR_PERFORMANCE")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-bold text-black  tracking-wider"
                  >
                    {t("MAIN.TABLE.NEXT_YEAR_GOAL")}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-md font-bold text-black  tracking-wider grid justify-center"
                  >
                    <th className="border-b border-gray-300 flex justify-center">
                      {t("MAIN.TABLE.QUARTER")}
                    </th>
                    <div className="flex justify-center gap-10">
                      <th> {t("MAIN.TABLE.FIRST_QUARTER")}</th>
                      <th> {t("MAIN.TABLE.SECOND_QUARTER")}</th>
                      <th> {t("MAIN.TABLE.THIRD_QUARTER")}</th>
                      <th>{t("MAIN.TABLE.FOURTH_QUARTER")} </th>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data &&
                  data.map((strategicGoal, index) => (
                    <React.Fragment key={strategicGoal.id}>
                      <tr className="bg-green-100">
                        <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black">
                          {++index}
                        </td>

                        <td className="px-3 py-4 whitespace-nowrap text-left text-sm font-bold text-gray-900">
                          {strategicGoal.strategic_goal_name}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black"></td>
                        <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black"></td>
                        <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black"></td>
                        <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black"></td>

                        <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black  flex gap-8 justify-center"></td>
                      </tr>
                      {strategicGoal.main_goals.map((mainGoal, mainIndex) => (
                        <React.Fragment key={mainGoal.id}>
                          <tr className="bg-gray-300">
                            <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black">
                              {index}.{++mainIndex}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-left pl-4 text-md font-bold text-black border-l border-gray-200">
                              {mainGoal.main_goal_name}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black"></td>
                            <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black"></td>
                            <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black"></td>
                            <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black"></td>
                            <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black"></td>
                          </tr>
                          {mainGoal.kpis.map((kpi, kpiIndex) => (
                            <tr key={kpi.id} className="bg-white">
                              <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black">
                                {index}.{mainIndex}.{++kpiIndex}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-left pl-4 text-sm font-bold text-black">
                                {kpi.kpi_name}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black">
                                {kpi.weight}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black">
                                {kpi.measure ? kpi.measure.measure_name : "-"}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black">
                                {kpi.initial}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-left text-md text-black">
                                -
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-left text-md font-bold text-black  flex gap-10 justify-center">
                                <td> {kpi.first_quarter_plan}</td>
                                <td> {kpi.second_quarter_plan}</td>
                                <td> {kpi.third_quarter_plan}</td>
                                <td> {kpi.fourth_quarter_plan}</td>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default GeneratePlanTable;
