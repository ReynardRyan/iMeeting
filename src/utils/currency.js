export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "";
  const strValue = value.toString().replace(/\D/g, "");
  if (!strValue) return "";
  return new Intl.NumberFormat("id-ID").format(strValue);
};

export const formatCurrencyWithSymbol = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
