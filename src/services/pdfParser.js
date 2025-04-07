import * as pdfjsLib from "pdfjs-dist";

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const processPdfData = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    // Extract text from all pages
    let extractedText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const textItems = textContent.items.map((item) => item.str);
      extractedText += textItems.join(" ") + "\n";
    }

    // This is a simplified example. In a real implementation,
    // you would need more sophisticated parsing based on the specific
    // format of the bank statements you're targeting.

    // For demo purposes, instead of actual parsing, we'll return mock data
    // that mimics what would be extracted from a real bank statement
    console.log("Extracted text from PDF:", extractedText);

    // In a real app, you would parse extractedText to get this data
    return generateMockDataFromPdf(extractedText);
  } catch (error) {
    console.error("Error processing PDF:", error);
    throw new Error(
      "Failed to process PDF file. Please check the file format and try again."
    );
  }
};

// Mock function to generate data as if it was parsed from a PDF
const generateMockDataFromPdf = (text) => {
  // This would normally analyze the text and extract real data
  // For demo purposes, we're returning structured mock data

  // Check if text contains some keywords to simulate "detection"
  const hasTransactions =
    text.toLowerCase().includes("transaction") ||
    text.toLowerCase().includes("payment");
  const hasBalance =
    text.toLowerCase().includes("balance") ||
    text.toLowerCase().includes("total");

  const mockData = {
    userProfile: {
      name: text.includes("Statement") ? "Alex Johnson" : "Jane Smith",
      email: "user@example.com",
      joinedDate: new Date().toISOString().split("T")[0],
    },
    summary: {
      netWorth: 285750 + Math.floor(Math.random() * 10000),
      totalExpenses: 48500 + Math.floor(Math.random() * 5000),
      totalInvestments: 175000 + Math.floor(Math.random() * 8000),
      totalSavings: 110750 + Math.floor(Math.random() * 6000),
      liquidAssets: 65750 + Math.floor(Math.random() * 4000),
    },
    monthlyData: generateRandomMonthlyData(),
    expenses: {
      categories: [
        {
          category: "Housing",
          amount: 18000 + Math.floor(Math.random() * 1000),
          percentage: 37.11,
        },
        {
          category: "Food",
          amount: 7200 + Math.floor(Math.random() * 500),
          percentage: 14.85,
        },
        {
          category: "Transportation",
          amount: 4800 + Math.floor(Math.random() * 300),
          percentage: 9.9,
        },
        {
          category: "Entertainment",
          amount: 3600 + Math.floor(Math.random() * 400),
          percentage: 7.42,
        },
        {
          category: "Healthcare",
          amount: 4500 + Math.floor(Math.random() * 500),
          percentage: 9.28,
        },
        {
          category: "Utilities",
          amount: 3000 + Math.floor(Math.random() * 200),
          percentage: 6.19,
        },
        {
          category: "Shopping",
          amount: 5500 + Math.floor(Math.random() * 600),
          percentage: 11.34,
        },
        {
          category: "Others",
          amount: 1900 + Math.floor(Math.random() * 200),
          percentage: 3.91,
        },
      ],
      monthly: generateMonthlyExpenses(),
      details: generateExpenseDetails(),
    },
    investments: generateInvestmentData(),
    savings: generateSavingsData(),
    insurance: generateInsuranceData(),
    transactions: generateTransactionData(),
  };

  return mockData;
};

