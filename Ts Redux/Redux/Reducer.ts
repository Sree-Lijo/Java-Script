
import { combineReducers } from 'redux';
import { DashboardReducer, DashboardState } from './DashboardReducer';

interface RootState {
    dashboard: DashboardState;
}

const rootReducer = combineReducers<RootState>({
    dashboard: DashboardReducer
});

export default rootReducer;



