import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate
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
                    In this project, you can display and calculate the nutritional values of a specific food item.
                    You can also filter items by the given tags and combine these tags to get a more specific search result.
                </p>
                <p>
                    All data was collected by myself and I stored it in a mySQL database.
                    However, for this project I will fetch the data from a .json file, since I haven't deployed my backend project yet.
                    For now, I only have 35 food-items in my database, but I think this is more than enough to showcase the basic usage and functionalities of my application.
                </p>

                <p>
                    In the future, I want to implement a diary, where you should be able to save one or more food items to your own personal food diary.
                </p>

                <p>My ideas for the diary section:</p>

                <li>Keep track of all food items that the user has added before</li>
                <li>Create a calendar to sort all diary entries by date</li>
                <li>Edit and delete a diary entry</li>

                <div className="githubLink">
                    <a href="https://github.com/darwinbecker" target="_blank">
                        <i className="bi bi-github"></i>
                        <span>Darwin Becker</span>
                    </a>
                </div>
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
                            <Link to="/food-demo">Home</Link>
                        </div>
                    </li>
                    <li>
                        <div className="hoverEffect">
                            <Link to="/food-demo/food">Food</Link>
                        </div>
                    </li>
                    <li>
                        <div className="hoverEffect">
                            <Link to="/food-demo/diary">Diary</Link>
                        </div>
                    </li>
                </ul>

                <Routes>
                    <Route path="*" element={<Navigate to="/food-demo" />} />
                    <Route path="/food-demo" element={<Home />} />
                    <Route path="/food-demo/food" element={<FoodPage />} />
                    <Route path="/food-demo/diary" element={<DiaryPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