// Helper functions to generate random financial data
const generateRandomMonthlyData = () => {
  const months = [
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
  const data = [];
  let netWorth = 260000;

  for (let i = 0; i < months.length; i++) {
    const expenses = 3000 + Math.floor(Math.random() * 2500);
    const investments = 2000 + Math.floor(Math.random() * 1500);
    const savings = 1000 + Math.floor(Math.random() * 1500);
    netWorth += savings + investments - 500;

    data.push({
      month: months[i],
      expenses,
      investments,
      savings,
      netWorth,
    });
  }

  return data;
};

const generateMonthlyExpenses = () => {
  const months = [
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
  const threshold = 4000;

  return months.map((month) => {
    const amount = 3000 + Math.floor(Math.random() * 2500);
    return {
      month,
      amount,
      threshold,
      isExceeded: amount > threshold,
    };
  });
};

const generateExpenseDetails = () => {
  const categories = [
    "Housing",
    "Food",
    "Transportation",
    "Entertainment",
    "Healthcare",
    "Utilities",
    "Shopping",
    "Others",
  ];
  const details = [];

  // Create expense entries for the past month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  for (let i = 1; i <= 15; i++) {
    const day = i * 2; // Spread throughout the month
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const category = categories[Math.floor(Math.random() * categories.length)];

    let description;
    let amount;

    switch (category) {
      case "Housing":
        description = ["Rent", "Mortgage Payment", "Property Tax"][
          Math.floor(Math.random() * 3)
        ];
        amount = 800 + Math.floor(Math.random() * 1200);
        break;
      case "Food":
        description = ["Grocery Shopping", "Restaurant", "Coffee Shop"][
          Math.floor(Math.random() * 3)
        ];
        amount = 20 + Math.floor(Math.random() * 200);
        break;
      case "Transportation":
        description = ["Gas", "Uber Rides", "Public Transit"][
          Math.floor(Math.random() * 3)
        ];
        amount = 15 + Math.floor(Math.random() * 100);
        break;
      default:
        description = `${category} Expense`;
        amount = 25 + Math.floor(Math.random() * 200);
    }

    details.push({ date, description, amount, category });
  }

  return details;
};

const generateInvestmentData = () => {
  return {
    total: 175000 + Math.floor(Math.random() * 10000),
    allocation: [
      {
        type: "Stocks",
        amount: 75000 + Math.floor(Math.random() * 5000),
        percentage: 42.86,
      },
      {
        type: "Bonds",
        amount: 35000 + Math.floor(Math.random() * 2000),
        percentage: 20,
      },
      {
        type: "Real Estate",
        amount: 45000 + Math.floor(Math.random() * 3000),
        percentage: 25.71,
      },
      {
        type: "Mutual Funds",
        amount: 15000 + Math.floor(Math.random() * 1000),
        percentage: 8.57,
      },
      {
        type: "Crypto",
        amount: 5000 + Math.floor(Math.random() * 500),
        percentage: 2.86,
      },
    ],
    performance: [
      { year: 2019, returns: 7.2 },
      { year: 2020, returns: -2.1 },
      { year: 2021, returns: 12.5 },
      { year: 2022, returns: -5.3 },
      { year: 2023, returns: 9.8 },
    ],
    holdings: [
      {
        name: "AAPL",
        value: 15000 + Math.floor(Math.random() * 1000),
        growth: 18.5,
      },
      {
        name: "MSFT",
        value: 18000 + Math.floor(Math.random() * 1000),
        growth: 22.3,
      },
      {
        name: "AMZN",
        value: 12000 + Math.floor(Math.random() * 1000),
        growth: 10.2,
      },
      {
        name: "GOOG",
        value: 14000 + Math.floor(Math.random() * 1000),
        growth: 15.7,
      },
      {
        name: "TSLA",
        value: 8000 + Math.floor(Math.random() * 1000),
        growth: -8.3,
      },
      {
        name: "US Treasury Bond",
        value: 35000 + Math.floor(Math.random() * 2000),
        growth: 3.2,
      },
      {
        name: "REIT Fund",
        value: 45000 + Math.floor(Math.random() * 2000),
        growth: 7.5,
      },
      {
        name: "S&P 500 Index",
        value: 15000 + Math.floor(Math.random() * 1000),
        growth: 11.2,
      },
      {
        name: "Bitcoin",
        value: 3000 + Math.floor(Math.random() * 500),
        growth: 42.5,
      },
      {
        name: "Ethereum",
        value: 2000 + Math.floor(Math.random() * 300),
        growth: 28.7,
      },
    ],
  };
};

const generateSavingsData = () => {
  return {
    total: 110750 + Math.floor(Math.random() * 5000),
    accounts: [
      {
        name: "Primary Savings",
        balance: 45000 + Math.floor(Math.random() * 2000),
        interestRate: 0.5,
      },
      {
        name: "Emergency Fund",
        balance: 25000 + Math.floor(Math.random() * 1000),
        interestRate: 0.75,
      },
      {
        name: "Vacation Fund",
        balance: 7500 + Math.floor(Math.random() * 500),
        interestRate: 0.5,
      },
      {
        name: "Home Down Payment",
        balance: 33250 + Math.floor(Math.random() * 1500),
        interestRate: 1.2,
      },
    ],
    goals: [
      {
        name: "Emergency Fund",
        target: 30000,
        current: 25000 + Math.floor(Math.random() * 1000),
        percentage: 83.33,
      },
      {
        name: "Vacation",
        target: 10000,
        current: 7500 + Math.floor(Math.random() * 500),
        percentage: 75,
      },
      {
        name: "Home Down Payment",
        target: 50000,
        current: 33250 + Math.floor(Math.random() * 1500),
        percentage: 66.5,
      },
    ],
    growth: [
      { year: 2019, amount: 78000 },
      { year: 2020, amount: 86500 },
      { year: 2021, amount: 92000 },
      { year: 2022, amount: 101200 },
      { year: 2023, amount: 110750 + Math.floor(Math.random() * 5000) },
    ],
  };
};

const generateInsuranceData = () => {
  return {
    life: {
      policies: [
        {
          provider: "MetLife",
          policyNumber: "ML-123456",
          coverageAmount: 500000,
          premium: 1200,
          beneficiaries: ["Jane Johnson", "Emma Johnson"],
          expiryDate: "2045-06-15",
        },
      ],
      totalCoverage: 500000,
      annualPremium: 1200,
    },
    medical: {
      policies: [
        {
          provider: "Blue Cross",
          policyNumber: "BC-789012",
          type: "Family Health Plan",
          coverageDetails:
            "Comprehensive health coverage including dental and vision",
          premium: 4800,
          deductible: 1500,
          expiryDate: "2023-12-31",
        },
      ],
      totalAnnualPremium: 4800,
      totalDeductible: 1500,
    },
    claims: [
      {
        date: "2023-03-12",
        type: "Medical",
        description: "Hospital visit",
        amount: 1200,
        status: "Approved",
      },
      {
        date: "2022-11-05",
        type: "Medical",
        description: "Prescription medication",
        amount: 350,
        status: "Approved",
      },
      {
        date: "2022-08-21",
        type: "Medical",
        description: "Specialist consultation",
        amount: 500,
        status: "Processing",
      },
    ],
  };
};

const generateTransactionData = () => {
  const transactions = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  for (let i = 1; i <= 30; i++) {
    if (i % 2 === 0) {
      // Add transaction every other day
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        i
      ).padStart(2, "0")}`;

      // Randomly decide if this is an income or expense
      const isIncome = Math.random() > 0.75;

      let category, description, amount;

      if (isIncome) {
        category = "Income";
        description = Math.random() > 0.5 ? "Salary Deposit" : "Client Payment";
        amount = 1000 + Math.floor(Math.random() * 5000);
      } else {
        const categories = [
          "Housing",
          "Food",
          "Transportation",
          "Entertainment",
          "Healthcare",
          "Utilities",
          "Shopping",
          "Investment",
          "Savings",
        ];
        category = categories[Math.floor(Math.random() * categories.length)];

        switch (category) {
          case "Housing":
            description = "Rent Payment";
            amount = -(1200 + Math.floor(Math.random() * 800));
            break;
          case "Food":
            description =
              Math.random() > 0.5 ? "Grocery Shopping" : "Restaurant";
            amount = -(50 + Math.floor(Math.random() * 200));
            break;
          case "Utilities":
            description = ["Electric Bill", "Water Bill", "Internet Bill"][
              Math.floor(Math.random() * 3)
            ];
            amount = -(40 + Math.floor(Math.random() * 120));
            break;
          case "Investment":
            description = "Investment Transfer";
            amount = -(500 + Math.floor(Math.random() * 2000));
            break;
          case "Savings":
            description = "Savings Transfer";
            amount = -(100 + Math.floor(Math.random() * 500));
            break;
          default:
            description = `${category} Expense`;
            amount = -(20 + Math.floor(Math.random() * 150));
        }
      }

      transactions.push({ date, description, amount, category });
    }
  }

  // Sort by date in descending order
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};
