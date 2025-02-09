import { createContext, useContext, useState, useCallback } from "react";

/**
 * ErrorContext provides a way to handle and display errors in the application.
 */
const ErrorContext = createContext();

/**
 * Custom hook to use the ErrorContext.
 *
 * @returns {Object} The context value containing the error and handleError function.
 */
export function useError() {
  return useContext(ErrorContext);
}

/**
 * ErrorProvider component that provides error handling functionality to its children.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children components that will have access to the error context.
 * @returns {JSX.Element} The rendered ErrorProvider component.
 */
export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  /**
   * Handles errors by setting the error state and optionally clearing it after a timeout.
   *
   * @param {string} message - The error message to display.
   */
  const handleError = useCallback((message) => {
    console.error("Captured error:", message);
    setError(message);

    // Optionally clear the error after a few seconds
    setTimeout(() => setError(null), 5000);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
          {error}
        </div>
      )}
    </ErrorContext.Provider>
  );
}
