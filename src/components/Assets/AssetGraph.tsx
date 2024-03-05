import React, { useState, useEffect } from "react";
import Section from "@/components/Layout/Section";
import { Box, Flex, Text } from "@chakra-ui/react";
import AreaGraph from "@/components/Graphs and Chart/AreaGraph";


// For generating random data
let data: object[] = [];

let time = "Feb ";
for (let j = 1; j <= 10; j++) {
  let entry = {
    time: time + j,
    totalSupply: Math.floor(Math.random() * 10),
    ibcIn: Math.floor(Math.random() * 10),
    ibcOut: Math.floor(Math.random() * 10),
  };
  data.push(entry);
}


const buttonSelectorData = [
  { label: "Total Supply", value: "7,584", identifier: "totalSupply" },
  { label: "IBC In", value: "7,584", identifier: "ibcIn" },
  { label: "IBC Out", value: "17,284", identifier: "ibcOut" },
];

const colorSelectorObject = {
  totalSupply: "#BC3D70",
  ibcIn: "#fcba03",
  ibcOut: "#FAA291",
};

const AssetGraph = () => {
  const [selectedOption, setSelectedOption] = useState({
    totalSupply: true,
    ibcIn: false,
    ibcOut: false,
  });

  const [showLine, setShowLine] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);

  useEffect(() => {
    const newShowLine: string[] = [];
    const newColor: string[] = [];
    Object.keys(selectedOption).map((item) => {
      if (selectedOption[item as keyof typeof selectedOption]) {
        newShowLine.push(item);
        newColor.push(colorSelectorObject[item as keyof typeof selectedOption]);
      }
    });
    setShowLine(newShowLine);
    setColor(newColor);
  }, [selectedOption]);

  return (
    <Section heading="Total Supply" subtitle="Our top picks to get you started">
      <Box position={"relative"} width={"100%"} height={"60vh"}>
        <AreaGraph
          lineData={data}
          colors={color}
          xKey={"time"}
          yKey={showLine}
        />
      </Box>

      <Flex width={"100%"} justifyContent={"space-around"}>
        {buttonSelectorData.map((item, index) => (
          <Box
            key={index}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"center"}
            gap={"8px"}
            alignItems="center"
            paddingX={"24px"}
            paddingY={"12px"}
            cursor={"pointer"}
            _hover={{
              textDecor: "none",
              borderColor:
                colorSelectorObject[
                  item.identifier as keyof typeof selectedOption
                ],
            }}
            borderRadius="5px"
            fontSize="12px"
            fontWeight={400}
            borderWidth={"1px"}
            borderColor={
              selectedOption[item.identifier as keyof typeof selectedOption]
                ? colorSelectorObject[
                    item.identifier as keyof typeof selectedOption
                  ]
                : "transparent"
            }
            onClick={() => {
              if (
                (selectedOption[
                  item.identifier as keyof typeof selectedOption
                ] &&
                  showLine.length > 1) ||
                !selectedOption[item.identifier as keyof typeof selectedOption]
              ) {
                setSelectedOption({
                  ...selectedOption,
                  [item.identifier]:
                    !selectedOption[
                      item.identifier as keyof typeof selectedOption
                    ],
                });
              }
            }}
            bgColor={"transparent"}
          >
            <Text fontSize={"20px"} textColor={"#D9D9D9"}>
              {item.value}
            </Text>
            <Text fontSize={"14px"} textColor={"#B3B3B3"}>
              {item.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Section>
  );
};

export default AssetGraph;
