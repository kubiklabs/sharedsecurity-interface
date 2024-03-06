import Section from "../Layout/Section";
import CustomTable from "../DataDisplay/CustomTable";
import consumerChainData from "@/config/consumerChain.json";

const CCStatus1 = () => {
  return (
    <Section heading="Consumer Chains" subtitle="Proposals and Status">
      <CustomTable
        data={consumerChainData.consumerChainData.reverse()}
        keys={Object.keys(consumerChainData.consumerChainData[0])}
        minGridWidth="200px"
        maxGridWidth="250px"
      />
    </Section>
  );
};

export default CCStatus1;
