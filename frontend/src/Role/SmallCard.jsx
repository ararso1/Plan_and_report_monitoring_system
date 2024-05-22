import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Switch from "../components/Switch";
import { Checkbox } from "@material-tailwind/react";

function SmallCard({ Ontouch }) {
  return (
    <Card className="w-full px-8">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 rounded-none text-center"
      >
        <div className="flex justify-between mt-2 font-sans font-bold text-center">
          <p className="text-xs">SETTING</p>

          <Switch />
        </div>
      </CardHeader>
      <CardBody className="">
        <ul className="flex flex-col gap-0">
          <li className="flex items-center h-8">
            <span className="">
              <Checkbox color="blue" />
            </span>
            <Typography className="font-sans font-bold text-xs">
              5 team members
            </Typography>
          </li>
          <li className="flex items-center h-8">
            <span className="">
              <Checkbox color="blue" />
            </span>
            <Typography className="font-sans font-bold text-xs">
              200+ components
            </Typography>
          </li>
          <li className="flex items-center h-8">
            <span className="">
              <Checkbox color="blue" />
            </span>
            <Typography className="font-sans font-bold text-xs">
              40+ built-in pages
            </Typography>
          </li>
          <li className="flex items-center h-8">
            <span className="">
              <Checkbox color="blue" />
            </span>
            <Typography className="font-sans font-bold text-xs">
              1 year free updates
            </Typography>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
export default SmallCard;
