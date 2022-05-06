import React from 'react';
import type { FoodItem, ImgItem } from '../../Interface';
import { ProviderContext, withSnackbar } from 'notistack';

interface DiaryPageProps {
    diary: FoodItem[],
};
interface DiaryPageState {
};

class DiaryPage extends React.Component<ProviderContext & DiaryPageProps, DiaryPageState> {
    private _isMounted: boolean;
    constructor(props: ProviderContext & DiaryPageProps) {
        super(props);
        this._isMounted = false;

        // http://localhost:8080/food
        this.state = {
            diary: []
        };
    }

    async componentDidMount() {
        console.log('I was triggered during componentDidMount')
        this._isMounted = true;
    }

    async componentWillUnmount() {
        this._isMounted = false;
    }

    renderItem = (item: FoodItem, index: number) => {
        return (
            <li key={index} className="DiaryItem">
                <div className='mainInfo'>
                    <img src={item.img} alt={item.name + '.svg'} className="FoodIcon" width={50} />
                    <span className='amount'>{item.amount + item.amountType}</span>
                    <div className='title'>{item.name}</div>
                    <div className='kcal'>{item.kcal}kcal</div>
                </div>

                <div className="nutritionList">
                    <div className='protein'>P: {item.protein.toFixed(1)}</div>
                    <div className='carbs'>C: {item.carbs.toFixed(1)}</div>
                    <div className='fat'>F: {item.fat.toFixed(1)}</div>
                </div>
            </li>
        )
    }

    render() {
        return (
            <div className="Content">
                {/* <div className="Diary">
                    <h2>Diary</h2>
                    <p>coming soon :)</p>
                    <p>display added food-items here on this page</p>
                </div> */}

                <div className="Diary">
                    {this.props.diary.length > 0 && (
                        <ul className='DiaryList'>
                            {this.props.diary.map((item, index) => {
                                return this.renderItem(item, index);
                            })}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export default withSnackbar(DiaryPage);