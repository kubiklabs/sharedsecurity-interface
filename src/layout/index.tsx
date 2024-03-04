import React, { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Box px={"50px"} pt={"150px"} flex={"1"} pb={"50px"} minH={"100vh"}>{children}</Box>
    )
}

export default Layout