import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Create from "./Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
	<Routes>
		<Route path="/" element = { <Home/> } />
		<Route path="/create" element = { <Create/> } />
		<Route path="*" element = { <Home/> } />
	</Routes>
     </BrowserRouter>
);
}
export default App;