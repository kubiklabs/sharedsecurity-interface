import { toast } from "react-toastify";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { PiWarningCircleFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

const toastBgColor = {
  success: "#ECFDF5",
  error: "#FEF2F2",
  warning: "#FFFCEB",
};

const toastTextColor = {
  success: "#10B980",
  error: "#F04444",
  warning: "#F69D0B",
};

const toastIcons = {
  success: <FaCheckCircle size={20} />,
  error: <IoWarning size={22} />,
  warning: <PiWarningCircleFill size={22} />,
};

const showToast = (type: string, message: string) => {
  (toast[type as keyof typeof toast] as any)(
    <Flex
      gap={"5px"}
      fontFamily={"Alata, sans-serif"}
      flexDir={"column"}
      paddingX={"30px"}
      paddingY={"20px"}
      margin={"-10px"}
      textColor={toastTextColor[type as keyof typeof toastTextColor]}
      backgroundColor={toastBgColor[type as keyof typeof toastBgColor]}
    >
      <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex alignItems={"center"} gap={"8px"}>
          <Box>{toastIcons[type as keyof typeof toastIcons]}</Box>
          <Box fontSize={"16px"}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Box>
        </Flex>
        <Box onClick={() => toast.dismiss()}>
          <RxCross2 size={20} color="#999999" />
        </Box>
      </Flex>
      <Text fontSize={"14px"} lineHeight={"14px"}>
        {message}
      </Text>
    </Flex>,
    {
      icon: false,
      closeButton: false,
      style: {
        padding: 0,
        borderRadius: "5px",
      },
      position: "bottom-right",
      autoClose: 3000,
    }
  );
};

export default showToast;
