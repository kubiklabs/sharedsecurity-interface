import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { useEffect, useState } from "react";
import { useChainInfo } from "../../useChainInfo";
import { neutronSingleProposal } from "../../../config/chains/Neutron/contracts/SingleProposalModule";

export const useNeutronQuery = () => {
  const { getRpcUrl } = useChainInfo("neutron-1");
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();

  useEffect(() => {
    createQueryClient();
  }, []);

  const createQueryClient = async () => {
    const queryClient = await CosmWasmClient.connect(getRpcUrl());
    setQueryClient(queryClient);
    return queryClient;
  };

  const getNeutronProposals = async () => {
    const response = await queryClient?.queryContractSmart(
      neutronSingleProposal.at,
      {
        list_proposals: {},
      }
    );

    console.log(response);
    return response;
  };

  return { createQueryClient, getNeutronProposals };
};
