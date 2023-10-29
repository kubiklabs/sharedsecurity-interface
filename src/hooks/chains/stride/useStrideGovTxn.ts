import { SigningStargateClient } from "@cosmjs/stargate";
import { getCosmosOption, sleep } from "../../../utils/common";
// import { useConnectWallet, useDisconnetWallet } from "../../useConnectWallet";
import strideChainInfo from "../../../config/chains/Stride/stride_mainnet.json";
import { toast } from "react-toastify";
import Long from "long";

export const useStrideGovTxn = () => {
  const rpcEndPoints = strideChainInfo.apis.rpc;

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
        rpcEndPoints[1].address,
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
        toast.success(
          `Transaction broadcasted successfully with hash ${transactionHash}`
        );
      } else {
        toast.error(`Transaction failed with code: ${code}`);
      }

      // toast.success(
      //   `Transaction broadcasted successfully with hash ${transactionHash}`,
      //   {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   }
      // );
    } catch (error) {
      toast.error(
        `Transaction failed with message ${(error as Error)?.message}`
      );
      console.log(error);
    }
  };

  // Create and sign the transaction

  return { sendStrideVote, getStrideAddressSigner };
};
