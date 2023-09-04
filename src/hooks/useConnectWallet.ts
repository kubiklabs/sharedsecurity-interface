import { useRecoilValue, useSetRecoilState } from "recoil";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

import { walletState } from "../context/walletState";
// import { networkConstants } from "../utils/constants";
import { coinConvert, sleep } from "../utils/common";
import { useContext } from "react";
import { UserContext } from "../context/userState";
// import { useMessageToaster } from "./useMessageToaster";
// import { toast } from "react-toastify";
import { useChainInfo } from "./useChainInfo";
import { networkState } from "../context/networkState";
import { useNavigate } from "react-router-dom";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useDisconnetWallet = () => {
  const setWalletState = useSetRecoilState(walletState);
  //   const { Success } = useMessageToaster();
  return () => {
    /*
     *Change Login status in the local storage
     */
    sessionStorage.setItem("isLoggedIn", "false");
    /*
     *Reset the wallet state
     */
    setWalletState({
      client: undefined,
      address: undefined,
      shortAddress: undefined,
      balance: undefined,
      nickName: undefined,
    });
    // Success("Wallet Disconnected!");
  };
};

export const useConnectWallet = () => {
  const { setIsLoggingIn } = useContext(UserContext);
  const setWalletState = useSetRecoilState(walletState);
  let activeNetwork = localStorage.getItem("activeNetworkChainId");
  if (!activeNetwork)
    localStorage.setItem("activeNetworkChainId", "cosmoshub-4");
  const chainInfo = useChainInfo(
    localStorage.getItem("activeNetworkChainId") as string
  );
  const baseDenom = chainInfo.getChainDenom();
  // const navigate = useNavigate();

  // const { network } = useRecoilValue(networkState);
  // const toaster = useMessageToaster();

  return async () => {
    // const tid = toast.loading("Connecting to wallet");
    try {
      setIsLoggingIn(true);
      console.log("1");

      while (
        !(window as any).keplr ||
        !(window as any).getEnigmaUtils ||
        !(window as any).getOfflineSignerOnlyAmino
      ) {
        await sleep(0.5);
      }

      console.log("1");

      //   await (window as any).keplr.experimentalSuggestChain(
      //     chainInfo.getChainInfoData()
      //   );
      console.log("1");

      await (window as any).keplr.enable(chainInfo.getChainId());

      console.log("1");

      const offlineSigner = (window as any).keplr.getOfflineSignerOnlyAmino(
        chainInfo.getChainId()
      );

      const [{ address }] = await offlineSigner.getAccounts();

      const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
        chainInfo.getRpcUrl(),
        offlineSigner
      );

      const balance = await wasmChainClient.getBalance(address, baseDenom);

      const walletName = await (window as any).keplr.getKey(
        chainInfo.getChainId()
      );

      // toast.update(tid, {
      //   type: "success",
      //   render: `Keplr is connected!`,
      //   isLoading: false,
      //   autoClose: 5000,
      // });

      /* successfully update the wallet state */
      setWalletState({
        address: address,
        shortAddress:
          address.substr(0, 8) + "..." + address.substr(address.length - 3, 3),
        balance: {
          amount: coinConvert(balance.amount, 18, "human"),
          denom: balance.denom,
        },
        client: wasmChainClient,
        nickName: walletName.name,
      });
      sessionStorage.setItem("isLoggedIn", "true");

      // TODO: make an efficient method to check the keplr account switch, instead of checking every second
      setInterval(async () => {
        const tmepdata = await offlineSigner.getAccounts();
        const temp = tmepdata[0]?.address;
        if (temp === address) {
          await sleep(2);
        } else {
          //   navigate("/");
          window.location.reload();
        }
      }, 4000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingIn(false);
    }
  };
};
