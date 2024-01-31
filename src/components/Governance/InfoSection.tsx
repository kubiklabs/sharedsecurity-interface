import { Box, Flex, Heading, Text, Link } from "@chakra-ui/react";
import SubtitleText from "../DataDisplay/SubtitleText";
import SocialIconGroup from "../Buttons/SocialIconGroup";
import ChainSocialButton from "../Buttons/ChainSocialButton";
import neutron_logo from "../../assets/chains/neutron.jpg";
import cosmos_logo from "../../assets/chains/cosmos.png";
import stride_logo from "../../assets/chains/stride.png";

import {
  COSMOS_SOCIALS,
  NEUTRON_SOCIALS,
  STRIDE_SOCIALS,
} from "../../utils/constant";

const InfoSection = () => {
  return (
    <Box
      paddingX={"40px"}
      paddingY={"30px"}
      bg={"#17131E"}
      borderRadius={"10px"}
      // marginX={"15px"}
    >
      <Heading m={"0"} color={"#E5E5E5"} textAlign={"left"} marginBottom={"10px"}>
        GET INVOLVED
      </Heading>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <SubtitleText mb={"0"} maxWidth={"60%"} textAlign={"left"}>
          To learn more about proposals and governance of the chains{" "}
          <Link color={"#BC3D70"} textDecoration={"underline"} _hover={{
            color: "#BC3D70",
          }}>click here</Link>.<br></br> For regular updates and discussions, join
          the community on Discord or on the Forum.
        </SubtitleText>
        <Flex
          alignItems={"center"}
          justifyContent={"end"}
          gap={"20px"}
          flex={"1"}
        >
          <ChainSocialButton
            socialLinks={COSMOS_SOCIALS}
            name="Cosmos Hub"
            imgSrc={cosmos_logo}
          />
          <ChainSocialButton
            socialLinks={NEUTRON_SOCIALS}
            name="Neutron"
            imgSrc={neutron_logo}
          />
          <ChainSocialButton
            socialLinks={STRIDE_SOCIALS}
            name="Stride"
            imgSrc={stride_logo}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default InfoSection;
