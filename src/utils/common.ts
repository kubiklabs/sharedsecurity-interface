import { Decimal } from "decimal.js";
import { ILpCardProps } from "../components/Governance/LpCard";
// import { networkConstants } from "./constants";

// The number set here is an arbitrary number.
Decimal.set({ toExpPos: 50 });

// Convert to/from human and machine.
export function coinConvert(
  number: number | string,
  decimals: number,
  type?: "human" | "machine",
  fixed?: number
): string {
  if (!number) return "";

  let theNumber = number;
  if (typeof number === "number") {
    theNumber = number.toString();
  }

  let result: Decimal;
  if ((theNumber as string).indexOf(".") === -1) {
    // In case `number` is an integer
    if (type && type === "machine") {
      result = new Decimal(10).toPower(decimals).times(number);
    } else {
      result = new Decimal(number).dividedBy(new Decimal(10).toPower(decimals));
    }

    if (typeof fixed !== "undefined") {
      return result.toFixed(fixed);
    }
  } else {
    // In case is not an integer, we just handle it as float
    if (type && type === "human") {
      result = new Decimal(number);
    } else {
      result = new Decimal(10).toPower(decimals).times(number);
    }

    if (typeof fixed !== "undefined") {
      return result.toFixed(fixed);
    }
  }
  return result.toString();
}

export function sleep(seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export const parseIsoTimeString = (time: string) => {
  const utcTime = new Date(time);
  const localeStringFormat = utcTime.toLocaleString();
  const localeTimeOnly = utcTime.toLocaleTimeString();
  const localeDateOnly = utcTime.toDateString();

  return {
    utcTime,
    localeDateOnly,
    localeStringFormat,
    localeTimeOnly,
  };
};

export const parseNanosecondTimeString = (time: string) => {
  const utcTime = new Date(Number(time) / 1000000);
  const localeStringFormat = utcTime.toLocaleString();
  const localeTimeOnly = utcTime.toLocaleTimeString();
  const localeDateOnly = utcTime.toDateString();
  return {
    utcTime,
    localeDateOnly,
    localeStringFormat,
    localeTimeOnly,
  };
};

export const compareProposals = (a: ILpCardProps, b: ILpCardProps) => {
  const endDateComparison =
    new Date(b.endDate + " " + b.endTime).getTime() -
    new Date(a.endDate + " " + a.endTime).getTime();
  if (endDateComparison !== 0) {
    return endDateComparison;
  }

  // If end dates are the same, compare by endTime
  return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
};

export const getCosmosOption = (option: string) => {
  switch (option) {
    case "YES":
      return 1;
    case "ABSTAIN":
      return 2;
    case "NO":
      return 3;
    case "VETO":
      return 4;
    default:
      break;
  }
};
export const getNeutronOption = (option: string) => {
  switch (option) {
    case "YES":
      return "Yes";
    case "NO":
      return "No";
    case "ABSTAIN":
      return "Abstain";
    default:
      break;
  }
};
