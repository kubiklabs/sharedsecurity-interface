import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import SideBar from '@/components/Navigation/SideBar'

const scrollbarStyle = {
    "&::-webkit-scrollbar": {
        width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
        background: "gray",
        borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: "gray.400",
    },
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            sx={scrollbarStyle}
            maxH={"100vh"}
            overflowY={"scroll"}
            minH={"100vh"}
            flex={1}
        >
            <SideBar />
            <Box px={"50px"} pt={"150px"} flex={"1"} pb={"50px"} minH={"100vh"}>{children}</Box>
        </Box>
    )
}

export default Layout