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
            <div key={index}>
                <img src={item.img} alt={item.name + '.svg'} className="FoodIcon" width={50} />
                <span style={{ 'marginRight': '5px' }}>{item.amount + item.amountType}</span>
                <div style={{ 'display': 'inline' }}>{item.name}</div>
            </div>
        )
    }

    render() {
        return (
            <div className="Content">
                <div className="Diary">
                    <h2>Diary</h2>
                    <p>coming soon :)</p>
                    <p>display added food-items here on this page</p>
                </div>
                {this.props.diary.length > 0 && (
                    <div>
                        {this.props.diary.map((item, index) => {
                            return this.renderItem(item, index);
                        })}
                    </div>
                )}
            </div>
        )
    }
}

export default withSnackbar(DiaryPage);