import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import Home from "./components/Home/Home";
import RequireAuth from "./routes/RequireAuth/RequireAuth";
import Login from "./components/LoginRegister/Login";
import NotFound from "./components/NotFound/NotFound";
import {useReactiveVar} from "@apollo/client";
import { HelmetProvider } from 'react-helmet-async';
import {darkModeVar} from "./apollo";
import {darkTheme, GlobalStyles, lightTheme} from "./styles";
import SignUp from "./components/LoginRegister/SignUp";
import routes from "./routes_var";

library.add(faInstagram);

function App() {
  
  const darkMode = useReactiveVar(darkModeVar);
  
  return (
    <div>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route element={<RequireAuth />}>
                <Route path={routes.home} element={<Home />}/>
              </Route>
              <Route path={routes.login} element={<Login/>} />
              <Route path={routes.signup} element={<SignUp/>} />
              <Route path={routes.notFound} element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </div>
  );
}

export default App;
