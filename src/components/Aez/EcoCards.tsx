import {
  Button,
  Card,
  CardFooter,
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

const EcoCards = ({ data, key }: any) => {
  const [isLargerThan] = useMediaQuery("(min-width: 1424px)");

  return (
    <Card
      bgImage={`url(${data?.url})`}
      bgSize="cover"
      bgPosition="center"
      borderRadius="lg"
      color="white"
      boxShadow="lg"
      position="relative"
      width={isLargerThan ? "287px" : "250px"}
      height={isLargerThan ? "250px" : "235px"}
      // You can adjust the height as needed
    >
      <Flex direction="column" height="100%" justifyContent="space-between">
        <Flex gap="10px" p="10px" justifyContent="end">
          <Button
            height="20px"
            alignItems="center"
            _hover={{ textDecoration: "none" }}
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
            _hover={{ textDecoration: "none" }}
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
          height="fit-content"
          width="100%"
          left="0"
          backgroundColor="#1e1a2599"
          alignItems="center"
          flexDirection={"column"}
          padding={"10px"}
        >
          <Text
            fontWeight={400}
            fontSize="14px"
            color="#c7c7c7"
            letterSpacing={"1px"}
          >
            {data?.name?.toUpperCase()}
          </Text>
          <Flex alignItems={"center"} gap={"10px"}>
            <Text fontSize="14px">TVL : </Text>
            <Text
              fontWeight={400}
              fontSize="16px"
              color="#fff"
              display={"flex"}
            >
              $ {data?.tvl?.toLocaleString()}
            </Text>
          </Flex>
        </CardFooter>
      </Flex>
    </Card>
  );
};

export default EcoCards;
