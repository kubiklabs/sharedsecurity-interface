import { Box, Flex, Text, Link } from "@chakra-ui/react";
import SubtitleText from "@/components/DataDisplay/SubtitleText";
import ChainSocialButton from "@/components/Buttons/ChainSocialButton";

import {
  COSMOS_SOCIALS,
  NEUTRON_SOCIALS,
  STRIDE_SOCIALS,
} from "@/utils/constant";

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
            imgSrc={'/images/chains/cosmos.png'}
          />
          <ChainSocialButton
            socialLinks={NEUTRON_SOCIALS}
            name="Neutron"
            imgSrc={'/images/chains/neutron.jpg'}
          />
          <ChainSocialButton
            socialLinks={STRIDE_SOCIALS}
            name="Stride"
            imgSrc={'/images/chains/stride.png'}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default InfoSection;
