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

const x = {
  id: 1,
  proposal: {
    allow_revoting: true,
    description: "test",
    expiration: {
      at_time: "1687278379554701487",
    },
    min_voting_period: null,
    msgs: [],
    proposer: "neutron1g9thjuyfc4g4apcp8g5eltpglwqdvu4hw9ye40",
    start_height: 519783,
    status: "rejected",
    threshold: {
      threshold_quorum: {
        quorum: {
          percent: "0.1",
        },
        threshold: {
          percent: "0.5",
        },
      },
    },
    title: "test",
    total_power: "36128102537296",
    votes: {
      abstain: "498702770899",
      no: "20404641798",
      yes: "468277813819",
    },
  },
};
