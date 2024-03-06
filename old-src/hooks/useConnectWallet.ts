import { useSetRecoilState } from "recoil";
import { walletState } from "../context/walletState";
import { sleep } from "../utils/common";
import { useChainInfo } from "./useChainInfo";
import { toast } from "react-toastify";
import showToast from "../utils/showToast";

export interface Coin {
  readonly denom: string;
  readonly amount: string;
}

export const useDisconnetWallet = () => {
  const setWalletState = useSetRecoilState(walletState);
  return () => {
    console.log("called");

    /*
     *Change Login status in the local storage
     */
    sessionStorage.setItem("isLoggedIn", "false");
    /*
     *Reset the wallet state
     */
    setWalletState({
      Stride: undefined,
      Cosmos: undefined,
      Neutron: undefined,
      name: undefined,
      isLoggedIn: false,
    });
    showToast("success", "Keplr is Disconnected");
    // Success("Wallet Disconnected!");
  };
};

export const useConnectWallet = () => {
  // const { setIsLoggingIn } = useContext(UserContext);
  const setWalletState = useSetRecoilState(walletState);
  let activeNetwork = localStorage.getItem("activeNetworkChainId");
  if (!activeNetwork)
    localStorage.setItem("activeNetworkChainId", "cosmoshub-4");
  const chainInfo = useChainInfo(
    localStorage.getItem("activeNetworkChainId") as string
  );
  const baseDenom = chainInfo.getChainDenom();

  return async () => {
    // const tid = toast.loading("Connecting to wallet");
    try {
      if (!(window as any).keplr) {
        showToast("error", "Keplr Wallet not installed !");
        return;
      }
      while (
        !(window as any).keplr ||
        !(window as any).getEnigmaUtils ||
        !(window as any).getOfflineSignerOnlyAmino
      ) {
        await sleep(0.5);
      }

      await (window as any).keplr.enable([
        "cosmoshub-4",
        "stride-1",
        "neutron-1",
      ]);
      // await (window as any).keplr.enable("stride-1");
      // await (window as any).keplr.enable("neutron-1");

      const cosmosOfflineSigner = (
        window as any
      ).keplr.getOfflineSignerOnlyAmino("cosmoshub-4");
      const strideOfflineSigner = (
        window as any
      ).keplr.getOfflineSignerOnlyAmino("stride-1");
      const neutronOfflineSigner = (
        window as any
      ).keplr.getOfflineSignerOnlyAmino("neutron-1");

      const cosmosAddress = (await cosmosOfflineSigner.getAccounts())[0]
        ?.address;
      const strideAddress = (await strideOfflineSigner.getAccounts())[0]
        ?.address;
      const neutronAddress = (await neutronOfflineSigner.getAccounts())[0]
        ?.address;
      const walletName = (
        await (window as any).keplr.getKey(chainInfo.getChainId())
      ).name;

      /* successfully update the wallet state */
      setWalletState({
        Cosmos: cosmosAddress,
        Stride: strideAddress,
        Neutron: neutronAddress,
        isLoggedIn: true,
        name: walletName,
      });
      sessionStorage.setItem("isLoggedIn", "true");
      showToast("success", "Keplr is connected");
    } catch (error) {
      console.log(error);
    }
  };
};
