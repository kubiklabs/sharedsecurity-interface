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
import CustomTable from "../DataDisplay/CustomTable";
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
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    if (!data || !data.length) getParsedData();
  }, []);

  const getParsedData = async () => {
    const data = await getParsedEcosystemData();
  };
  console.log(data);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4);
  };
  const collapseItems = () => {
    setVisibleItems(4);
  };

  const modifyData = (data: any) => {
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
      <Stack>
        {data && data.length ? (
          // <CustomTable
          //   keys={data && Object.keys(data[0])}
          //   data={data}
          //   minGridWidth="80px"
          //   maxGridWidth="100px"
          //   gridColumnGap="0px"
          // />

          <>
            <Flex gap={"30px"} flexWrap={"wrap"} justifyContent={"center"}>
              {modifyData(items)
                .slice(0, visibleItems)
                .map((dataItem: any) => {
                  // console.log(dataItem);
                  return (
                    <EcoCards data={dataItem} key={Object.keys(dataItem)} />
                  );
                })}
            </Flex>

            <Box>
              {visibleItems < items.length ? (
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
