export type assetType = {
    total_supply: number,
    total_amount: number,
    name: {
        label: string,
        type: string,
        url: string
    }
}

export type assetPieType = {
    name: string;
    value: number;
}