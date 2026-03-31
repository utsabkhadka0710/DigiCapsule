export const calculateUnlockTime = (unlockTime: Date) => {
  const currentTime = new Date();
  const unlockDate = new Date(unlockTime);

  const timeDifference = unlockDate.getTime() - currentTime.getTime();

  if (timeDifference <= 0) {
    return "Already unlocked";
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

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  }
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return "Less than a minute";
};
