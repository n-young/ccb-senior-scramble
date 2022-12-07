import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  guards: (() => Promise<boolean>)[]
  children: React.ReactNode;
}

const Guard = ({ guards, children }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all(guards.map(f => f())).then(res => {
      if (!res.every(x => x)) {
        navigate("/login")
      }
    })
  }, [location]);

  return <>{children}</>;
};

export default Guard;
