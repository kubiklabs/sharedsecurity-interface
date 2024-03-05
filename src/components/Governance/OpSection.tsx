import React, { useEffect, useRef, useState } from "react";
import Section from "../Layout/Section";
import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import LpCard, { ILpCardProps } from "./LpCard";
import Pagination from "@/components/Pagination/Pagination";
import FilterModal, { I_InFil } from "@/components/modals/FilterModal";
import { useFilter } from "@/hooks/useFilter";
import { IoIosSearch } from "react-icons/io";

const itemsPerPage = 12;

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
  const [currentItems, setCurrentItems] = useState(
    filteredItems?.slice(0, itemsPerPage)
  );
  const currentPage = useRef(1);
  const { filter } = useFilter();

  useEffect(() => {
    setFilteredItems(opList);
    setPageCount(Math.ceil(opList?.length / itemsPerPage) || 0);
  }, [opList]);
  useEffect(() => {
    setCurrentItems(filteredItems?.slice(0, itemsPerPage));
  }, [filteredItems]);

  const handleFilterPopover = () => {
    const oldVal = filterPopover;
    setFilterPopover(!oldVal);
  };

  const handlePageClick = (page: number) => {
    currentPage.current = page;
    const newOffset = ((page - 1) * itemsPerPage) % filteredItems.length;
    const endOffset = newOffset + itemsPerPage;
    const currentItems = filteredItems.slice(newOffset, endOffset);
    setCurrentItems(currentItems);
  };

  const searchObjects = (input: string) => {
    const searchTerm = input.toLowerCase();

    return opList.filter((obj) => {
      const { proposalId, proposalTitle, tags, status } = obj;
      if (proposalId.toString().toLowerCase().includes(searchTerm)) return true;
      if (proposalTitle?.toLowerCase().includes(searchTerm)) return true;
      if (status.toLowerCase().includes(searchTerm)) return true;
      if (tags.some((element) => element.toLowerCase().includes(input)))
        return true;

      return false;
    });
  };

  const handleSearch = (e: any) => {
    const filteredList = searchObjects(e.target.value);
    setFilteredItems(filteredList);
    setPageCount(Math.ceil(filteredList.length / itemsPerPage) || 0);
    currentPage.current = 1;
  };

  const handleFilter = (allFilters: I_InFil) => {
    let filteredList = filter(allFilters, opList);
    setFilteredItems(filteredList);
    setPageCount(Math.ceil(filteredList.length / itemsPerPage) || 0);
    currentPage.current = 1;
  };

  return (
    <Section
      heading="All Proposals"
      sideText={`${filteredItems.length} / ${opList.length}`}
      subtitle="All proposals"
    >
      <Flex
        position={"absolute"}
        gap={"20px"}
        right={"60px"}
        px={"15px"}
        justifyContent={"space-between"}
      >
        <Flex
          flexDirection={"row"}
          pl={"25px"}
          alignItems={"center"}
          borderWidth={"1px"}
          borderColor={"#37343D"}
          borderRadius={"5px"}
          height={"50px"}
        >
          <IoIosSearch size={24} color="#999999" />
          <Input
            onChange={handleSearch}
            placeholder="Search here..."
            _placeholder={{ color: "#999999" }}
            size="lg"
            fontSize={"1.2rem"}
            outline={"none"}
            color={"#999999"}
            border={"none"}
            px={"15px"}
            width={"300px"}
            _focus={{
              borderColor: "none",
              boxShadow: "none",
            }}
          />
        </Flex>
        <Flex position={"relative"} gap={"15px"} alignItems={"center"}>
          <Tooltip label="Filter">
            <Text
              cursor={"pointer"}
              _hover={{
                color: "#BC3D70",
              }}
              color={"#37343D"}
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
        gridTemplateColumns={"repeat(auto-fit, minmax(500px, 1fr))"}
      >
        {currentItems?.length ? (
          currentItems?.map((item, index) => {
            return (
              <GridItem id={item.proposalId} key={index}>
                <LpCard {...item} />
              </GridItem>
            );
          })
        ) : (
          <GridItem>
            {isLoading ? (
              <Center>
              <Spinner width={"3rem"} height="3rem" />
              </Center>
            ) : (
              <Heading
                bg={"rgba(255, 255, 255, 0.05)"}
                padding={"30px"}
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
