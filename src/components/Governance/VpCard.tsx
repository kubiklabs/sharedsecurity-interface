import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { getShortHandAddress } from "../../utils/common";
import { useGovernance } from "../../hooks/useGovernance";
import { useState } from "react";
import { userVpState } from "../../context/userVpState";

const VpCard = ({ name }: { name: string }) => {
  const userVp = useRecoilValue(userVpState);
  type IUserVpType = typeof userVp;
  const { fetchVotingPower } = useGovernance();

  const [isLoading, setIsLoading] = useState(false);

  const handleVpCalculate = async () => {
    setIsLoading(true);
    await fetchVotingPower(name);
    setIsLoading(false);
  };

  return (
    <Box
      bg={"rgba(255, 255, 255, 0.05)"}
      padding={"30px"}
      borderRadius={"10px"}
    >
      <Stack justifyContent={"center"} gap={"15px"}>
        <Text mt={"0 "} color={"rgba(255, 255, 255, 0.40)"}>
          Voting Power on {name}
        </Text>
        {isLoading && (
          <Center>
            <Spinner width={"3rem"} height="3rem" />
          </Center>
        )}
        {userVp && userVp[name as keyof IUserVpType] ? (
          <>
            <Text margin={"0"} fontSize={"2rem"}>
              {(
                Number(userVp[name as keyof IUserVpType]?.userVotingPower) * 100
              ).toFixed(10)}
              %
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"} gap={"5px"}>
              <Text>
                {userVp[name as keyof IUserVpType]?.amount.amount / 1000000}{" "}
                {userVp[name as keyof IUserVpType]?.amount.denom}
              </Text>
              <Text color={"rgba(255, 255, 255, 0.40)"}>
                (
                {getShortHandAddress(
                  userVp[name as keyof IUserVpType]?.address
                )}
                )
              </Text>
            </Flex>
          </>
        ) : (
          !isLoading && <Button onClick={handleVpCalculate}>Calculate</Button>
        )}
      </Stack>
    </Box>
  );
};

export default VpCard;
