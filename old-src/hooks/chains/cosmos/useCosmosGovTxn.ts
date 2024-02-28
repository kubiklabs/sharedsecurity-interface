import { SigningStargateClient } from "@cosmjs/stargate";
import { getCosmosOption, sleep } from "../../../utils/common";
// import { useConnectWallet, useDisconnetWallet } from "../../useConnectWallet";
import cosmosChainInfo from "../../../config/chains/CosmosHub/cosmos_mainnet.json";
import nodeConfig from "../../../config/nodeConfig.json";
import { toast } from "react-toastify";
import Long from "long";
import showToast from "../../../utils/showToast";

const style = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const useCosmosGovTxn = () => {
  const rpcEndPoint = nodeConfig.Cosmos.RPC;

  const getCosmosAddressSigner = async () => {
    while (
      !(window as any).keplr ||
      !(window as any).getEnigmaUtils ||
      !(window as any).getOfflineSignerOnlyAmino
    ) {
      await sleep(0.5);
    }
    await (window as any).keplr.enable("cosmoshub-4");

    const offlineSigner = await (window as any).keplr.getOfflineSigner(
      "cosmoshub-4"
    );

    const [{ address }] = await offlineSigner.getAccounts();

    return { address, offlineSigner };
  };

  const sendCosmosVote = async (proposalId: string, voteOption: string) => {
    const { address, offlineSigner } = await getCosmosAddressSigner();

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
        rpcEndPoint,
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
        showToast("success", `Transaction broadcasted successfully with hash ${transactionHash}`);
      } else {
        showToast("error", `Transaction failed with code: ${code}`);
      }
    } catch (error) {
      showToast("error", `Transaction failed with message ${(error as Error)?.message}`);
      console.log(error);
    }

    // Create and sign the transaction
  };

  return { sendCosmosVote, getCosmosAddressSigner };
};
