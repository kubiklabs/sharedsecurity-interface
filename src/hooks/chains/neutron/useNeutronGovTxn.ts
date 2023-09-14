import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { getNeutronOption, sleep } from "../../../utils/common";
import { neutronSingleProposal } from "../../../config/chains/Neutron/contracts/SingleProposalModule";
import * as Long from "long";
enum Vote {
  Yes,
  No,
  Abstain,
}

export const useNeutronGovTxn = () => {
  const sendNeutronVote = async (proposalId: string, voteOption: string) => {
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
    await (window as any).keplr.enable("neutron-1");

    const offlineSigner = await (window as any).keplr.getOfflineSignerOnlyAmino(
      "neutron-1"
    );
    const address = await offlineSigner.getAccounts()[0]?.address;

    const client = await SigningCosmWasmClient.connectWithSigner(
      "https://rpc-kralum.neutron-1.neutron.org",
      offlineSigner
    );

    const { transactionHash } = await client.execute(
      address,
      neutronSingleProposal.at,
      {
        vote: {
          proposal_id: Long.default.fromString(proposalId, true),
          vote: Vote[getNeutronOption(voteOption) as any],
        },
      },
      { amount: [], gas: "700000" }
    );
    console.log(transactionHash);
  };

  return { sendNeutronVote };
};
