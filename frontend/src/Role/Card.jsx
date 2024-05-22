import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import Switch from "../components/Switch";
// import SmallCard from "./SmallCard";
import { Checkbox } from "@material-tailwind/react";

function CardBox() {
  //Handle select All Toggle
  const [toggledRowC, setToggledRowC] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("toggledRowA");
    if (savedState) {
      setToggledRowC(JSON.parse(savedState));
    }
  }, []);

  const handleToggle = () => {
    setToggledRowC((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggledRowA", JSON.stringify(newState));
      return newState;
    });
  };

  //Handle select one Toggle
  const [toggledRowone, setToggledRowone] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("toggledRowone");
    if (savedState) {
      setToggledRowone(JSON.parse(savedState));
    }
  }, []);

  const handleToggleone = () => {
    setToggledRowone((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggledRowone", JSON.stringify(newState));
      return newState;
    });
  };

  //Handle select two Toggle
  const [toggledRowtwo, setToggledRowtwo] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("toggledRowtwo");
    if (savedState) {
      setToggledRowtwo(JSON.parse(savedState));
    }
  }, []);

  const handleToggletwo = () => {
    setToggledRowtwo((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggledRowtwo", JSON.stringify(newState));
      return newState;
    });
  };

  //Handle select three Toggle
  const [toggledRowthree, setToggledRowthree] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("toggledRowthree");
    if (savedState) {
      setToggledRowthree(JSON.parse(savedState));
    }
  }, []);

  const handleTogglethree = () => {
    setToggledRowthree((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggledRowthree", JSON.stringify(newState));
      return newState;
    });
  };

  //Handle select four Toggle
  const [toggledRowfour, setToggledRowfour] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("toggledRowfour");
    if (savedState) {
      setToggledRowfour(JSON.parse(savedState));
    }
  }, []);

  const handleTogglefour = () => {
    setToggledRowfour((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggledRowfour", JSON.stringify(newState));
      return newState;
    });
  };

  //Handle select five Toggle
  const [toggledRowfive, setToggledRowfive] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("toggledRowfive");
    if (savedState) {
      setToggledRowfive(JSON.parse(savedState));
    }
  }, []);

  const handleTogglefive = () => {
    setToggledRowfive((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggledRowfive", JSON.stringify(newState));
      return newState;
    });
  };

  //Handle select six Toggle
  const [toggledRowsix, setToggledRowsix] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("toggledRowsix");
    if (savedState) {
      setToggledRowsix(JSON.parse(savedState));
    }
  }, []);

  const handleTogglesix = () => {
    setToggledRowsix((prevState) => {
      const newState = !prevState;
      localStorage.setItem("toggledRowsix", JSON.stringify(newState));
      return newState;
    });
  };
  return (
    <div>
      <CardHeader floated={false} shadow={false} className="rounded-none  z-20">
        <div className="flex items-center justify-between mt-2">
          <div className=" flex gap-5 text-center">
            <p className="font-bold font-sans mt-2">New Role</p>
            <div className="w-full md:w-72">
              <Input label="Name" />
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Switch isToggled={toggledRowC} onToggle={handleToggle} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="grid xl:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-3">
        {/* card one */}
        <Card className="w-full px-8">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 rounded-none text-center"
          >
            <div className="flex justify-between mt-2 font-sans font-bold text-center">
              <p className="text-xs">SETTING</p>

              <Switch
                isToggled={toggledRowC || toggledRowone}
                onToggle={handleToggleone}
              />
            </div>
          </CardHeader>
          <CardBody className="">
            <ul className="flex flex-col gap-0">
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowone}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  5 team members
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowone}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  200+ components
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowone}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  40+ built-in pages
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowone}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  1 year free updates
                </Typography>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* card two */}
        <Card className="w-full px-8">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 rounded-none text-center"
          >
            <div className="flex justify-between mt-2 font-sans font-bold text-center">
              <p className="text-xs">SETTING</p>
              <Switch
                isToggled={toggledRowC || toggledRowtwo}
                onToggle={handleToggletwo}
              />
            </div>
          </CardHeader>
          <CardBody className="">
            <ul className="flex flex-col gap-0">
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowtwo}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  5 team members
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowtwo}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  200+ components
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowtwo}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  40+ built-in pages
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowtwo}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  1 year free updates
                </Typography>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* card three */}
        <Card className="w-full px-8">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 rounded-none text-center"
          >
            <div className="flex justify-between mt-2 font-sans font-bold text-center">
              <p className="text-xs">SETTING</p>
              <Switch
                isToggled={toggledRowC || toggledRowthree}
                onToggle={handleTogglethree}
              />
            </div>
          </CardHeader>
          <CardBody className="">
            <ul className="flex flex-col gap-0">
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowthree}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  5 team members
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowthree}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  200+ components
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowthree}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  40+ built-in pages
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowthree}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  1 year free updates
                </Typography>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* card four */}

        <Card className="w-full px-8">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 rounded-none text-center"
          >
            <div className="flex justify-between mt-2 font-sans font-bold text-center">
              <p className="text-xs">SETTING</p>
              <Switch
                isToggled={toggledRowC || toggledRowfour}
                onToggle={handleTogglefour}
              />
            </div>
          </CardHeader>
          <CardBody className="">
            <ul className="flex flex-col gap-0">
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfour}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  5 team members
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfour}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  200+ components
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfour}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  40+ built-in pages
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfour}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  1 year free updates
                </Typography>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* card five */}
        <Card className="w-full px-8">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 rounded-none text-center"
          >
            <div className="flex justify-between mt-2 font-sans font-bold text-center">
              <p className="text-xs">SETTING</p>
              <Switch
                isToggled={toggledRowC || toggledRowfive}
                onToggle={handleTogglefive}
              />
            </div>
          </CardHeader>
          <CardBody className="">
            <ul className="flex flex-col gap-0">
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfive}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  5 team members
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfive}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  200+ components
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfive}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  40+ built-in pages
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowfive}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  1 year free updates
                </Typography>
              </li>
            </ul>
          </CardBody>
        </Card>

        {/* card six */}
        <Card className="w-full px-8">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 rounded-none text-center"
          >
            <div className="flex justify-between mt-2 font-sans font-bold text-center">
              <p className="text-xs">SETTING</p>
              <Switch
                isToggled={toggledRowC || toggledRowsix}
                onToggle={handleTogglesix}
              />
            </div>
          </CardHeader>
          <CardBody className="">
            <ul className="flex flex-col gap-0">
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowsix}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  5 team members
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowsix}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  200+ components
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowsix}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  40+ built-in pages
                </Typography>
              </li>
              <li className="flex items-center h-8">
                <span className="">
                  <Checkbox
                    checked={toggledRowC || toggledRowsix}
                    color="blue"
                  />
                </span>
                <Typography className="font-sans font-bold text-xs">
                  1 year free updates
                </Typography>
              </li>
            </ul>
          </CardBody>
        </Card>
      </CardBody>
      <CardFooter className="flex items-center  justify-between p-0 mb-2 mr-6">
        <div></div>
        <div className="">
          <Button
            variant="text"
            size="sm"
            className="bg-blue-700 hover:bg-blue-700 focus:bg-blue-700 text-white normal-case"
          >
            Save
          </Button>
        </div>
      </CardFooter>
    </div>
  );
}
export default CardBox;
