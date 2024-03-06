import { Flex, Text } from "@chakra-ui/react"

const DurationButtons = ({ data, selectedDuration, setSelectedDuration }: any) => {
    return (
        <Flex borderWidth="1px" borderRadius={"5px"} gap={"10px"} flexDir={"row"} width={"fit-content"} borderColor={"#2e2b34"} paddingX={"10px"} paddingY={"4px"} height={"40px"}>
            {Object.keys(data).map((item: string, index: number) => {
                return (
                    <Text key={index} color={selectedDuration === item ? "white" : "#FFFFFF99"} bgColor={selectedDuration === item ? "#FFFFFF0D" : ""} borderRadius={"5px"} display={"flex"} justifyContent={"center"} alignItems={"center"} paddingX={"10px"} fontSize={"14px"} fontWeight={500} _hover={{
                        bgColor: "#FFFFFF0D",
                        cursor: "pointer"
                    }} onClick={() => {
                        setSelectedDuration(item)
                    }}>{item}</Text>
                )
            })}
        </Flex>
    )
}

export default DurationButtons