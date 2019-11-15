const InitialState = {
  items: [],
  isFetching: true,
  didInvalidate: false,
  uiState: {
    //Create
    openFormDialog: false,
    //Update
    openEditDialog: false,
    itemToEdit: {},
    //Delete
    checked: []
  }
};
export default InitialState;