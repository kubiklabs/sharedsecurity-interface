import {
  Avatar,
  Flex,
  Grid,
  GridItem,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ColorTag from "./ColorTag";
import {
  commonTagColorMap,
  scrollbarStyle,
  thinScrollbarStyle,
} from "../../utils/constant";
import { Link as PathLink } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import TableTagGroup from "./table-helpers/TableTagGroup";

const CustomTable = ({
  data,
  keys,
  totalValue,
  minGridWidth,
  maxGridWidth,
  gridColumnGap,
  itemsPerPage = 10,
  pagination,
}: any) => {
  const currentPage = useRef(1);
  const totalPages = useRef(Math.ceil(data?.length / itemsPerPage) || 0);
  const [currentItems, setCurrentItems] = useState(data);

  useEffect(() => {
    if (!pagination) return;
    setCurrentItems(data.slice(0, itemsPerPage));
    totalPages.current = Math.ceil(data?.length / itemsPerPage) || 0;
  }, [data]);

  const handlePageClick = (page: number) => {
    currentPage.current = page;
    const newOffset = ((page - 1) * itemsPerPage) % data.length;

    const endOffset = newOffset + itemsPerPage;
    const currentItems = data.slice(newOffset, endOffset);
    setCurrentItems(currentItems);
  };
  return (
    <TableContainer textAlign={"left"}>
      <Table width={"100%"} fontSize={"lg"}>
        {/* <TableCaption>Data fetched from different chains</TableCaption> */}
        <Thead fontSize={"1.2rem"}>
          <Tr>
            {keys?.map((item: string) => {
              return (
                <Th
                  key={item}
                  width={"200px"}
                  pb={"30px"}
                  borderBottom={"1px solid"}
                  borderColor={"gray.400"}
                  color={"gray"}
                  pl={"0"}
                >
                  <Text
                    borderLeft={"1px solid"}
                    borderColor={"gray"}
                    py={"10px"}
                    px={"20px"}
                    width={"100%"}
                  >
                    {item}
                  </Text>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {currentItems?.map((item: any) => {
            return (
              <Tr
                // borderTop={"1px solid gray"}
                borderBottom={"1px solid rgba(255, 255, 255, 0.15)"}
              >
                {item &&
                  Object.values(item)?.map((value: any) => {
                    return (
                      <Td py={"15px"} border={"none"}>
                        {typeof value === "object" ? (
                          value.type === "tags" ? (
                            <TableTagGroup data={value.data} />
                          ) : value.type === "LINK" ? (
                            <Link
                              textDecoration={"underline"}
                              target="_blank"
                              href={value.url}
                            >
                              {value.label}
                            </Link>
                          ) : value.type === "PATH" ? (
                            <PathLink
                              style={{ textDecoration: "underline" }}
                              to={value.url}
                            >
                              {value.label}
                            </PathLink>
                          ) : value.type === "avatar" ? (
                            <Flex alignItems={"center"} gap={"15px"}>
                              <Avatar
                                name={value.label}
                                size={"sm"}
                                src={value.url}
                              />
                              {value.label}
                            </Flex>
                          ) : (
                            ""
                          )
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
          
          <Tr>
          {totalValue && <Td py={"15px"} border={"none"} fontWeight="bold" borderTop={"1px solid"} fontSize={20}>
            Total
          </Td>}
          {keys?.slice(1).map((key: string, index: number) => {
            return (
              totalValue && <Td
                key={index}
                py={"15px"}
                border={"none"}
                borderTop={"1px solid"} 
                fontWeight="bold"
              >
                $ {typeof totalValue === "number" ? `$ ${totalValue.toLocaleString()}` : totalValue}
              </Td>
            );
          })}
        </Tr>

        </Tbody>
      </Table>
      {totalPages && pagination && (
        <Pagination
          currentPage={currentPage.current}
          totalPages={totalPages.current}
          onPageChange={handlePageClick}
          alignSelf={"flex-end"}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
