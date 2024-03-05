import { Box } from "@chakra-ui/react";
import SectionHeading from "../DataDisplay/SectionHeading";

const Section = (props: any) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
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
      {props.heading && (
        <SectionHeading
        heading={props.heading}
        headingSize = {props.headingSize}
        headingColor = {props.headingColor}
        sideText={props.sideText}
        subtitle={props.subtitle}
        subtitleSize = {props.subtitleSize}
        subtitleColor = {props.subtitleColor}
          sideTextPos={props.sideTextPos}
        />
      )}

      {props.children}
    </Box>
  );
};

export default Section;
