import DurationButtons from "../Buttons/DurationButtons"
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import AreaGraph from "../Graphs and Chart/AreaGraph"
import Section from "../Layout/Section"


const AreaGraphCard = ({ objData, yKey, title, subTitle, selectedChain }: any) => {

  const [chain, setChain] = useState<string[]>([selectedChain]);

  useEffect(()=>{
    if(selectedChain === "All Network"){
      setChain(["Cosmos Hub", "Neutron", "Stride"]);
    }
    else{
      setChain([selectedChain]);
    }
  },[selectedChain]);


  const chainColorSelector: { [key: string]: string[] } = {
    "All Network": ["#BC3D70", "#ffd700", "#faa291"],
    "Cosmos Hub": ["#BC3D70"],
    "Neutron": ["#ffd700"],
    "Stride": ["#faa291"]
  };

  const keys: Array<string> = Object.keys(objData);

  const [selectedDuration, setSelectedDuration] = useState(keys[0]);


  return (
    <Section heading={title} headingSize="14px" headingColor="#B3B3B3" subtitle={subTitle} subtitleSize="24px" subtitleColor="#E5E5E5">
      <Box position={"absolute"} right={"60px"} top={"44px"}>
        <DurationButtons data={objData} selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration} />
      </Box>
      <Box width={"100%"} height={"300px"}>
        <AreaGraph lineData={objData[selectedDuration]} colors={chainColorSelector[selectedChain]} xKey={"time"} yKey={chain} />
      </Box>
    </Section>
  )
}

export default AreaGraphCard
