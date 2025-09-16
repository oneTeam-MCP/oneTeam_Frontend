import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop.tsx";
import Home from "./tabs/home.tsx";
import LogIn from "./tabs/logIn.tsx";
import SignUp from "./tabs/signUp.tsx";
import Dashboard from "./tabs/main/dashboard.tsx";
import Calendar from "./tabs/main/calendar.tsx";
import Subject from "./tabs/main/subject.tsx";
import Chatbot from "./tabs/main/chatbot.tsx";
import Setting from "./tabs/main/setting.tsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
