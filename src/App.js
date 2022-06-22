import React, {Component} from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import './styles.css';
import Home from './components/Home'
import Users from './components/Users'
import Cities from './components/Cities'
import Streets from './components/Streets'
import Header from './components/Header'
import Auth from "./components/Auth";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/users" element={<Users />} />
                        <Route exact path="/cities" element={<Cities />} />
                        <Route exact path="/streets" element={<Streets />} />
                        <Route exact path="/Auth" element={<Auth />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
