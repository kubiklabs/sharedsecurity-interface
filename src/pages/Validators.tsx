import { Box } from "@chakra-ui/react";
import React from "react";
import ValidatorsList from "../components/Validators/ValidatorList";

const Validators = () => {
  return (
    <Box>
      <Box
        flexDirection={"column"}
        position={"relative"}
        display={"flex"}
        gap={"50px"}
      >
        <ValidatorsList />
      </Box>
    </Box>
  );
};

export default Validators;
