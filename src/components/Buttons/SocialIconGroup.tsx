import { Box, Flex, Link, Tooltip } from "@chakra-ui/react";
import {
  faDiscord,
  faMedium,
  faReddit,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SOCIAL_ICON_MAP = {
  Discord: faDiscord,
  Twitter: faTwitter,
  Telegram: faTelegram,
  Youtube: faYoutube,
  Medium: faMedium,
  Reddit: faReddit,
};

export interface ISocialLinks {
  Discord?: string;
  Twitter?: string;
  Telegram?: string;
  Youtube?: string;
  Medium?: string;
  Messenger?: string;
  Reddit?: string;
}

const SocialIconGroup = ({
  display,
  socialLinks,
}: {
  display: string;
  socialLinks: ISocialLinks;
}) => {
  return (
    <Flex
      width={"max-content"}
      display={display}
      position={"absolute"}
      gap={"25px"}
      bg={"#2d2a35"}
      borderRadius={"20px"}
      top={"-10px"}
      // right={"-100px"}
      // zIndex={"11"}
      padding={" 12.5px 25px"}
      transform={"translate(-50%, -100%)"}
    >
      <Flex
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={"20px"}
      >
        {Object.keys(socialLinks)?.map((app) => {
          return (
            <Link
              target="_blank"
              href={socialLinks[app as keyof typeof socialLinks]}
              _hover={{
                transform: "translateY(-4px) scale(1.1)",
                color: "#BC3D70",
              }}
            >
              <Tooltip label={app}>
                <FontAwesomeIcon
                  cursor={"pointer"}
                  size="xl"
                  icon={SOCIAL_ICON_MAP[app as keyof typeof SOCIAL_ICON_MAP]}
                />
              </Tooltip>
            </Link>
          );
        })}
      </Flex>
      <Box
        zIndex={"-10"}
        right={"50%"}
        transform={"translate(50%, -20%) rotate(0deg)"}
        position={"absolute"}
        height={"50px"}
        width={"80px"}
        borderRadius={"20px"}
        bg={"transparent"}
      ></Box>
      <Box
        zIndex={"-10"}
        right={"50%"}
        transform={"translate(50%, -50%) rotate(45deg)"}
        position={"absolute"}
        height={"30px"}
        width={"30px"}
        borderRadius={"5px"}
        bg={"#2d2a35"}
      ></Box>
    </Flex>
  );
};

export default SocialIconGroup;
