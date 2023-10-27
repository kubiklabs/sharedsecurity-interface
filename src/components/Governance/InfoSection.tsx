import { Box, Flex, Heading, Text } from "@chakra-ui/react";
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
      padding={"50px"}
      bg={"rgba(255, 255, 255, 0.05)"}
      borderRadius={"10px"}
      marginX={"15px"}
    >
      <Heading m={"0"} textAlign={"left"}>
        Get Involved
      </Heading>
      <Flex>
        <SubtitleText mb={"0"} maxWidth={"60%"} textAlign={"left"}>
          To learn more about proposals and governance of the chains{" "}
          <a>click here</a>.<br></br> For regular updates and discussions, join
          the community on Discord or on the Forum.
        </SubtitleText>
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
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
