import React from "react";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <div className="ml-3">
      <footer className="flex w-full flex-row flex-wrap items-center justify-center border-t border-blue-gray-200 text-center md:justify-between h-10">
        <Typography color="blue-gray" className="font-normal ml-7">
          2024 &copy; EAII
        </Typography>
        <Typography color="blue-gray" className="font-normal mr-7">
          Design & Develop by EAII
        </Typography>
      </footer>
    </div>
  );
}
export default Footer;
