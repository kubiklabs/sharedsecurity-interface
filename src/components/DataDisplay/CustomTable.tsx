import {
  ChakraBaseProvider,
  ChakraProvider,
  Grid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import ColorTag from "./ColorTag";

const CustomTable = ({ data, keys }: any) => {
  return (
    <TableContainer textAlign={"left"}>
      <Table width={"100%"}>
        {/* <TableCaption>Data fetched from different chains</TableCaption> */}
        <Thead fontSize={"1.2rem"}>
          <Tr>
            {keys?.map((item: string) => {
              return (
                <Th
                  px={"20px"}
                  py={"10px"}
                  borderRight={"1px solid"}
                  key={item}
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
              <Tr>
                {item &&
                  Object.values(item)?.map((value: any) => {
                    return (
                      <Td px={"25px"} py={"10px"} borderRight={"1px solid"}>
                        <Grid
                          p={"15px"}
                          gap={"10px"}
                          gridTemplateColumns={
                            "repeat(auto-fit, minmax(80px, 1fr))"
                          }
                        >
                          {typeof value === "object"
                            ? value.map((tag: string) => {
                                return (
                                  <ColorTag
                                    sx={{ m: "5px" }}
                                    bgColor="#812CD6"
                                    content={tag}
                                  />
                                );
                              })
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
