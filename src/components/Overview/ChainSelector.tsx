import { useState } from 'react'
import homeLinesAndGraphsPrice from '../../config/homeLinesAndGraphsPrice.json'
import Section from '../Layout/Section';
import { Flex, Box, Text } from '@chakra-ui/react';

const ChainSelector = ({ selectedChain, setSelectedChain }: { selectedChain: string, setSelectedChain: React.Dispatch<React.SetStateAction<string>> }) => {

    return (
        <Section heading="Lines and Graphs" headingSize="24px">
            <Flex position={"absolute"} right={"60px"} top={"22%"} borderWidth={"1px"} borderColor={"#1E1A25"} borderRadius={"5px"}>
                {
                    Object.keys(homeLinesAndGraphsPrice).map((item, index) => (
                        <Box
                            key={index}
                            display={"flex"}
                            flexDir={"row"}
                            justifyContent={"center"}
                            alignItems="center"
                            paddingX={"30px"}
                            paddingY={"20px"}
                            cursor={"pointer"}
                            _hover={{ textDecor: "none" }}
                            borderRadius="5px"
                            fontSize="14px"
                            fontWeight={400}
                            // borderWidth={"1px"}
                            bgColor={selectedChain === item ? "#1E1A25" : ""}
                            onClick={() => {
                                setSelectedChain(item)
                            }}
                        >
                            <Text textColor={item==="All Network"?"white":"#FFFFFF99"}>{item}</Text>
                        </Box>
                    ))
                }
                {/* {stats.map((item)=>(
      item.label!="Transaction Monitoring"&&<FeaturedDataDisplay key={item.label} text={item.label} value={item.label==="Total Market Cap"?`$ ${totalMarketCap}`:item.number}/>
    ))} */}
            </Flex>
        </Section >
    )
}

export default ChainSelector