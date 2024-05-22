import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const EyeIcon = () => {
  return (
    <FontAwesomeIcon
      icon={faEyeSlash}
      className="cursor-pointer text-gray-400 hover:text-gray-600"
    />
  );
};

export default EyeIcon;
