import { Decimal } from "decimal.js";
import { ILpCardProps } from "../components/Governance/LpCard";
import {
  assetChainMap,
  cosmosVoteOptionMap,
  neutronVoteOptionMap,
} from "./constant";
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
export const getCommonVoteOption = (vote: string) => {
  const commonVoteMap = { ...cosmosVoteOptionMap, ...neutronVoteOptionMap };
  return commonVoteMap[vote as keyof typeof commonVoteMap];
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
      return "yes";
    case "NO":
      return "no";
    case "ABSTAIN":
      return "abstain";
    default:
      break;
  }
};

export const getShortHandAddress = (address: string) =>
  address.substr(0, 8) + "..." + address.substr(address.length - 3, 3);

export const getSymbolFromName = (name: string) => {
  return assetChainMap[name as keyof typeof assetChainMap].symbol;
};
export const getDenomFromName = (name: string) => {
  return assetChainMap[name as keyof typeof assetChainMap].symbol;
};

export const shortenString = (
  inputString: string,
  maxLength: number
): string => {
  if (inputString.length > maxLength) {
    return inputString.slice(0, maxLength - 3) + "...";
  } else {
    return inputString;
  }
};

export const convertDateFormat = (dateString: string) => {
  const dateObject: Date = new Date(dateString);

  const day: number = dateObject.getDate();
  const month: number = dateObject.getMonth();

  const paddedDay: string = day < 10 ? `0${day}` : `${day}`;
  const paddedMonth: string = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;

  return `${paddedDay}/${paddedMonth}`;
};

export const removeSecondsFromTime = (timeString: string) => {
  const [hour, minute, second] = timeString.split(":");

  const modifiedTimeString: string = `${hour}:${minute}`;

  return modifiedTimeString;
};

export const shortenCosmosAddress = (address: string) => {
  const prefix = address.substring(0, 12);

  const suffix = address.substring(address.length - 4);

  const shortenedAddress = `${prefix}...${suffix}`;

  return shortenedAddress;
};

export const calculateDaysLeft = (targetDate: string) => {
  const currentDate: Date = new Date();
  const targetDateString: string[] = targetDate.split("/");
  const targetYear: number = parseInt(targetDateString[2]);
  const targetMonth: number = parseInt(targetDateString[1]) - 1; // Month is zero-based
  const targetDay: number = parseInt(targetDateString[0]);

  const targetDateTime: Date = new Date(targetYear, targetMonth, targetDay);

  // Set hours, minutes, seconds, milliseconds to 0 for accurate calculation
  targetDateTime.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const difference: number = targetDateTime.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const days: number = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return days;
};

export const calculateAverageCommissionRate = (validators: any) => {
  let totalCommission = 0;

  // Loop through each validator and sum up the commission rates
  for (const validator of validators) {
    totalCommission += parseFloat(validator["Commision Rate"].replace("%", ""));
  }

  // Calculate the average commission rate
  const averageCommission = totalCommission / validators.length;

  return averageCommission;
};

export function formatNumberWithSuffix(number: number) {
  const suffixes = ["", "K", "M", "B", "T"];
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier === 0) return number;

  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaledNumber = number / scale;

  // Format the number with a fixed number of decimal places
  const formattedNumber = scaledNumber.toFixed(3);

  return formattedNumber + " " + suffix;
}
