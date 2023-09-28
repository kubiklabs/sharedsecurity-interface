import React, { useEffect, useMemo, useState } from "react";
import Section from "../Layout/Section";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import LpCard, { ILpCardProps } from "./LpCard";
import { compareProposals } from "../../utils/common";
import Pagination from "../Pagination/Pagination";

const itemsPerPage = 10;

const OpSection = ({
  opList,
  isLoading,
}: {
  opList: Array<ILpCardProps>;
  isLoading?: boolean;
}) => {
  const pageCount =
    useMemo(() => Math.ceil(opList?.length / itemsPerPage), [opList]) || 0;

  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState(opList?.slice(0, 10));

  useEffect(() => {
    setCurrentItems(opList?.slice(0, 10));
  }, [opList]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    const newOffset = ((page - 1) * itemsPerPage) % opList.length;
    console.log(
      `User requested page number ${page}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    const endOffset = newOffset + itemsPerPage;
    const currentItems = opList.slice(newOffset, endOffset);
    setCurrentItems(currentItems);
  };

  return (
    <Section heading="Other Proposals" sideText="122/122">
      <Flex px={"15px"} justifyContent={"space-between"}>
        <Input
          placeholder="Search Proposals by name or Id....."
          size="lg"
          height={"50px"}
          borderRadius={"5px"}
          border={"none"}
          px={"15px"}
          width={"500px"}
          bg={"rgba(255, 255, 255, 0.05)"}
        />
        <Flex gap={"15px"} alignItems={"center"}>
          <Button>My Votes</Button>
          <span
            style={{ fontVariationSettings: "'FILL' 1", fontSize: "2rem" }}
            className="material-symbols-outlined"
          >
            widgets
          </span>
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
          <GridItem bg={"red.800"}>
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
      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={handlePageClick}
      />
    </Section>
  );
};

export default OpSection;
