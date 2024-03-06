import { SigningStargateClient } from "@cosmjs/stargate";
import { getCosmosOption, sleep } from "../../../utils/common";
import { toast } from "react-toastify";
import Long from "long";
import nodeConfig from "../../../config/nodeConfig.json";
import showToast from "../../../utils/showToast";

const rpcEndpoint = nodeConfig.Stride.RPC;

export const useStrideGovTxn = () => {
  const getStrideAddressSigner = async () => {
    while (
      !(window as any).keplr ||
      !(window as any).getEnigmaUtils ||
      !(window as any).getOfflineSignerOnlyAmino
    ) {
      await sleep(0.5);
    }

    // Enable Keplr and request access to the wallet
    await (window as any).keplr.enable("stride-1");

    const offlineSigner = await (window as any).keplr.getOfflineSigner(
      "stride-1"
    );

    const [{ address }] = await offlineSigner.getAccounts();

    return { address, offlineSigner };
  };

  const sendStrideVote = async (proposalId: string, voteOption: string) => {
    const { address, offlineSigner } = await getStrideAddressSigner();

    // Build the vote message
    const voteMsg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposalId: Long.fromString(proposalId),
        voter: address,
        option: getCosmosOption(voteOption),
      },
    };

    try {
      const client = await SigningStargateClient.connectWithSigner(
        rpcEndpoint,
        offlineSigner
      );
      const fee = {
        amount: [],
        gas: "200000", // Adjust gas limit as needed
      };

      const { transactionHash, code } = await client.signAndBroadcast(
        address,
        [voteMsg],
        fee,
        "Vote on governance proposal"
      );

      if (code === 0) {
        showToast(
          "success",
          `Transaction broadcasted successfully with hash ${transactionHash}`
        );
      } else {
        showToast("error", `Transaction failed with code: ${code}`);
      }
    } catch (error) {
      showToast(
        "error",
        `Transaction failed with message ${(error as Error)?.message}`
      );
      console.log(error);
    }
  };

  // Create and sign the transaction

  return { sendStrideVote, getStrideAddressSigner };
};
