import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import Home from "./components/Home/Home";
import RequireAuth from "./routes/RequireAuth/RequireAuth";
import Login from "./components/LoginRegister/Login";
import NotFound from "./components/NotFound/NotFound";
import {useReactiveVar} from "@apollo/client";
import {darkModeVar} from "./apollo";
import {darkTheme, GlobalStyles, lightTheme} from "./styles";
import SignUp from "./components/LoginRegister/SignUp";

library.add(faInstagram);

function App() {
  
  const darkMode = useReactiveVar(darkModeVar);
  
  return (
    <div>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />}/>
            </Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
