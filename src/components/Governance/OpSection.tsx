import React, { useEffect, useMemo, useRef, useState } from "react";
import Section from "../Layout/Section";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import LpCard, { ILpCardProps } from "./LpCard";
import Pagination from "../Pagination/Pagination";
import FilterModal, { I_InFil } from "../modals/FilterModal";
import { useFilter } from "../../hooks/useFilter";

const itemsPerPage = 10;

const OpSection = ({
  opList,
  isLoading,
}: {
  opList: Array<ILpCardProps>;
  isLoading?: boolean;
}) => {
  const [pageCount, setPageCount] = useState(
    Math.ceil(opList?.length / itemsPerPage) || 0
  );
  const [filteredItems, setFilteredItems] = useState(opList);
  const [filterPopover, setFilterPopover] = useState(false);
  const [currentItems, setCurrentItems] = useState(filteredItems?.slice(0, 10));
  const currentPage = useRef(1);
  const { filter } = useFilter();

  useEffect(() => {
    setFilteredItems(opList);
    setPageCount(Math.ceil(opList?.length / itemsPerPage) || 0);
  }, [opList]);
  useEffect(() => {
    setCurrentItems(filteredItems?.slice(0, 10));
  }, [filteredItems]);

  const handleFilterPopover = () => {
    const oldVal = filterPopover;
    // console.log(oldVal);
    setFilterPopover(!oldVal);
  };

  const handlePageClick = (page: number) => {
    currentPage.current = page;
    const newOffset = ((page - 1) * itemsPerPage) % filteredItems.length;
    console.log(
      `User requested page number ${page}, which is offset ${newOffset}`
    );

    const endOffset = newOffset + itemsPerPage;
    const currentItems = filteredItems.slice(newOffset, endOffset);
    setCurrentItems(currentItems);
  };

  const searchObjects = (input: string) => {
    const searchTerm = input.toLowerCase();

    return opList.filter((obj) => {
      const { proposalId, proposalTitle, tags, status } = obj;
      // console.log(obj);

      if (proposalId.toString().toLowerCase().includes(searchTerm)) return true;
      if (proposalTitle.toLowerCase().includes(searchTerm)) return true;
      if (status.toLowerCase().includes(searchTerm)) return true;
      if (tags.some((element) => element.toLowerCase().includes(input)))
        return true;

      return false;
    });
  };

  const handleSearch = (e: any) => {
    // console.log(e.target.value);
    const filteredList = searchObjects(e.target.value);
    setFilteredItems(filteredList);
    console.log(filteredList);
    setPageCount(Math.ceil(filteredList.length / itemsPerPage) || 0);
    currentPage.current = 1;
    // handlePageClick(1);
  };

  const handleFilter = (allFilters: I_InFil) => {
    let filteredList = filter(allFilters, opList);
    setFilteredItems(filteredList);
    setPageCount(Math.ceil(filteredList.length / itemsPerPage) || 0);
    currentPage.current = 1;
  };

  return (
    <Section
      heading="Other Proposals"
      sideText={`${filteredItems.length} / ${opList.length}`}
    >
      <Flex px={"15px"} justifyContent={"space-between"}>
        <Input
          onChange={handleSearch}
          placeholder="Search Proposals by name or Id....."
          size="lg"
          height={"50px"}
          borderRadius={"5px"}
          border={"none"}
          px={"15px"}
          width={"500px"}
          bg={"rgba(255, 255, 255, 0.05)"}
        />
        <Flex position={"relative"} gap={"15px"} alignItems={"center"}>
          {/* <Button>My Votes</Button> */}
          <Tooltip label="Filter">
            <Text
              cursor={"pointer"}
              _hover={{
                color: "#BC3D70",
              }}
              onClick={handleFilterPopover}
            >
              <span
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "2rem" }}
                className="material-symbols-outlined"
              >
                tune
              </span>
            </Text>
          </Tooltip>
          <FilterModal
            onFilterApply={handleFilter}
            isPopoverOpen={filterPopover}
            setIsPopoverOpen={setFilterPopover}
          />
        </Flex>
      </Flex>
      <Grid
        p={"15px"}
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(550px, 1fr))"}
      >
        {currentItems?.length ? (
          currentItems?.map((item) => {
            return (
              <GridItem id={item.proposalId}>
                <LpCard {...item} />
              </GridItem>
            );
          })
        ) : (
          <GridItem>
            {isLoading ? (
              <Spinner width={"3rem"} height="3rem" />
            ) : (
              <Heading
                bg={"rgba(255, 255, 255, 0.05)"}
                padding={"30px"}
                // paddingY={"20px"}
                borderRadius={"10px"}
              >
                There are no other proposals!
              </Heading>
            )}
          </GridItem>
        )}
      </Grid>
      {filteredItems?.length ? (
        <Pagination
          currentPage={currentPage.current}
          totalPages={pageCount}
          onPageChange={handlePageClick}
          alignSelf={"center"}
        />
      ) : null}
    </Section>
  );
};

export default OpSection;
