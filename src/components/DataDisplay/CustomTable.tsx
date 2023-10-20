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
import {
  commonTagColorMap,
  scrollbarStyle,
  thinScrollbarStyle,
} from "../../utils/constant";

const CustomTable = ({
  data,
  keys,
  minGridWidth,
  maxGridWidth,
  gridColumnGap,
}: any) => {
  return (
    <TableContainer textAlign={"left"}>
      <Table width={"100%"} fontSize={"lg"}>
        {/* <TableCaption>Data fetched from different chains</TableCaption> */}
        <Thead fontSize={"1.2rem"}>
          <Tr>
            {keys?.map((item: string) => {
              return (
                <Th
                  width={"200px"}
                  px={"20px"}
                  py={"20px"}
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
        <Tbody>
          {data?.map((item: any) => {
            return (
              <Tr
                // borderTop={"1px solid gray"}
                borderBottom={"1px solid rgba(255, 255, 255, 0.40)"}
              >
                {item &&
                  Object.values(item)?.map((value: any) => {
                    return (
                      <Td py={"10px"} border={"none"}>
                        {typeof value === "object" ? (
                          <Grid
                            // overflowX={"auto"}
                            // sx={thinScrollbarStyle}
                            py={"3px"}
                            columnGap={gridColumnGap || "10px"}
                            gridTemplateColumns={`repeat(auto-fit, minmax(${
                              minGridWidth || "100px"
                            }, ${maxGridWidth || "1fr"}))`}
                          >
                            {value.map((tag: string) => {
                              return (
                                <GridItem width={"fit-content"}>
                                  <ColorTag
                                    sx={{
                                      m: "5px",
                                      wordBreak: "break-word",
                                      width: "100%",
                                      textAlign: "center",
                                    }}
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
                            })}
                          </Grid>
                        ) : typeof value === "number" ? (
                          `$ ${value.toLocaleString()}`
                        ) : (
                          value
                        )}
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
