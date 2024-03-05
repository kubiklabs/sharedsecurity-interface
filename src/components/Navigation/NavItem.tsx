/* eslint-disable react-hooks/exhaustive-deps */

import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
// import { Link, useLocation } from "react-router-dom";

const Navlink = ({
  name,
  iconName,
  path,
}: {
  name: string;
  iconName?: string;
  path: string;
}) => {
  // const location = useLocation();
  const router = useRouter();
  const { pathname } = router;
  

  const checkPathDerivative = (basePath: string, currentPath: string) => {
    // Ensure basePath ends with a slash
    if (!basePath.endsWith("/")) {
      basePath = "/" + basePath;
    }

    // Check if the current path starts with the basePath
    return currentPath.startsWith(basePath);
  };

  const onThisPath = useMemo(
    () => checkPathDerivative(path, pathname),
    [pathname]
  );

  return (
    <Link href={`/${path}`}>
      <Flex
        borderRadius={"1px"}
        p={"2px "}
        // bg={onThisPath ? "#BC3D70" : ""}
        borderBottom={onThisPath ? "2px solid #BC3D70" : ""}
        alignItems={"center"}
        gap={"10px"}
        color="#F2F2F2"
        // transition={"ease-in-out 100ms"}
        _hover={{
          // borderBottom: "5px solid #BC3D70",
          color: onThisPath ? "white" : "#BC3D70",
          transform: "scale(1.05)",
        }}
      >
       {iconName && <span className="material-symbols-outlined">{iconName}</span>}
        <Text m={"0"} fontSize={"1.2rem"} textAlign={"left"} noOfLines={1}>
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

export default Navlink;
