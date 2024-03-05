/* eslint-disable react-hooks/exhaustive-deps */

import {
  Avatar,
  Flex,
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
import {
  validatorKeys,
  ValidatorKeys,
} from "@/utils/constant";
import { Link } from '@chakra-ui/next-js'
// import { Link as PathLink, useLocation } from "react-router-dom";
import Pagination from "@/components/Pagination/Pagination";
import TableTagGroup from "@/components/DataDisplay/table-helpers/TableTagGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { usePathname } from 'next/navigation'

const CustomTable = ({
  data,
  keys,
  totalValue,
  itemsPerPage = 10,
  pagination,
  overflow,
  totalAmount,
}: any) => {
  const currentPage = useRef(1);
  const totalPages = useRef(Math.ceil(data?.length / itemsPerPage) || 0);
  const [currentItems, setCurrentItems] = useState(data);
  const currentPath = usePathname();
  const totals = [totalValue, totalAmount];

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

  if (keys[0] === validatorKeys[0]) {
    keys = [...keys, "UpTime"];
  }
  // console.log(currentItems);
  //console.log(keys);
  return (
    <TableContainer
      textAlign={"left"}
      overflowX={overflow ? "clip" : undefined}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Table width={"100%"} fontSize={"lg"}>
        {/* <TableCaption>Data fetched from different chains</TableCaption> */}
        <Thead fontSize={"24px"}>
          <Tr>
            {keys?.map((item: string) => {
              if (item === "Prop Date") return;
              if (item === "Tags") return;
              if (item === "Date") return;
              //if (item === "UpTime") return;
              return (
                <Th
                  key={item}
                  width={"200px"}
                  borderBottom={"1px solid"}
                  borderColor={"gray.400"}
                  pl={
                    currentPath === "/aez"
                      ? "10px"
                      : currentPath === "/validators"
                        ? "20px"
                        : 0
                  }
                  color={"#D9D9D9"}
                  fontSize={"20px"}
                >
                  <Text
                    // borderLeft={"1px solid"}
                    // borderColor={"gray"}
                    py={"10px"}
                    px={"4px"}
                    width={"100%"}
                    textTransform={"capitalize"}
                    fontWeight={500}
                    fontFamily={"Alata, sans-serif"}
                  >
                    {item.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}{" "}
                    {(item === "Forum Date" ||
                      ValidatorKeys.includes(item)) && (
                        <FontAwesomeIcon
                          icon={faCaretDown}
                          height="7px"
                          width="10px"
                        />
                      )}
                  </Text>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {currentItems?.map((item: any, index: number) => {
            //  console.log(item);

            return (
              <Tr
                key={index}
                borderBottom={"1px solid rgba(255, 255, 255, 0.15)"}
              >
                {item &&
                  Object.values(item)?.map((value: any, index: number) => {
                    // console.log(item);

                    if (value === item["Prop Date"]) return; // to not show the Prop Date in Consumer chains table
                    if (keys[3] === "Twitter Space") {
                      if (value?.data?.length === 1) return; // to not show hash tags in community/agora calls
                    }
                    if (value === item.Date) return; // to not show date in community calls
                    if (value === item.url) return; // type data url added in Ecosystem to not show it

                    return (
                      <Td
                        key={index}
                        py={"15px"}
                        border={"none"}
                        fontSize={"16px"}
                        px={"4px"}
                      >
                        {typeof value === "object" ? (
                          value.type === "tags" ? (
                            <TableTagGroup data={value.data} tagToShow={0} /> // to show only 1 tag in Status consumer chain
                          ) : value.type === "LINK" ? (
                            <Link
                              textDecoration={"underline"}
                              target="_blank"
                              href={value.url}
                              pl={currentPath === "/aez" ? "10px" : 0}
                            >
                              {value.type === "LINK"
                                ? value.label
                                : value.label}
                            </Link>
                          ) : value.type === "PATH" ? (
                            value.label !== "-" ? (
                              <Link
                                style={{
                                  textDecoration: "underline",
                                  paddingLeft: `${currentPath === "/aez" ? "10px" : 0
                                    }`,
                                }}
                                href={value.url}
                              >
                                Proposal #{value.label}
                              </Link>
                            ) : (
                              <Text
                                justifyContent={"center"}
                                alignItems={"center"}
                                pb={"12px"}
                                style={{
                                  paddingLeft: `${currentPath === "/aez" ? "55px" : 0
                                    }`,
                                }}
                              >
                                _
                              </Text>
                            )
                          ) : value.type === "avatarWithText" ||
                            value.type === "avatar" ? (
                            <Flex alignItems={"center"} gap={"15px"}>
                              <Avatar
                                name={value.label}
                                size={"sm"}
                                src={
                                  value.type === "avatarWithText"
                                    ? value.avatarUrl
                                    : value.url
                                }
                              />
                              {value.label}
                            </Flex>
                          ) : (
                            "-"
                          )
                        ) : typeof value === "number" ? (
                          currentPath === "/assets" && index === 1 ? (
                            `${value.toLocaleString()}`
                          ) : (
                            `$ ${value.toLocaleString()}`
                          )
                        ) : (
                          <Flex
                            alignItems={"center"}
                            gap={"10px"}
                            pl={
                              currentPath === "/aez"
                                ? "10px"
                                : currentPath === "/validators"
                                  ? "20px"
                                  : 0
                            }
                            color={
                              item.types === "100%" ||
                                value.type === "avatarWithText"
                                ? "#bfbfbfcc"
                                : "#fff"
                            }
                          >
                            {value.type === "avatarWithText"
                              ? value.label
                              : value}
                          </Flex>
                        )}
                      </Td>
                    );
                  })}
              </Tr>
            );
          })}

          <Tr>
            {totalValue && (
              <Td
                py={"15px"}
                border={"none"}
                fontWeight="bold"
                borderTop={"1px solid"}
                fontSize={20}
                textAlign={"unset"}
                pl={currentPath === "/assets" ? "10px" : "0"}
              >
                Total
              </Td>
            )}
            {keys?.slice(1).map((key: string, index: number) => {
              return (
                totalValue && (
                  <Td
                    key={index}
                    py={"15px"}
                    border={"none"}
                    borderTop={"1px solid"}
                    fontWeight="bold"
                    paddingLeft={"5px"}
                  >
                    {typeof totals[index] === "number"
                      ? ``
                      : `$ ${totalValue.toLocaleString()}`}
                  </Td>
                )
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
          alignSelf={"center"}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
