import { Avatar, Box, Center, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import SocialIconGroup from "./SocialIconGroup";

const ChainSocialButton = ({ imgSrc, data, name, socialLinks }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      position={"relative"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Tooltip label={name}>
        <Center>
          <Avatar name={name} zIndex={"10"} src={imgSrc} />
          {/* <Avatar src={neutron_logo} />
        <Avatar src={stride_logo} /> */}
        </Center>
      </Tooltip>
      <SocialIconGroup
        socialLinks={socialLinks}
        display={isHovered ? "inline" : "none"}
      />
    </Box>
  );
};

export default ChainSocialButton;
