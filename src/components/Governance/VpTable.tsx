import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userVpState } from '../../context/userVpState';
import CustomTable from '../DataDisplay/CustomTable';
import { Box } from '@chakra-ui/react';
import CosmosImg from '../../assets/chains/cosmos.png';
import NeutronImg from '../../assets/chains/neutron.jpg';
import StrideImg from '../../assets/chains/stride.png';
import CustomSkeleton from '../skeleton/CustomSkeleton';
import { shortenCosmosAddress } from '../../utils/common';

const chainLogoImg = {
    Cosmos: CosmosImg,
    Neutron: NeutronImg,
    Stride: StrideImg
};


const VpTable = () => {
    const userVp: any = useRecoilValue(userVpState);

    const [tableArray, setTableArray] = useState<any[]>([]);

    useEffect(() => {
        if (!userVp?.Cosmos?.Lp) return;

        const updatedTableArray = Object.keys(userVp).map((chainKey) => {
            const chain = userVp[chainKey];

            // Check if chain is defined before accessing its properties
            if (chain) {
                return {
                    "Chain": {
                        label: chainKey,
                        type: "avatar",
                        url: chainLogoImg[chainKey as keyof typeof chainLogoImg]
                    },
                    "Wallet Address": shortenCosmosAddress(chain.address),
                    "Token Staked": `${chain.amount?.amount} ${chain.amount?.denom}`,
                    "Your Voting Power": `${chain.userVotingPower}%`,
                    "Live/Total Proposals": `${chain?.Lp}/${chain?.Op}`
                };
            } else {
                return null; // Handle the case where chain is undefined
            }
        });

        // Filter out null entries before setting the state
        setTableArray(updatedTableArray.filter((entry) => entry !== null));
    }, [userVp]);

    return (
        <Box>
            {tableArray.length === 0 ?
                <CustomSkeleton count={4} height="50px" /> : <CustomTable
                    keys={Object.keys(tableArray[0])}
                    data={tableArray}
                />}
        </Box>
    );
};

export default VpTable;
