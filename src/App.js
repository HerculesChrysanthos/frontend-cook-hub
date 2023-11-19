import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import About from './pages/About';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryNavbar from './components/CategoryNavbar/CategoryNavbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div style={{ margin: '5px' }}></div>
        <CategoryNavbar />
        <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/recipes" exact component={Recipes} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
