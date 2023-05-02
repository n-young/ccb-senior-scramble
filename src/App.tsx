import { useEffect, useState } from "react";
import { CircularProgress, Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./config/firebase";
import Guard from "./components/Guard";
import { routes } from "./config/routes";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <Guard guards={route.guards}>
                <route.component />
              </Guard>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
