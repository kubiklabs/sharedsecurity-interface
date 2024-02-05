import { Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
const numberWithCommas = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
type propsType = {
    value: number,
    text: string,
}
const FeaturedDataDisplay = ({ value, text }: propsType) => {
    return (
        <Flex gap={"4px"} alignItems={"flex-end"}>
            <Heading fontSize="24px">
                {numberWithCommas(value)}
            </Heading>
            <Text fontWeight="400" color="">{text}</Text>
        </Flex>
    )
}

export default FeaturedDataDisplay;
 