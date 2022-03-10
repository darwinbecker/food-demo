import React from "react";
import { FoodItem } from "../../Interface";
import FoodItemComponent from "./FoodItem";

interface SearchbarProps {
    foodlistResult: FoodItem[]
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
                                <FoodItemComponent data={foundItem} key={foundItem.id} className="FoundItem" />
                            )}
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}