import { SigningStargateClient } from "@cosmjs/stargate";
import { getCosmosOption, sleep } from "../../../utils/common";
// import { useConnectWallet, useDisconnetWallet } from "../../useConnectWallet";
import strideChainInfo from "../../../config/chains/Stride/stride_mainnet.json";

export const useStrideGovTxn = () => {
  const rpcEndPoints = strideChainInfo.apis.rpc;

  // const connectWallet = useConnectWallet();
  // const disconnectWallet = useDisconnetWallet();

  const sendStrideVote = async (proposalId: string, voteOption: string) => {
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
    await (window as any).keplr.enable("stride-1");

    const offlineSigner = await (window as any).keplr.getOfflineSigner();
    const address = await offlineSigner.getAccounts()[1].address;

    // Build the vote message
    const voteMsg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposal_id: proposalId,
        voter: address,
        option: getCosmosOption(voteOption),
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

    // const { accountNumber, sequence } = await client.getSequence(address);
    // const chainId = await client.getChainId();

    // const voteTx = {
    //   memo: "Vote on governance proposal",
    //   accountNumber: String(accountNumber),
    //   sequence: String(sequence),
    //   fee: fee,
    //   msgs: [voteMsg],
    //   chainId: chainId,
    // };

    // Sign and broadcast the transaction using Keplr
    // const { signedTx } = await (window as any).keplr.signAmino(
    //   // proposerAddress,
    //   [voteTx],
    //   fee.gas,
    //   chainId,
    //   "Vote on governance proposal"
    // );

    // {
    //   "account_number": "396871",
    //   "chain_id": "juno-1",
    //   "fee": {
    //     "gas": "87804",
    //     "amount": [
    //       {
    //         "amount": "6586",
    //         "denom": "ujuno"
    //       }
    //     ]
    //   },
    //   "memo": "",
    //   "msgs": [
    //     {
    //       "type": "cosmos-sdk/MsgVote",
    //       "value": {
    //         "option": 1,
    //         "proposal_id": "317",
    //         "voter": "juno1zd4guuajjyr5sdzzq52x8es4l4hmy5uvnweljh"
    //       }
    //     }
    //   ],
    //   "sequence": "0"
    // }

    const { transactionHash, code } = await client.signAndBroadcast(
      address,
      [voteMsg],
      Number(fee.gas),
      "Vote on governance proposal"
    );

    if (code === 0) {
      console.log("Transaction broadcasted successfully!");
    } else {
      console.error(`Transaction failed with code: ${code}`);
    }
  };

  return { sendStrideVote };
};
//voteOption may be either in the form 0,1,2,3,4,5 or VOTE_OPTION_YES,NO,NO_WITH_VETO,
