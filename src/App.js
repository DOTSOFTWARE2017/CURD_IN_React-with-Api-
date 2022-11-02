import "./App.css";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Read from "./components/Read";
import User from "./components/userData";
import Todo from "./components/Todo";
import { Navbar } from "./components/Nav";

function App() {
  return (
    
    <Router>
      <Navbar/>
      <div className="App">
        <div className="main">
          
          <div className="main-header">API Rect</div>
          <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/read" element={<Read />} />
          <Route exact path='/APIData/:id' element={<User/>}></Route>
          <Route exact path='/todo' element={<Todo/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
