/**
 * Formats a number as currency (Indian Rupees)
 * @param {number} value - The value to format
 * @param {number} minimumFractionDigits - Minimum fraction digits (default: 0)
 * @param {number} maximumFractionDigits - Maximum fraction digits (default: 0)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (
  value,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0
) => {
  // Handle invalid or non-numeric values
  if (value === undefined || value === null || isNaN(value)) {
    return "₹0";
  }

  // Ensure parameters are within valid ranges (0-20)
  const minFractionDigits = Math.max(0, Math.min(20, minimumFractionDigits));
  const maxFractionDigits = Math.max(0, Math.min(20, maximumFractionDigits));

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits,
    }).format(value);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return `₹${value}`;
  }
};

/**
 * Formats a number as a percentage
 * @param {number} value - The value to format
 * @param {number} minimumFractionDigits - Minimum fraction digits (default: 1)
 * @param {number} maximumFractionDigits - Maximum fraction digits (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (
  value,
  minimumFractionDigits = 1,
  maximumFractionDigits = 1
) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value / 100);
};

/**
 * Formats a date string into a readable format
 * @param {string} dateString - The ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

/**
 * Abbreviates large numbers (e.g., 1,200,000 to 1.2M)
 * @param {number} value - The value to format
 * @returns {string} Abbreviated number string
 */
export const abbreviateNumber = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};
