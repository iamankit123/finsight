import { formatCurrency as baseFormatCurrency } from "./formatters";

/**
 * Special formatter for charts that handles extreme values and undefined values
 * that might be passed by chart libraries
 */
export const chartCurrencyFormatter = (value) => {
  // Many chart libraries can call formatters with undefined, null, or NaN values
  if (value === undefined || value === null || isNaN(value)) {
    return "₹0";
  }

  // Charts sometimes send extreme values as ticks
  if (Math.abs(value) > 1e15) {
    return "₹∞";
  }

  return baseFormatCurrency(value);
};

/**
 * Percentage formatter for charts
 */
export const chartPercentFormatter = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return "0%";
  }

  return `${value.toFixed(1)}%`;
};
