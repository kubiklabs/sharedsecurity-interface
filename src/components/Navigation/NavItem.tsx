import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navlink = ({
  name,
  iconName,
  path,
}: {
  name: string;
  iconName: string;
  path: string;
}) => {
  return (
    <Link to={`/${path}`}>
      <Flex alignItems={"center"} gap={"10px"}>
        <span className="material-symbols-outlined">{iconName}</span>
        <Text fontSize={"1.2rem"}>{name}</Text>
      </Flex>
    </Link>
  );
};

export default Navlink;
