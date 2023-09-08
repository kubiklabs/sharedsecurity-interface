import { ILpCardProps } from "../components/Governance/LpCard";
import { IVpCardProps } from "../components/Governance/VpCard";
import { IVoteValueProps } from "./interface";

export const vpList: Array<IVpCardProps> = [
  {
    accountAddress: "neutron1...x0v",
    amountStaked: "1,234,234",
    denom: "NTRN",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron2...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron3...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron4...x0v",
    amountStaked: "1,234,234",
    denom: "NTRN",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron5...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron6...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
];

// export const lpList: Array<ILpCardProps> = [
//   {
//     endDate: "09/08",
//     endTime: "21:04",
//     proposalId: "821",
//     proposalTitle: "v12 Software Update",
//     tags: ["Cosmos", "Software Update"],
//     voteDistribution: {
//       YES: "66.11",
//       NO: "10.21",
//       ABSTAIN: "10.59",
//       VETO: "10.09",
//     },
//   },
//   {
//     endDate: "09/08",
//     endTime: "21:04",
//     proposalId: "214",
//     proposalTitle: "Stride v14 Software Update",
//     tags: ["Stride", "Software Update"],
//     voteDistribution: {
//       YES: "96.11",
//       NO: "1.21",
//       ABSTAIN: "1.59",
//       VETO: "1.09",
//     },
//   },
//   {
//     endDate: "09/08",
//     endTime: "21:04",
//     proposalId: "881",
//     proposalTitle: "v12 Software Update",
//     tags: ["Cosmos", "Software Update"],
//     voteDistribution: {
//       YES: "96.11",
//       NO: "1.21",
//       ABSTAIN: "1.59",
//       VETO: "1.09",
//     },
//   },
//   {
//     endDate: "09/08",
//     endTime: "21:04",
//     proposalId: "204",
//     proposalTitle: "Stride v14 Software Update",
//     tags: ["Stride", "Software Update"],
//     voteDistribution: {
//       YES: "96.11",
//       NO: "1.21",
//       ABSTAIN: "1.59",
//       VETO: "1.09",
//     },
//   },
// ];

export const tagColorMap = {
  Cosmos: "rgba(156, 108, 255, 0.80)",
  "Software Update": "rgba(255, 139, 74, 0.80)",
  Stride: "rgba(233, 17, 121, 0.80)",
};

export const bigSmallTextColorMap: IVoteValueProps = {
  YES: "#409F4E",
  NO: "rgba(190, 72, 58, 0.80)",
  ABSTAIN: "rgba(200, 136, 100, 0.80)",
  VETO: "rgba(212, 212, 212, 0.80)",
};
