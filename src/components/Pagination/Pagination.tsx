import React from "react";
import { Box, Button, List, ListItem, Text } from "@chakra-ui/react";

function Pagination({ currentPage, totalPages, onPageChange }: any) {
  // Generate an array of page numbers to display in pagination
  const displayPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
    >
      <Button
        variant="outline"
        colorScheme="blue"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>
      <List display="flex" listStyleType="none" marginX="10px" padding="0">
        {displayPages.map((page) => (
          <ListItem
            key={page}
            cursor="pointer"
            padding="5px 10px"
            backgroundColor={page === currentPage ? "#BC3D70" : ""}
            color={"white"}
            borderRadius="md"
            onClick={() => onPageChange(page)}
          >
            {page}
          </ListItem>
        ))}
      </List>
      <Button
        variant="outline"
        colorScheme="blue"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
}

export default Pagination;
