//! deprecated, i wont use it anymore

export const objIncludesTargetValue = (obj: any, targetValue: string) => {
  return Object.values(obj).some((value) => {
    if (typeof value === "string") {
      return value.includes(targetValue);
    }
    return false;
  });
};
