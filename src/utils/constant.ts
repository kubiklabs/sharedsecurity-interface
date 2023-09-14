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
  Neutron: "#24684c",
};

export const bigSmallTextColorMap: IVoteValueProps = {
  YES: "#409F4E",
  NO: "rgba(190, 72, 58, 0.80)",
  ABSTAIN: "rgba(200, 136, 100, 0.80)",
  VETO: "rgba(212, 212, 212, 0.80)",
};

export const cosmosStatusMap = {
  PROPOSAL_STATUS_DEPOSIT_PERIOD: {
    pretty: "Deposit",
    bg: "skyblue",
  },
  /**
   * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
   *  period.
   */
  PROPOSAL_STATUS_VOTING_PERIOD: {
    pretty: "Vote Now",
    bg: "#BC3D70",
  },
  /**
   * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
   *  passed.
   */
  PROPOSAL_STATUS_PASSED: {
    pretty: "Passed",
    bg: "green",
  },
  /*
   * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
   *  been rejected.
   */
  PROPOSAL_STATUS_REJECTED: {
    pretty: "Rejected",
    bg: "red",
  },
  /**
   * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
   *  failed.
   */
  PROPOSAL_STATUS_FAILED: {
    pretty: "Failed",
    bg: "orange",
  },
  UNRECOGNIZED: {
    pretty: "Unrecognised",
    bg: "gray",
  },
};

export const neutronStatusMap = {
  /// The proposal is open for voting.
  open: {
    pretty: "Vote Now",
    bg: "#BC3D70",
  },
  /// The proposal has been rejected.
  rejected: {
    pretty: "Rejected",
    bg: "red",
  },
  /// The proposal has been passed but has not been executed.
  passed: {
    pretty: "Passed",
    bg: "green",
  },
  /// The proposal has been passed and executed.
  executed: {
    pretty: "Executed",
    bg: "green",
  },
  /// The proposal has failed or expired and has been closed. A
  /// proposal deposit refund has been issued if applicable.
  closed: {
    pretty: "Closed",
    bg: "gray",
  },
  /// The proposal's execution failed.
  execution_failed: {
    pretty: "Failed",
    bg: "orange",
  },
};
