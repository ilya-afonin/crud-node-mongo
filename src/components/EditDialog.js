import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import store from "../store";
import { CLOSE_EDIT_FORM } from "../redux/constants/actionTypes";
import { UPDATE_ITEM } from "../redux/constants/actionTypes";
import { connect } from "net";
window.store = store;

class EditDialog extends React.Component {
  state = {
    open: false,
    article: {
      title: "",
      id: 0,
      date: ""
    }
  };

  handleClose = () => {
    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  handleChange = name => event => {
    console.log("New Value " + event.target.value);
    this.setState({
      newTitle: event.target.value
    });
  };

  handleSave = () => {
    store.dispatch({
      type: UPDATE_ITEM,
      payload: {
        title: this.state.newTitle,
        id: this.state.item.id,
        
      }
    });

    store.dispatch({
      type: CLOSE_EDIT_FORM
    });
  };

  componentDidMount() {
    // this.setState({
    //   open: store.getState()["uiState"]["openEditDialog"],
    //   article: store.getState()["uiState"]["articleToEdit"]
    // });

    // store.subscribe(() => {
    //   console.log(
    //     "Edit Form Dialog State" + JSON.stringify(store.getState()["uiState"])
    //   );
    //   this.setState({
    //     open: store.getState()["uiState"]["openEditDialog"],
    //     article: store.getState()["uiState"]["articleToEdit"]
    //   });
    // });
  }

  render() {

    const { isOpen } = this.props;

    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Article</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Update article.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Article"
              multiline
              defaultValue={this.state.article.title}
              rowsMax="4"
              rows="4"
              fullWidth
              onChange={this.handleChange("multiline")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isOpen: state.uiState.openEditDialog,
  selectItem: state.uiState.itemToEdit
})

const mapDispatchToProps = (dispatch) => ({
  closeEditForm: () => dispatch({type: CLOSE_EDIT_FORM})
  
})

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog)