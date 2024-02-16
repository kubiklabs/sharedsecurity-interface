export type assetType = {
    amount: number,
    value: number,
    name: {
        label: string,
        type: string,
        url: string
    }
}

export type assetPieType = {
    labels: string[];
    datasets: number[];
}