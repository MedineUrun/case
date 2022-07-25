import { SESSION_DISPATCH } from '../actions/Types'

const INITIAL_STATE = {
    BazaarPlaceAllotmentNetting: null,
}

export default function SessionReducers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SESSION_DISPATCH:
            return {
                ...state,
                [action.payload.props]: action.payload.value
            };
        default:
            return state;
    }
}