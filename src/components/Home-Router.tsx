import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useParams
} from "react-router-dom";
import FoodPage from './Food/FoodPage';
import DiaryPage from './Diary/DiaryPage';

export const Home: React.FC = () => {
    return (
        <div className="Home">
            <h2>Home</h2>
        </div>
    );
}

export const FoodApp: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App-content">
                <ul className="NavBar">
                    <li>
                        <div className="hoverEffect">
                            <Link to="/">Home</Link>
                        </div>
                    </li>
                    <li>
                        <div className="hoverEffect">
                            <Link to="/food">Food</Link>
                        </div>
                    </li>
                    <li>
                        <div className="hoverEffect">
                            <Link to="/diary">Diary</Link>
                        </div>
                    </li>
                </ul>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/food" element={<FoodPage />} />
                    <Route path="/diary" element={<DiaryPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
