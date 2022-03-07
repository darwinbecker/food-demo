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
            <section>
                <p>This is a small demo of my food project, that I sometimes work on.</p>
                <p>
                    In this project you can display and calculate the nutritional values of a specific food item.
                    You can also filter items by the given tags and combine these tags to get a more specific search result.
                </p>
                <p>
                    All data was colelcted by myslef and I stored the data in a mySQL database.
                    For this project however, I will fetch the data from a .json file, since I didn't deploy my backend project yet.
                </p>

                <p>In the future you should also be able to save one or more food items to your own personal food diary.</p>

                <p>My ideas for the diary section:</p>

                <li>Keep track of all food items that the user has had added before</li>
                <li>Create a calendar to sort all diary entries by date</li>
                <li>Edit and delete a diary entry</li>
            </section>
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
