import React from 'react';
import type { FoodItem, ImgItem } from '../../Interface';
import { ProviderContext, withSnackbar } from 'notistack';

interface DiaryPageProps {
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
        };
    }

    async componentDidMount() {
        console.log('I was triggered during componentDidMount')
        this._isMounted = true;
    }

    async componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        return (
            <div className="Content">
                <div className="Diary">
                    <h2>Diary</h2>
                    <p>coming soon :)</p>
                    <p>display added food-items here on this page</p>
                </div>
            </div>
        )
    }
}

export default withSnackbar(DiaryPage);