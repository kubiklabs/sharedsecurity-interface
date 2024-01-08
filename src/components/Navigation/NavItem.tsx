import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const Navlink = ({
  name,
  iconName,
  path,
}: {
  name: string;
  iconName: string;
  path: string;
}) => {
  const location = useLocation();

  const checkPathDerivative = (basePath: string, currentPath: string) => {
    // Ensure basePath ends with a slash
    if (!basePath.endsWith("/")) {
      basePath = "/" + basePath;
    }

    // Check if the current path starts with the basePath
    return currentPath.startsWith(basePath);
  };

  const onThisPath = useMemo(
    () => checkPathDerivative(path, location.pathname),
    [location.pathname]
  );

  return (
    <Link to={`/${path}`}>
      <Flex
        borderRadius={"5px"}
        p={"10px "}
        bg={onThisPath ? "#BC3D70" : ""}
        alignItems={"center"}
        gap={"10px"}
        color="rgba(255, 255, 255)"
        transition={"ease-in-out 100ms"}
        _hover={{
          // borderBottom: "5px solid #BC3D70",
          color: onThisPath ? "white" : "#BC3D70",
          // transform: "scale(1.05)",
        }}
      >
        <span className="material-symbols-outlined">{iconName}</span>
        <Text m={"0"} fontSize={"1.2rem"} textAlign={"left"} noOfLines={1}>
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

export default Navlink;
