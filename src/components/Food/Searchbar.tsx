import React, { useState } from "react";
import { FoodItem } from "../../Interface";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchbarProps {
    foodlist: FoodItem[],
    setResults: Function
};
interface SearchbarState {
    value: string,
}

export const Searchbar: React.FC<SearchbarProps> = (props: SearchbarProps) => {
    const [value, setValue] = useState<SearchbarState["value"]>("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let foundFoodItems: FoodItem[] = [];
        if (value.length <= 0) {
            props.setResults(foundFoodItems);
            return;
        }

        props.foodlist.map(item => {
            if (item.name.toLowerCase().replace(/\s+/g, '').includes(value.toLowerCase())) { // .replace(/\s+/g, '') - replaces whitespace
                foundFoodItems.push(item);
            }
        });

        let foundPrioItems: FoodItem[] = [];
        foundFoodItems = foundFoodItems.filter(item => {
            if (item.name.toLowerCase().startsWith(value.toLowerCase())) {
                foundPrioItems.push(item);
            } else {
                return item;
            }
        });

        // foundPrioItems.slice(0).reverse().map((item: FoodItem) => foundFoodItems.unshift(item));
        foundPrioItems = foundPrioItems.slice(0, 8);
        foundFoodItems = foundFoodItems.slice(0, 8);

        let foodItemList: FoodItem[] = [];
        foodItemList = foodItemList.concat(foundPrioItems);
        foodItemList = foodItemList.concat(foundFoodItems);
        foodItemList = foodItemList.slice(0, 4);
        props.setResults(foodItemList);
    }

    return (
        <div className="searchChild searchbar">
            <form className="searchForm" onSubmit={handleSubmit}>
                <button className="searchButton" type="submit">
                    <SearchIcon></SearchIcon>
                </button>
                <input className="searchInput" type="text" placeholder="Search Item.." value={value} onChange={handleChange} />
                <button className="clearButton" type="reset" onClick={() => {
                    setValue("");
                    props.setResults([]);
                }}>
                    <ClearIcon></ClearIcon>
                </button>
            </form>
        </div>
    )
}