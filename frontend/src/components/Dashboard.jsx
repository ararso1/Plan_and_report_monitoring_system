import React from "react";
import {
  Card,
  Button,
  CardBody,
  CardFooter,
  Select,
  Option,
  Chip,
} from "@material-tailwind/react";
import ChartT from "./Chart";
import Smallcharts from "./Smallcharts";
import Graphs from "./Graphs";
import GraphsDateTime from "./Gaphsdatetime";

function Dashboard() {
  return (
    <Card className="grid gap-16 justify-center items-center w-full">
      <Card className="m-5">
        <CardBody>
          <div className="xl:flex justify-center items-center md:grid-cols-2 sm:grid  gap-6">
            <div className="grid gap-5 justify-center items-center">
              <label className="text-black font-bold">Report by Sector</label>
              <Select size="md" label="የሪፖርት ዓይነት ይምረጡ">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>

            <div className="grid gap-5 justify-center items-center">
              <label className="text-black font-bold">Report by Status </label>
              <Select size="md" label="የሪፖርት ሁኔታን ይምረጡ">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>
            <div className="grid gap-5 justify-center items-center">
              <label className="text-black font-bold">Date</label>
              <Select size="md" label="ቀን ይምረጡ">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <div></div>
            <Button className="bg-light-blue-700 hover:shadow-none shadow-none">
              አጣራ
            </Button>
          </div>
        </CardBody>
      </Card>

      <div className="xl:flex xl:gap-5 justify-center items-center md:grid md:gap-10 ">
        <div>
          <Card className="">
            <div className="grid grid-cols-2 justify-between">
              <h1 className="text-black font-bold text-center mt-3">
                First Quarter
              </h1>
              <h1 className="text-black font-bold text-center mt-3">123</h1>
              <h1 className="text-black text-center">24 hours</h1>
              <Chip
                variant="ghost"
                color="green"
                size="md"
                value="+2.5%"
                className="w-1/2 rounded-full  border border-green-700"
              />
            </div>

            <Smallcharts />
            <CardFooter>
              <h1 className="text-black text-center font-bold">
                ካለፈው ቀን በላይ ከ2 በመቶ በላይ ሪፖርት ተደርጓል
              </h1>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="">
            <div className="grid grid-cols-2 justify-between">
              <h1 className="text-black font-bold text-center mt-3">
                Second Quarter
              </h1>
              <h1 className="text-black font-bold text-center mt-3">1244</h1>
              <h1 className="text-black text-center">24 hours</h1>
              <Chip
                variant="ghost"
                color="green"
                size="md"
                value="+2.5%"
                className="w-1/2 rounded-full  border border-green-700"
              />
            </div>

            <Smallcharts />
            <CardFooter>
              <h1 className="text-black text-center font-bold">
                ካለፈው ቀን በላይ ከ2 በመቶ በላይ ሪፖርት ተደርጓል
              </h1>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="w-full">
            <div className="grid grid-cols-2 justify-between">
              <h1 className="text-black font-bold text-center mt-3">
                Third Quarter
              </h1>
              <h1 className="text-black font-bold text-center mt-3">123</h1>
              <h1 className="text-black text-center">24 hours</h1>
              <Chip
                variant="ghost"
                color="green"
                size="md"
                value="+2.5%"
                className="w-1/2 rounded-full  border border-green-700"
              />
            </div>

            <Smallcharts />
            <CardFooter>
              <h1 className="text-black text-center font-bold">
                ካለፈው ቀን በላይ ከ2 በመቶ በላይ ሪፖርት ተደርጓል
              </h1>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="">
            <div className="grid grid-cols-2 justify-between">
              <h1 className="text-black font-bold text-center mt-3">
                Fourth Quarter
              </h1>
              <h1 className="text-black font-bold text-center mt-3">905</h1>
              <h1 className="text-black text-center">24 hours</h1>
              <Chip
                variant="ghost"
                color="green"
                size="md"
                value="+2.5%"
                className="w-1/2 rounded-full  border border-green-700"
              />
            </div>

            <Smallcharts />
            <CardFooter>
              <h1 className="text-black text-center font-bold">
                ካለፈው ቀን በላይ ከ2 በመቶ በላይ ሪፖርት ተደርጓል
              </h1>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="xl:flex gap-5 w-full md:grid">
        <div className="w-full ml-3">
          <div className="flex justify-between items-center mb-5 ml-3">
            <div className="w-full">
              <h1 className="text-black font-bold ">የአመቱ ልዩነት</h1>
            </div>
            <div className="w-full">
              <Select size="md" label="በዚህ ሳምንት">
                <Option>Material Tailwind HTML</Option>
                <Option>Material Tailwind React</Option>
                <Option>Material Tailwind Vue</Option>
                <Option>Material Tailwind Angular</Option>
                <Option>Material Tailwind Svelte</Option>
              </Select>
            </div>
          </div>

          <Graphs />
        </div>
        <Card className="shadow-blue-gray-100 w-full">
          <CardBody>
            <h1 className="text-black text-lg font-bold">የተላከ ሪፖርት በቁጥር </h1>
            <ChartT />
          </CardBody>
        </Card>
      </div>
      <div className="w-full">
        <GraphsDateTime />
      </div>
    </Card>
  );
}

export default Dashboard;
