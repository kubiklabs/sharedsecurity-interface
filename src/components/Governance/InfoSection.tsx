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
      paddingX={"60px"}
      paddingY={"40px"}
      bg={"#17131E"}
      borderRadius={"10px"}
    >
      <Text m={"0"} color={"#E5E5E5"} textAlign={"left"} fontSize={"24px"}>
        GET INVOLVED
      </Text>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <SubtitleText
          fontSize={"14px"}
          mb={"0"}
          maxWidth={"60%"}
          textAlign={"left"}
        >
          For regular updates and discussions, join the community on Discord or
          on the Forum.
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
