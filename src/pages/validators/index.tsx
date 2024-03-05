import { Box } from "@chakra-ui/react";
import React from "react";
import ValidatorsList from "@/components/Validators/ValidatorList";
import ChainValidatorsGraph from "@/components/Validators/ChainValidatorsGraph";
import BrowserTitle from "@/components/BrowserTitle/BrowserTitle";

const Validators = () => {
  return (
    <>
    <BrowserTitle title="Validators" />
    <Box>
      <Box
        flexDirection={"column"}
        position={"relative"}
        display={"flex"}
        gap={"50px"}
      >
        <ValidatorsList />
        <ChainValidatorsGraph />
      </Box>
    </Box>
    </>
  );
};

export default Validators;
