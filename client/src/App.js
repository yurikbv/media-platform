import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import RequireAuth from "./routes/RequireAuth/RequireAuth";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";


function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}/>
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
