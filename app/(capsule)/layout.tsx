import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen mx-auto max-w-7xl px-4 py-8 bg-background">
      {children}
    </div>
  );
};

export default AuthLayout;
