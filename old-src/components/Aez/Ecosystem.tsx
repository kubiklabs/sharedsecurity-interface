import { useEffect, useState } from "react";
import Section from "../Layout/Section";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAez } from "../../hooks/useAez";
import { useRecoilValue } from "recoil";
import { ecosystemState } from "../../context/ecosystemState";
import EcoCards from "./EcoCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { urlImgObject } from "../../utils/constant";

const Ecosystem = () => {
  const { getParsedEcosystemData } = useAez();
  const { data } = useRecoilValue(ecosystemState);
  const [items, setItems] = useState(data);
  const noOfDappsToShow = 3;
  const [visibleItems, setVisibleItems] = useState(noOfDappsToShow);

  useEffect(() => {
    if (!data || !data.length) getParsedData();
  }, []);

  const getParsedData = async () => {
    const data = await getParsedEcosystemData();
    console.log(data);
  };

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + noOfDappsToShow);
  };
  const collapseItems = () => {
    setVisibleItems(noOfDappsToShow);
  };

  const modifyData = () => {
    const newData = data.map((item: any) => {
      return {
        ...item,
        url: urlImgObject[item.name as keyof typeof urlImgObject],
      };
    });

    return newData;
  };

  return (
    <Section
      backGroundColor="#17131e"
      heading="Ecosystem"
      subtitle="Dapps you might find interesting"
    >
      <Stack gap={"30px"}>
        {data && data.length ? (
          <>
            <Flex gap={"30px"} flexWrap={"wrap"} justifyContent={"center"}>
              {modifyData()
                .slice(0, visibleItems)
                .map((dataItem: any) => {
                  return (
                    <EcoCards data={dataItem} key={Object.keys(dataItem)} />
                  );
                })}
            </Flex>

            {data.length !== visibleItems && (
              <Box>
                {visibleItems < data.length ? (
                  <Button
                    background={"transparent"}
                    color={"#b3b3b3"}
                    _hover={{ outline: "none" }}
                    onClick={loadMoreItems}
                  >
                    <Text
                      fontSize={"14px"}
                      width={"90px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      More Dapps <FontAwesomeIcon icon={faAngleDown} />
                    </Text>
                  </Button>
                ) : (
                  <Button
                    disabled
                    background={"transparent"}
                    color={"#b3b3b3"}
                    _hover={{ outline: "none" }}
                    onClick={collapseItems}
                  >
                    <Text
                      fontSize={"14px"}
                      width={"90px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      Show less <FontAwesomeIcon icon={faAngleUp} />
                    </Text>
                  </Button>
                )}
              </Box>
            )}
          </>
        ) : (
          <Center>
            <Spinner />
          </Center>
        )}
      </Stack>
    </Section>
  );
};

export default Ecosystem;
