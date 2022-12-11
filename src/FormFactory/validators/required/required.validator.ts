export const VALIDATOR_REQUIRED = (value: any) => {
  if (value === undefined) {
    throw "VALIDATOR_REQUIRED value should not be undefined";
  }
  const isNoValue: boolean = !value || value === "";

  return isNoValue ? { required: true } : null;
};
