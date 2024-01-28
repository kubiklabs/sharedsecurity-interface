import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, List, ListItem, Text, Tooltip } from "@chakra-ui/react";

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  visiblePages: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  alignSelf,
}: any) => {
  const [displayPages, setDisplayPages] = useState<Array<number>>([]);

  useEffect(() => {
    setDisplayPages(
      generatePagination({ currentPage, totalPages, visiblePages: 5 })
    );
  }, [currentPage, totalPages]);

  const generatePagination = (config: PaginationConfig): number[] => {
    const { currentPage, totalPages, visiblePages } = config;
    const pagesToShow: number[] = [];

    if (totalPages <= visiblePages) {
      // If total pages are less than or equal to the visible pages, display all pages.
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      // Calculate the range of page numbers to display.
      const halfVisible = Math.floor(visiblePages / 2);
      let start = currentPage - halfVisible;
      let end = currentPage + halfVisible;

      // Ensure the range does not go out of bounds.
      if (start < 1) {
        start = 1;
        end = visiblePages;
      }
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - visiblePages + 1;
      }

      // Add ellipsis before and after if necessary.
      if (start > 1) {
        // pagesToShow.push(1);
        if (start > 2) {
          pagesToShow.push(-1); // Ellipsis
        }
      }

      // Add the page numbers within the range.
      for (let i = start; i <= end; i++) {
        pagesToShow.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pagesToShow.push(-1); // Ellipsis
        }
        // pagesToShow.push(totalPages);
      }
    }

    return pagesToShow;
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
      alignSelf={alignSelf}
      // justifyItems={"flex-end"}
    >
      <Tooltip label="First Page">
        <span
          onClick={currentPage === 1 ? () => {} : () => onPageChange(1)}
          className="material-symbols-outlined nav-icons"
        >
          SKIP_previous
        </span>
      </Tooltip>
      <Tooltip label="Previous">
        <span
          onClick={
            currentPage === 1 ? () => {} : () => onPageChange(currentPage - 1)
          }
          // isDisabled={currentPage === totalPages}
          className="material-symbols-outlined nav-icons"
        >
          navigate_before
        </span>
      </Tooltip>

      <List
        display="flex"
        listStyleType="none"
        marginX="10px"
        padding="0"
        gap={"5px"}
      >
        {displayPages.map((page) =>
          page === -1 ? (
            <ListItem width={"40px"}>...</ListItem>
          ) : (
            <ListItem
              width={"40px"}
              key={page}
              cursor="pointer"
              padding="5px 10px"
              color={page === currentPage ? "#BC3D70" : ""}
              transform={`scale(${page === currentPage ? "1.3" : "1"})`}
              borderRadius="md"
              onClick={() => onPageChange(page)}
              _hover={{
                color: "#BC3D70",
              }}
            >
              {page}
            </ListItem>
          )
        )}
      </List>
      <Tooltip label="Next">
        <span
          onClick={
            currentPage === totalPages
              ? () => {}
              : () => onPageChange(currentPage + 1)
          }
          // isDisabled={currentPage === totalPages}
          className="material-symbols-outlined nav-icons"
        >
          navigate_next
        </span>
      </Tooltip>
      <Tooltip label="Last Page">
        <span
          onClick={
            currentPage === totalPages
              ? () => {}
              : () => onPageChange(totalPages)
          }
          className="material-symbols-outlined nav-icons"
        >
          SKIP_next
        </span>
      </Tooltip>
    </Box>
  );
};

export default Pagination;
