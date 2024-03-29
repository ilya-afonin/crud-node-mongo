//import fetch from 'cross-fetch'

import {
    ADD_ITEM,
    SELECT_ITEM,
    DELETE_ITEM,
    OPEN_EDIT_FORM,
    CLOSE_EDIT_FORM,
    OPEN_FORM,
    RECEIVE_DATA,
    CLOSE_FORM,
    UPDATE_ITEM
} from "../constants/actionTypes";

export const selectItem = id => ({
    type: SELECT_ITEM,
    payload: id
})

export const openEditForm = item => ({
    type: OPEN_EDIT_FORM,
    payload: item
})

export const closeEditForm = () => ({
    type: CLOSE_EDIT_FORM
})

export const openForm = () => ({
    type: OPEN_FORM
});

export const closeForm = () => ({
    type: CLOSE_FORM
});

const receiveData = items => ({
    type: RECEIVE_DATA,
    payload: items
})

export const fetchData = () => async (dispatch) => {
    await fetch('http://localhost:8080/storage') // no-cors, cors, *same-origin
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(json => dispatch(receiveData(json)))
        .catch(ex => console.log('Fetch failed', ex))
}

const addItem = item => ({
    type: ADD_ITEM,
    payload: item
});

export const postItem = (item) => (dispatch) => {

    fetch('http://localhost:8080/storage', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(item), // тип данных в body должен соответвовать значению заголовка "Content-Type" 
    })
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(dispatch(addItem(item)))
        .then(dispatch(closeForm()))
        .catch(ex => console.log('Fetch failed', ex))

}

const updateItem = item =>
    ({
        type: UPDATE_ITEM,
        payload: item
    })

export const putItem = (item) => (dispatch) => {

    fetch('http://localhost:8080/storage', {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer',
        body: JSON.stringify(item), 
    })
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(dispatch(updateItem(item)))
        .then(dispatch(closeEditForm()))
        .catch(ex => console.log('Fetch failed', ex))
}

const deleteItemStore = (item) => ({
    type: DELETE_ITEM,
    payload: item
})

export const deleteItem = (item) => (dispatch) => {

    fetch(`http://localhost:8080/storage/${item.key}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        referrer: 'no-referrer'
    })
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(dispatch(deleteItemStore(item)))
        .catch(ex => console.log('Fetch failed', ex))
}