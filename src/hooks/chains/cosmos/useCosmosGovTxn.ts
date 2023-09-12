import { SigningStargateClient } from "@cosmjs/stargate";
import { sleep } from "../../../utils/common";
import { useConnectWallet, useDisconnetWallet } from "../../useConnectWallet";
import cosmosChainInfo from "../../../config/chains/CosmosHub/cosmos_mainnet.json";

const useCosmosGovTxn = () => {
  const rpcEndPoints = cosmosChainInfo.apis.rpc;

  const connectWallet = useConnectWallet();
  const disconnectWallet = useDisconnetWallet();

  const signAndVote = async (proposalId: string, voteOption: string) => {
    while (
      !(window as any).keplr ||
      !(window as any).getEnigmaUtils ||
      !(window as any).getOfflineSignerOnlyAmino
    ) {
      await sleep(0.5);
    }

    // disconnectWallet();
    // await connectWallet();

    // Enable Keplr and request access to the wallet
    await (window as any).keplr.enable("cosmoshub-4");

    const offlineSigner = (window as any).keplr.getOfflineSigner();
    const address = await offlineSigner.getAccounts()[0].address;

    // Build the vote message
    const voteMsg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposal_id: proposalId,
        voter: address,
        option: voteOption,
      },
    };

    // Create and sign the transaction
    const client = await SigningStargateClient.connectWithSigner(
      rpcEndPoints[0].address,
      offlineSigner
    );
    const fee = {
      amount: [],
      gas: "200000", // Adjust gas limit as needed
    };

    const { accountNumber, sequence } = await client.getSequence(address);
    const chainId = await client.getChainId();

    const voteTx = {
      memo: "Vote on governance proposal",
      accountNumber: String(accountNumber),
      sequence: String(sequence),
      fee: fee,
      msgs: [voteMsg],
      chainId: chainId,
    };

    // Sign and broadcast the transaction using Keplr
    const { signedTx } = await (window as any).keplr.signAmino(
      // proposerAddress,
      [voteTx],
      fee.gas,
      chainId,
      "Vote on governance proposal"
    );

    const { transactionHash, code } = await client.broadcastTx(signedTx);

    if (code === 0) {
      console.log("Transaction broadcasted successfully!");
    } else {
      console.error(`Transaction failed with code: ${code}`);
    }
  };
};
