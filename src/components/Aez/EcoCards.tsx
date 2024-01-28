// Card.js
import React from "react";
import {
  Button,
  Card,
  CardFooter,
  Flex,
  Text,
} from "@chakra-ui/react";

const EcoCards = ({ data, key }: any) => {
  // console.log(data);

  return (
    <Card
      bgImage={`url(${data?.url})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="lg"
      color="white"
      boxShadow="lg"
      position="relative"
      width="287px"
      height="250px" // You can adjust the height as needed
    >
      <Flex direction="column" height="100%" justifyContent="space-between">
        <Flex gap="10px" p="10px" justifyContent="end">
          <Button
            height="20px"
            alignItems="center"
            _hover="none"
            borderRadius="4px"
            color="#fff"
            fontSize="12px"
            fontWeight={400}
            backgroundColor={
              data?.tags?.data[0] === "Neutron" ? "#0f73ed" : "#e60079"
            }
          >
            {data?.tags?.data[0]}
          </Button>
          <Button
            height="20px"
            alignItems="center"
            _hover="none"
            borderRadius="4px"
            backgroundColor={
              data?.tags?.data[1] === "Dexes"
                ? "#9a386c"
                : data?.tags?.data[1] === "Lending"
                ? "#3f389a"
                : data?.tags?.data[1] === "Defi"
                ? "#3d9be4"
                : "#389a71"
            }
            color="#fff"
            fontSize="12px"
            fontWeight={400}
          >
            {data?.tags?.data[1]}
          </Button>
        </Flex>

        <CardFooter
          px={"15px"}
          height="50px"
          width="100%"
          left="0"
          backgroundColor="#1e1a2599"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontWeight={400} fontSize="16px" color="#fff">
            {data?.name?.toUpperCase()}
          </Text>
          <Text fontWeight={400} fontSize="10px" color="#fff" display={"flex"}>
            TVL - $ {data?.tvl?.toLocaleString()}
          </Text>
        </CardFooter>
      </Flex>
    </Card>
  );
};

export default EcoCards;
