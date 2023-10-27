import { Flex } from "@chakra-ui/react";
import React from "react";
import ColorTag from "../ColorTag";
import { commonTagColorMap } from "../../../utils/constant";

const TableTagGroup = ({ data }: { data: string[] }) => {
  return (
    <Flex columnGap={"20px"} rowGap={"10px"} flexWrap={"wrap"} py={"3px"}>
      {data.map((tag: string) => {
        return (
          <ColorTag
            sx={{
              m: "5px",
              wordBreak: "break-word",
              textAlign: "center",
            }}
            bgColor={
              commonTagColorMap[tag as keyof typeof commonTagColorMap]
                ? commonTagColorMap[tag as keyof typeof commonTagColorMap]
                : "#812CD6"
            }
            content={tag}
          />
        );
      })}
    </Flex>
  );
};

export default TableTagGroup;
