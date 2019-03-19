
import APPCONFIG from './store';
const initialSettings = APPCONFIG.taskList;
const todos = (state = initialSettings, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    ...action.payload
                }
            ]
        case 'REMOVE_TASK':
            return [
                ...state
            ]
        default:
            return state
    }
}

export default todos
