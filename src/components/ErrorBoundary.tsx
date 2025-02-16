import { AlertCircle } from "lucide-react"; // Example icon from lucide-react
import React, { ReactNode } from "react";
import { ErrorBoundary as Boundary } from "react-error-boundary";
import { Button } from "./ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorFallback = ({ resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-destructive text-destructive-foreground">
      <AlertCircle className="w-16 h-16 mb-4" />
      <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
      {/* <p className="mt-2">{error.message}</p> */}
      <Button onClick={resetErrorBoundary} className="mt-4" variant={"secondary"}>
        Try again
      </Button>
    </div>
  );
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  return (
    <Boundary
      FallbackComponent={ErrorFallback}
      onReset={(details) => {
        console.log(details);
      }}
    >
      {children}
    </Boundary>
  );
};

export default ErrorBoundary;
