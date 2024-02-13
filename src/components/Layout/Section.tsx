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
      backgroundColor={props?.backgroundColor || "#17131e"}
      borderTopRadius={"15px"}
      borderBottomRadius={props?.borderBottomRadius || "15px"}
      padding={props?.padding || "40px 60px"}
      width={props?.width || "full"}
      height={props.height}
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
