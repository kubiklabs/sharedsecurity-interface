import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Hide,
  Link,
  Show,
  Text,
} from "@chakra-ui/react";
const Footer = () => {
  const socialName = ["Kubik Labs", "Twitter", "Medium", "Discord", "Github"];
  return (
    <Flex
      borderTop={"1px"}
      borderTopColor={"#37343D"}
      backgroundColor="#120e19"
      justifyContent={"space-between"}
    >
      <Flex flexDirection={"column"} alignItems={"flex-start"}>
        <Heading
          color={"#F2F2F2"}
          pt={"48px"}
          pl={"80px"}
          fontSize={"24px"}
          fontWeight={"700"}
        >
          Shared Security Info
        </Heading>
        <Text
          pl={"80px"}
          pt={"5px"}
          color={"#B3B3B3"}
          fontSize={"14px"}
          fontWeight={"500"}
        >
          Developed by Kubik Labs
        </Text>
        <Flex width={"full"} justifyContent={"space-between"}>
          <Flex mt={"40px"} mb={"40px"} pl={"80px"} flexWrap={"wrap"}>
            {socialName.map((social, index) => {
              return (
                <Flex alignItems={"center"}>
                  <Link _hover={{ textDecoration: "none" }}>
                    <Flex alignItems={"center"} gap={"5px"}>
                      <Avatar
                        name={social}
                        src={`/${social}.svg`}
                        justifyContent={"center"}
                        size={"fit-content"}
                      />
                      <Text
                        fontWeight="500"
                        fontSize="12px"
                        color="#A6A6A6"
                        _hover={{ color: "white" }}
                      >
                        {social}
                      </Text>
                    </Flex>
                  </Link>
                  <Divider
                    width={"1px"}
                    height={"12px"}
                    borderRadius={"2px"}
                    background={"#B3B3B3"}
                    mx="40px"
                  />
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
      <Flex mr={"80px"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="210"
          viewBox="0 0 389 225"
          fill="none"
        >
          <path
            d="M323.436 84.9723L324.495 82.7585C345.314 39.2475 326.91 -12.8855 283.389 -33.684C239.869 -54.4825 187.712 -36.0704 166.894 7.44055L165.835 9.6543L216.939 34.0772L219.755 28.1922C227.253 12.521 246.038 5.88965 261.712 13.3805C277.387 20.8714 284.015 39.6479 276.517 55.319L273.702 61.2041L323.436 84.9723Z"
            fill="white"
            fill-opacity="0.1"
          />
          <path
            d="M9.32288 63.0652C-11.4954 106.576 6.9084 158.709 50.4288 179.508L159.367 231.57L131.723 153.261L70.4365 123.972C56.5621 117.342 50.695 100.721 57.3319 86.8501C63.9687 72.9788 80.5964 67.109 94.4707 73.7396L207.52 127.766L179.162 47.4337L125.818 21.9407C82.2979 1.14219 30.1411 19.5542 9.32288 63.0652Z"
            fill="white"
            fill-opacity="0.1"
          />
          <path
            d="M229.928 71.6948L258.286 152.027L319.916 181.48C333.79 188.111 339.657 204.731 333.02 218.602C326.384 232.474 309.756 238.343 295.882 231.713L182.964 177.749L210.608 256.058L263.6 281.382C307.12 302.181 359.277 283.769 380.095 240.258C400.913 196.747 382.509 144.614 338.989 123.815L229.928 71.6948Z"
            fill="white"
            fill-opacity="0.1"
          />
          <path
            d="M66.1365 218.461L65.0774 220.675C44.2591 264.186 62.6628 316.319 106.183 337.117C149.704 357.916 201.86 339.504 222.679 295.993L223.738 293.779L172.633 269.356L169.818 275.241C162.32 290.912 143.535 297.544 127.86 290.053C112.186 282.562 105.557 263.785 113.055 248.114L115.871 242.229L66.1365 218.461Z"
            fill="white"
            fill-opacity="0.1"
          />
        </svg>
      </Flex>
    </Flex>
  );
};

export default Footer;
