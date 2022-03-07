import React from 'react';
import type { FoodItem } from '../../Interface';
import { ProviderContext, withSnackbar } from 'notistack';

interface FoodItemProps {
    data: FoodItem,
    className?: string
};
interface FoodItemState {
    value: number,
    editFoodItem: FoodItem
};

class FoodItemComponent extends React.Component<ProviderContext & FoodItemProps, FoodItemState> {
    constructor(props: ProviderContext & FoodItemProps) {
        super(props);
        this.state = {
            value: 1,
            editFoodItem: {} as FoodItem,
        };

        this.handlePlus = this.handlePlus.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handleAddToList = this.handleAddToList.bind(this);
    }

    async componentDidMount() {
        this.setState({ value: 1 });
    }

    handlePlus() {
        this.setState({ value: this.state.value + 1 });
    }

    handleMinus() {
        if (this.state.value > 1) {
            this.setState({ value: this.state.value - 1 });
        }
    }

    handleAddToList() {
        const message = "added " + this.state.value + "x " + this.props.data.name + " to your food diary.";
        const img = <span><img src={this.props.data.img} alt={this.props.data.name + '.svg'} className="FoodIcon" width={30} />{message}</span>;
        this.props.enqueueSnackbar(img, { variant: 'info' });
    }

    FoodItem = () => {
        return (
            <div className={`FoodItem ${this.props.className || ""}`} key={this.props.data.id} id={this.props.data.id?.toString()}>
                <div className="FoodHeader">
                    <img src={this.props.data.img} alt={this.props.data.name + '.svg'} className="FoodIcon" width={50} />
                    <span>{this.props.data.name}</span>
                </div>
                <div className="FoodBody">
                    <ul>
                        <form className="" key={this.props.data.id} id={this.props.data.id?.toString()}>
                            <li>
                                <span>Amount:
                                    {" " + (this.props.data.amount * Number(this.state.value)).toString() + this.props.data.amountType}
                                </span>
                            </li>
                        </form>
                        <li><span>kcal: {(this.props.data.kcal * Number(this.state.value)).toFixed(1)}</span></li>
                        <li><span>Protein: {(this.props.data.protein * Number(this.state.value)).toFixed(1)}</span></li>
                        <li><span>Carbs: {(this.props.data.carbs * Number(this.state.value)).toFixed(1)}</span></li>
                        <li><span>Fat: {(this.props.data.fat * Number(this.state.value)).toFixed(1)}</span></li>
                    </ul>
                </div>
                <div className="FoodFooter">
                    <button className='plusButton' onClick={this.handlePlus}>+</button>
                    <span>{this.state.value}</span>
                    <button className='minusButton' onClick={this.handleMinus}>-</button>
                    <div className="addToList">
                        <button className='addToListButton' onClick={this.handleAddToList} >Add To List</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.FoodItem()}
            </>
        )
    }
}

export default withSnackbar(FoodItemComponent);