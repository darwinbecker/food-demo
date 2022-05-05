import React from "react";
import { FoodItem } from "../../Interface";
import FoodItemComponent from "./FoodItem";

interface SearchbarProps {
    foodlistResult: FoodItem[]
    addToDiary: (foodItem: FoodItem, amount: number) => void,
};

export const SearchResults: React.FC<SearchbarProps> = (props: SearchbarProps) => {
    return (
        <div className="searchresult">
            {
                props.foodlistResult.length > 0 ?
                    <div className="FoundWrapper">
                        <h2>Found Items</h2>
                        <div className="FoundItems" >
                            {props.foodlistResult.map((foundItem: FoodItem) =>
                                <FoodItemComponent data={foundItem} key={foundItem.id} addToDiary={props.addToDiary} className="FoundItem" />
                            )}
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}