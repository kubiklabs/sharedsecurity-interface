import {
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
    console.log(
      `User requested page number ${page}, which is offset ${newOffset}`
    );

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
                  width={"200px"}
                  py={"30px"}
                  key={item}
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
                            <Link target="_blank" href={value.url}>
                              {value.label}
                            </Link>
                          ) : value.type === "PATH" ? (
                            <PathLink to={value.url}>{value.label}</PathLink>
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
