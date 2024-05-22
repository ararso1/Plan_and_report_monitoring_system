import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

function Confirmation() {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
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
      </PopoverHandler>
      <PopoverContent className="w-1/5 bg-blue-gray-50 drop-shadow-2xl">
        <Typography className="mb-6 text-center">Are You sure</Typography>

        <div className="flex gap-10 justify-center items-center">
          <Button
            variant="text"
            size="sm"
            className="hover:bg-light-blue-700 text-white bg-light-blue-700"
            onClick={() => handleOpenModalt()}
          >
            Cancel
          </Button>

          <Button
            variant="text"
            size="sm"
            className="hover:bg-red-900 text-white bg-red-900"
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default Confirmation;
