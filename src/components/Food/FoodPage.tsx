import React from 'react';
import type { FoodItem, ImgItem } from '../../Interface';
import FoodItemComponent from './FoodItem';
import foodData from '../../data/databaseFood.json'
import foodDataIcons from '../../data/databaseFoodIcons.json';
import { ProviderContext, withSnackbar } from 'notistack';
import { Searchbar } from './Searchbar';
import { fetchFoodData, fetchFoodItemImg } from '../../fetch/FetchData';
import { SearchResults } from "./SearchResults";
import { FilterPopup } from "./Filter/FilterPopup";
import filterIcon from "../../static/filter.svg";
import DiaryPage from '../Diary/DiaryPage';

interface FoodPageProps {
    addToDiary: (foodItem: FoodItem, amount: number) => void,
};
interface FoodPageState {
    foodlist: FoodItem[],
    showResults: boolean,
    myFoodlist: FoodItem[],
    FoodArray2D: FoodItem[][],
    searchResults: FoodItem[]
    serverOnline: boolean;
};

class FoodPage extends React.Component<ProviderContext & FoodPageProps, FoodPageState> {
    private _isMounted: boolean;
    constructor(props: ProviderContext & FoodPageProps) {
        super(props);
        this._isMounted = false;
        foodData as FoodItem[];
        foodDataIcons as ImgItem[];

        this.state = {
            foodlist: [],
            showResults: false,
            myFoodlist: [],
            FoodArray2D: [],
            searchResults: [],
            serverOnline: true
        };
    }

    async componentDidMount() {
        console.log('I was triggered during componentDidMount')
        this._isMounted = true;
        try {
            let foodListJson = await fetchFoodData();
            foodListJson = this.sortAlphabetical(foodListJson);

            await Promise.all(
                foodListJson.map(async (item: FoodItem) => {
                    const img: string = await fetchFoodItemImg(item.id);
                    const encodedImg = window.btoa(img);
                    const encodedImgLink = "data:image/svg+xml;base64," + encodedImg;
                    item.img = encodedImgLink;
                    return item;
                })
            );
            this._isMounted && this.setState({ foodlist: foodListJson });
        } catch (error) {
            this.setState({ serverOnline: false });
            const message = "Server didn't respond - Loading data from local .json file instead.";
            this.props.enqueueSnackbar(message, { variant: 'error' });
            foodData.map((foodItem: FoodItem) => {
                const foundFoodItem: ImgItem = (foodDataIcons as ImgItem[]).find((arrayItem: ImgItem) => arrayItem.id === foodItem.id) as ImgItem;
                if (foundFoodItem !== undefined) {
                    const encodedImg: string = window.btoa(String.fromCharCode(...new Uint8Array(foundFoodItem.img.data)));
                    const encodedImgLink = "data:image/svg+xml;base64," + encodedImg;
                    foodItem.img = encodedImgLink;
                }
                return foodItem;
            });
            foodData.sort((a: FoodItem, b: FoodItem) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
            this._isMounted && this.setState({ foodlist: foodData as FoodItem[] });
        }
    }

    async componentWillUnmount() {
        this._isMounted = false;
    }

    sortAlphabetical = (list: FoodItem[]): FoodItem[] => {
        return list.sort((a: FoodItem, b: FoodItem) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("opened filter settings");
        const $filterDiv = $('.FilterPopup');
        $filterDiv.slideToggle(200);
    }

    setSearchresults = (results: FoodItem[]) => {
        this.setState({ searchResults: results as FoodItem[] });
    }

    renderFood = () => {
        return (
            <>
                {this.state.foodlist.map((data: FoodItem) => (
                    <FoodItemComponent key={data.id} data={data} addToDiary={this.props.addToDiary} />
                ))}
            </>
        );
    }

    render() {
        return (
            <div className="Content">
                <div className="Search">
                    <li>
                        <Searchbar foodlist={this.state.foodlist} setResults={this.setSearchresults}></Searchbar>
                    </li>
                    <li>
                        <div className="searchChild foodlist">
                            <button className="foodlistButton" onClick={this.handleClick}>
                                <img className="foodlistIcon Icon" src={filterIcon} alt="foodlist" />
                            </button>
                        </div>
                    </li>
                </div>
                <FilterPopup setSearchresults={this.setSearchresults} serverOnline={this.state.serverOnline} />
                <div className="SearchResults">
                    {this.state.searchResults.length > 0 ?
                        <SearchResults foodlistResult={this.state.searchResults} addToDiary={this.props.addToDiary} />
                        :
                        <></>
                    }
                </div>
                <div className="Food">
                    <h3 className="Headline">nutritional Information</h3>
                    <div className="FoodData">
                        {this.renderFood()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withSnackbar(FoodPage);