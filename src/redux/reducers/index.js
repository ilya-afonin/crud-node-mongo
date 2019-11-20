import * as types from '../constants/actionTypes'
import InitialState from '../constants/initialState'

export default function rootReducer(state = InitialState, action) {

    switch (action.type) {
        case types.RECEIVE_DATA:
            console.log("Receive all data" + JSON.stringify(action));
            return {
                ...state,
                items: action.payload,
                isFetching: false
            };

        case types.ADD_ITEM:
            console.log("Add new item" + JSON.stringify(action));
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        case types.OPEN_FORM:
            console.log("Open Add Item Form" + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openFormDialog: true
                }
            };

        case types.CLOSE_FORM:
            console.log("Close Add Item Form" + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openFormDialog: false
                }
            };
        //----------------UPDATE-------------------
        case types.UPDATE_ITEM:
            console.log("Save updated item" + JSON.stringify(action));
            console.log(action);
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.key !== action.payload.key) {
                        return item;
                    } else {
                        return { ...item, value: action.payload.value };
                    }
                })
            };

        case types.OPEN_EDIT_FORM:
            console.log("Open Edit Item Form" + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openEditDialog: true,
                    itemToEdit: action.payload
                }
            };

        case types.CLOSE_EDIT_FORM:
            console.log("Close Edit Item Form" + JSON.stringify(action));
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    openEditDialog: false
                }
            };

        //-----------------DELETE-------------
        case types.SELECT_ITEM:
            console.log("Select item" + JSON.stringify(action));
            const currentIndex = state.uiState.checked.indexOf(action.payload);
            let currentChecked = [...state.uiState.checked];
            if (currentIndex === -1) {
                currentChecked.push(action.payload);
            } else {
                currentChecked.splice(currentIndex, 1);
            }

            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    checked: currentChecked
                }
            }

        case types.DELETE_ITEM:
            console.log("Delete item" + JSON.stringify(action));
            console.log("state: ", state);
            // for (var article in state.articles) {
                console.log(typeof action.payload);
            let deleteArray = [...state.items];
            if (typeof action.payload == 'object') { 
                state.items.forEach((item, indx) => {
                    if(item.key === action.payload.key){
                        const deleteIdx = indx;
                        console.log(deleteIdx);
                        deleteArray.splice(deleteIdx, 1);
                    }
                });

            } else {
                for (let check in state.uiState.checked) {
                    //remove article
                    //var article = state.articles[check];
                    state.item.splice(check, 1);

                    //Remove Index
                    var index = state.uiState.checked.indexOf(check);
                    if (index > -1) {
                        state.uiState.checked.splice(index, 1);
                    }
                }
                state.uiState.checked = [];
            }
            return {
                ...state,
                items: deleteArray
            };
        default:
            return state;

    }

}