import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userVpState } from "../context/userVpState";
import { coinConvert, shortenCosmosAddress } from "../utils/common";
import CosmosImg from "../assets/chains/cosmos.png";
import NeutronImg from "../assets/chains/neutron.jpg";
import StrideImg from "../assets/chains/stride.png";

const chainLogoImg = {
  Cosmos: CosmosImg,
  Neutron: NeutronImg,
  Stride: StrideImg,
};

const useVpTableEffect = () => {
  const userVp: any = useRecoilValue(userVpState);
  const [tableArray, setTableArray] = useState<any[]>([]);

  useEffect(() => {
    if (
      !userVp?.Cosmos?.Op ||
      !userVp?.Cosmos?.address ||
      !userVp?.Neutron?.Op ||
      !userVp?.Neutron?.address ||
      !userVp?.Stride?.Op ||
      !userVp?.Stride?.address
    )
      return;

    const updatedTableArray = Object.keys(userVp).map((chainKey) => {
      const chain = userVp[chainKey];

      // Check if chain is defined before accessing its properties
      if (chain) {
        return {
          Chain: {
            label: chainKey,
            type: "avatar",
            url: chainLogoImg[chainKey as keyof typeof chainLogoImg],
          },
          "Wallet Address": {
            type: "LINK",
            label: shortenCosmosAddress(chain.address),
            url: `https://www.mintscan.io/${chainKey.toLocaleLowerCase()}/address/${
              chain.address
            }`,
          },
          "Token Staked": `${coinConvert(chain.amount?.amount, 6, "human")} ${
            chain.amount?.denom
          }`,
          "Your Voting Power": `${chain.userVotingPower}%`,
          "Live/Total Proposals": `${chain?.Lp}/${chain?.Op}`,
        };
      } else {
        return null; // Handle the case where chain is undefined
      }
    });

    // Filter out null entries before setting the state
    setTableArray(updatedTableArray.filter((entry) => entry !== null));
  }, [userVp]);

  return tableArray;
};

export default useVpTableEffect;
