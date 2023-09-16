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
import { proposalsState } from "../../context/proposalsState";
import { getShortHandAddress } from "../../utils/common";
import { useGovernance } from "../../hooks/useGovernance";
import { useState } from "react";

export interface IVpCardProps {
  votePercent: string;
  amountStaked: string;
  denom: string;
  accountAddress: string;
  totalParticipated: string;
  totalValidators: string;
  name: string;
}

const VpCard = ({
  accountAddress,
  amountStaked,
  denom,
  totalParticipated,
  totalValidators,
  votePercent,
  name,
}: IVpCardProps) => {
  const { userVotingPower } = useRecoilValue(proposalsState);
  // console.log(userVotingPower);
  const { fetchVotingPower } = useGovernance();

  const [isLoading, setIsLoading] = useState(false);

  const handleVpCalculate = async () => {
    setIsLoading(true);
    await fetchVotingPower(name);
    setIsLoading(false);
  };

  return (
    <Box
      width={"300px"}
      bg={"rgba(255, 255, 255, 0.05)"}
      padding={"30px"}
      // paddingY={"20px"}
      borderRadius={"10px"}
    >
      <Stack justifyContent={"center"} gap={"0"}>
        <Text m={"0 "} color={"rgba(255, 255, 255, 0.40)"}>
          Voting Power on {name}
        </Text>

        {isLoading && (
          <Center>
            <Spinner width={"3rem"} height="3rem" />
          </Center>
        )}

        {userVotingPower && userVotingPower[name] ? (
          <>
            <Text margin={"0"} fontSize={"2rem"}>
              {Number(userVotingPower[name]?.userVotingPower) * 100}%
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"} gap={"5px"}>
              <Text>
                {userVotingPower[name]?.amount.amount / 1000000}{" "}
                {userVotingPower[name]?.amount.denom}
              </Text>
              <Text color={"rgba(255, 255, 255, 0.40)"}>
                {getShortHandAddress(userVotingPower[name]?.address)}
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
