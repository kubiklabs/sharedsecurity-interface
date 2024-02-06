import { Box, Flex } from '@chakra-ui/react'
type propsType = {
    options: string[],
    handleChange: (option: string) => void,
    selectedOption: string
}
const AssetOptions = ({ options, handleChange,selectedOption }: propsType) => {
    return (
        <Flex width={"100%"} height={"10vh"} justifyContent={"center"} alignItems={"center"}>
            <Flex width={"max-content"} border={"1px solid gray"} borderRadius={"0.3rem"}>
                {options.map((option, index) => (
                    <Box key={index} onClick={() => handleChange(option)} cursor={"pointer"} paddingY={"0.5rem"} paddingX={"1.3rem"} textTransform={"capitalize"} backgroundColor={`${selectedOption===option?"#17131E":""}`} >{option}</Box>
                ))}
            </Flex>
        </Flex>
    )
}

export default AssetOptions
