import { Reducer } from 'redux';

export interface DashboardState {
    all_Country: []
}

const initialState: DashboardState = {
    all_Country: []

};


export const DashboardReducer: Reducer<DashboardState> = (state = initialState, action) => {
    switch (action.type) {
        case 'All_Country':
            return {
                ...state,
                all_Country: action.payload,
            };

        default:
            return state;
    }
};
