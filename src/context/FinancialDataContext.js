import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { processPdfData } from "../services/pdfParser";
import { getDummyData } from "../data/dummyData";

const FinancialDataContext = createContext();

export const useFinancialData = () => useContext(FinancialDataContext);

export const FinancialDataProvider = ({ children }) => {
  const [financialData, setFinancialData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasData, setHasData] = useState(false);
  const navigate = useNavigate();

  // Load data from localStorage on initial mount
  useEffect(() => {
    const savedData = localStorage.getItem("financialData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFinancialData(parsedData);
        setHasData(true);
      } catch (e) {
        console.error("Error parsing saved data:", e);
        localStorage.removeItem("financialData");
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (financialData) {
      localStorage.setItem("financialData", JSON.stringify(financialData));
    }
  }, [financialData]);

  const processStatement = async (file) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await processPdfData(file);
      setFinancialData(data);
      setHasData(true);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to process bank statement. Please try again.");
      console.error("Error processing statement:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDummyData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dummyData = await getDummyData();
      setFinancialData(dummyData);
      setHasData(true);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to load dummy data. Please try again.");
      console.error("Error loading dummy data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetData = () => {
    setFinancialData(null);
    setHasData(false);
    localStorage.removeItem("financialData");
    navigate("/");
  };

  return (
    <FinancialDataContext.Provider
      value={{
        financialData,
        isLoading,
        error,
        hasData,
        processStatement,
        loadDummyData,
        resetData,
      }}
    >
      {children}
    </FinancialDataContext.Provider>
  );
};
