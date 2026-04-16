type UnlockTimeResult = {
  year: number;
  month: string;
  day: number;
  hour: number;
  minutes: number;
  message: string;
};

export const calculateUnlockTime = (unlockTime: Date): UnlockTimeResult => {
  const currentTime = new Date();
  const unlockDate = new Date(unlockTime);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const unlockMonthName = monthNames[unlockDate.getMonth()];
  const unlockYear = unlockDate.getFullYear();
  const unlockDay = unlockDate.getDate();
  const unlockHour = unlockDate.getHours();
  const unlockMinutes = unlockDate.getMinutes();

  const timeDifference = unlockDate.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
    return {
      year: unlockYear,
      month: unlockMonthName,
      day: unlockDay,
      hour: unlockHour,
      minutes: unlockMinutes,
      message: "less than 30 minutes",
    };
  }

  // Calculate years
  const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
  let remaining = timeDifference - years * (1000 * 60 * 60 * 24 * 365);

  // Calculate months
  const months = Math.floor(remaining / (1000 * 60 * 60 * 24 * 30));
  remaining -= months * (1000 * 60 * 60 * 24 * 30);

  // Calculate weeks
  const weeks = Math.floor(remaining / (1000 * 60 * 60 * 24 * 7));
  remaining -= weeks * (1000 * 60 * 60 * 24 * 7);

  // Calculate days
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  remaining -= days * (1000 * 60 * 60 * 24);

  // Calculate hours
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  remaining -= hours * (1000 * 60 * 60);

  // Calculate minutes
  const minutes = Math.floor(remaining / (1000 * 60));

  const result: UnlockTimeResult = {
    year: unlockYear,
    month: unlockMonthName,
    day: unlockDay,
    hour: unlockHour,
    minutes: unlockMinutes,
    message: "Less than a minute",
  };

  if (years > 0) {
    result.message = `${years} year${years > 1 ? "s" : ""}`;
    return result;
  }
  if (months > 0) {
    result.message = `${months} month${months > 1 ? "s" : ""}`;
    return result;
  }
  if (weeks > 0) {
    result.message = `${weeks} week${weeks > 1 ? "s" : ""}`;
    return result;
  }
  if (days > 0) {
    result.message = `${days} day${days > 1 ? "s" : ""}`;
    return result;
  }
  if (hours > 0) {
    result.message = `${hours} hour${hours > 1 ? "s" : ""}`;
    return result;
  }
  if (minutes > 0) {
    result.message = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    return result;
  }

  return result;
};
