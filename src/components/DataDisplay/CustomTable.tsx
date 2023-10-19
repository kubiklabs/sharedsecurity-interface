import {
  Grid,
  GridItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import ColorTag from "./ColorTag";
import { commonTagColorMap } from "../../utils/constant";

const CustomTable = ({ data, keys }: any) => {
  return (
    <TableContainer textAlign={"left"}>
      <Table width={"100%"}>
        {/* <TableCaption>Data fetched from different chains</TableCaption> */}
        <Thead fontSize={"1.2rem"}>
          <Tr mb={"20px"}>
            {keys?.map((item: string) => {
              return (
                <Th
                  px={"20px"}
                  py={"10px"}
                  borderLeft={"1px solid"}
                  borderColor={"gray"}
                  key={item}
                  borderBottom={"none"}
                  color={"white"}
                >
                  {item}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody gap={"20px"}>
          {data?.map((item: any) => {
            return (
              <Tr borderTop={"1px solid gray"}>
                {item &&
                  Object.values(item)?.map((value: any) => {
                    return (
                      <Td
                        px={"25px"}
                        py={"10px"}
                        border={"none"}
                        width={"fit-content"}
                      >
                        <Grid
                          p={"15px"}
                          columnGap={"50px"}
                          gridTemplateColumns={
                            "repeat(auto-fit, minmax(100px, 200px))"
                          }
                        >
                          {typeof value === "object"
                            ? value.map((tag: string) => {
                                return (
                                  <GridItem>
                                    <ColorTag
                                      sx={{ m: "5px" }}
                                      bgColor={
                                        commonTagColorMap[
                                          tag as keyof typeof commonTagColorMap
                                        ]
                                          ? commonTagColorMap[
                                              tag as keyof typeof commonTagColorMap
                                            ]
                                          : "#812CD6"
                                      }
                                      content={tag}
                                    />
                                  </GridItem>
                                );
                              })
                            : typeof value === "number"
                            ? `$ ${value.toLocaleString()}`
                            : value}
                        </Grid>
                      </Td>
                    );
                  })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
