import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Component that checks that a set of conditions has been met to protect pages.
interface GuardProps {
  guards: (() => Promise<boolean>)[];
  children: React.ReactNode;
}
const Guard = ({ guards, children }: GuardProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Each time we move locations, check all of the guards for this 
  useEffect(() => {
    Promise.all(guards.map(f => f())).then(res => {
      if (!res.every(x => x)) {
        navigate("/error");
      }
    });
  }, [location, guards, navigate]);

  return <>{children}</>;
};

export default Guard;
