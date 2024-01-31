import { Box } from "@chakra-ui/react";
import SectionHeading from "../DataDisplay/SectionHeading";

const Section = (props: any) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      // justifyContent={"center"}
      mx={"auto"}
      gap={props.gap || "20px"}
      position={"relative"}
      backgroundColor={props?.backgroundColor || "#17131e" }
      borderTopRadius={"15px"}
      borderBottomRadius={props?.borderBottomRadius || "15px"}
      // padding="30px 40px"
      py={"40px"} px={"60px"}
      width={props?.width || "full"}
  
    >
      <SectionHeading
        heading={props.heading}
        sideText={props.sideText}
        subtitle={props.subtitle}
      />
      {props.children} 
    </Box>
  );
};

export default Section;
