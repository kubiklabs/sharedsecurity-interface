import {
  Avatar,
  Button,
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
import {
  commonTagColorMap,
  scrollbarStyle,
  thinScrollbarStyle,
  ValidatorNames,
  Chains,
  validatorKeys,
  ValidatorKeys,
} from "../../utils/constant";
import { Link as PathLink, useLocation } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import TableTagGroup from "./table-helpers/TableTagGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

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
  const location = useLocation();
  const currentPath = location.pathname;

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
  //console.log(currentItems);

  return (
    <TableContainer textAlign={"left"}>
      <Table width={"100%"} fontSize={"lg"}>
        {/* <TableCaption>Data fetched from different chains</TableCaption> */}
        <Thead fontSize={"1.2rem"}>
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
                  pb={"30px"}
                  borderBottom={"1px solid"}
                  borderColor={"gray.400"}
                  color={"#fff"}
                  pl={
                    currentPath === "/aez"
                      ? "10px"
                      : currentPath === "/validators"
                      ? "20px"
                      : 0
                  }
                >
                  <Text
                    // borderLeft={"1px solid"}
                    // borderColor={"gray"}
                    py={"10px"}
                    px={"4px"}
                    width={"100%"}
                    cursor={"pointer"}
                  >
                    {item}{" "}
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
          {currentItems?.map((item: any) => {
            return (
              <Tr
                // borderTop={"1px solid gray"}
                borderBottom={"1px solid rgba(255, 255, 255, 0.15)"}
              >
                {item &&
                  Object.values(item)?.map((value: any) => {
                    //console.log({value});

                    if (value === item["Prop Date"]) return; // to not show the Prop Date in Consumer chains table
                    if (keys[3] === "Twitter Space") {
                      if (value?.data?.length === 1) return; // to not show hash tags in community calls
                    }
                    if (value === item.Date) return; // to not show date in community calls
                    if (value === item.url) return; // type data url added in Ecosystem to not show it
                    if (value === item.type) return; // type avatar added to not show in community.tsx
                    // if(value === item.types) return; // to not show Coinbase Custody, adding avatar
                    // console.log(value?.data);

                    return (
                      <Td
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
                            <PathLink
                              style={{ textDecoration: "underline" }}
                              to={value.url}
                            >
                              Proposal#{value.label}
                            </PathLink>
                          ) : value === "100%" ? (
                            <Flex alignItems={"center"} gap={"15px"}>
                              <Avatar
                                name={value.label}
                                size={"sm"}
                                src={"/Neutron.svg"}
                              />
                              {value}
                            </Flex>
                          ) : (
                            "-"
                          )
                        ) : typeof value === "number" ? (
                          `$ ${value.toLocaleString()}`
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
                              item.type === "avatarNeutron" ||
                              item.type === "avatarAtom" ||
                              item.types === "100%"
                                ? "#bfbfbfcc"
                                : "#fff"
                            }
                          >
                            {(Chains.includes(value) ||
                              ValidatorNames.includes(value) ||
                              item.type === "avatarNeutron" ||
                              item.type === "avatarAtom") && (
                              <Avatar
                                name={value.label}
                                height={"24px"}
                                width={"24px"}
                                src={
                                  item.type === "avatarNeutron"
                                    ? "/Neutron.svg"
                                    : item.type === "avatarAtom"
                                    ? "/Atom.svg"
                                    : item.types === "100%"
                                    ? "/CoinbaseCustody.svg"
                                    : "/" + value + ".svg"
                                }
                              />
                            )}
                            {value}
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
                  >
                    ${" "}
                    {typeof totalValue === "number"
                      ? `$ ${totalValue.toLocaleString()}`
                      : totalValue}
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
          alignSelf={"flex-end"}
        />
      )}
    </TableContainer>
  );
};

export default CustomTable;
