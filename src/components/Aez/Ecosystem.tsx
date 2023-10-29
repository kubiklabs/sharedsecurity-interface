import { useEffect } from "react";
import Section from "../Layout/Section";
import { Center, Spinner, Stack } from "@chakra-ui/react";
import CustomTable from "../DataDisplay/CustomTable";
import { useAez } from "../../hooks/useAez";
import { useRecoilValue } from "recoil";
import { ecosystemState } from "../../context/ecosystemState";

const Ecosystem = () => {
  const { getParsedEcosystemData } = useAez();
  const { data } = useRecoilValue(ecosystemState);

  useEffect(() => {
    if (!data || !data.length) getParsedData();
  }, []);

  const getParsedData = async () => {
    const data = await getParsedEcosystemData();
  };
  return (
    <Section heading="Ecosystem">
      <Stack>
        {data && data.length ? (
          <CustomTable
            keys={data && Object.keys(data[0])}
            data={data}
            minGridWidth="80px"
            maxGridWidth="100px"
            gridColumnGap="0px"
          />
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
