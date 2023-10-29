import { useSetRecoilState } from "recoil";
import { walletState } from "../context/walletState";
import { sleep } from "../utils/common";
import { useChainInfo } from "./useChainInfo";
import { toast } from "react-toastify";

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
    toast.success("Keplr is Disconnected");

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
  // const navigate = useNavigate();

  // const { network } = useRecoilValue(networkState);
  // const toaster = useMessageToaster();

  return async () => {
    // const tid = toast.loading("Connecting to wallet");
    try {
      // setIsLoggingIn(true);

      while (
        !(window as any).keplr ||
        !(window as any).getEnigmaUtils ||
        !(window as any).getOfflineSignerOnlyAmino
      ) {
        await sleep(0.5);
      }

      // console.log("1");

      // //   await (window as any).keplr.experimentalSuggestChain(
      // //     chainInfo.getChainInfoData()
      // //   );
      // console.log("1");

      await (window as any).keplr.enable("cosmoshub-4");
      await (window as any).keplr.enable("stride-1");
      await (window as any).keplr.enable("neutron-1");

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

      // const wasmChainClient = await SigningCosmWasmClient.connectWithSigner(
      //   chainInfo.getRpcUrl(),
      //   offlineSigner
      // );

      // const balance = await wasmChainClient.getBalance(address, baseDenom);

      // const walletName = await (window as any).keplr.getKey(
      //   chainInfo.getChainId()
      // );

      /* successfully update the wallet state */
      setWalletState({
        Cosmos: cosmosAddress,
        Stride: strideAddress,
        Neutron: neutronAddress,
        isLoggedIn: true,
        name: walletName,
      });
      sessionStorage.setItem("isLoggedIn", "true");
      toast.success("Keplr is connected");

      // TODO: make an efficient method to check the keplr account switch, instead of checking every second
      // setInterval(async () => {
      //   const tmepdata = await offlineSigner.getAccounts();
      //   const temp = tmepdata[0]?.address;
      //   if (temp === address) {
      //     await sleep(2);
      //   } else {
      //     //   navigate("/");
      //     window.location.reload();
      //   }
      // }, 4000);
    } catch (error) {
      console.log(error);
    }
  };
};
