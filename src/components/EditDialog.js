import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { putItem, closeEditForm } from "../redux/actions";
import { connect } from "react-redux";

class EditDialog extends React.Component {
  state = {
    newValue: ""
  };

  handleClose = () => {
    this.props.closeEditForm();
  };

  handleChange = name => event => {
    console.log("New Value " + event.target.value);
    this.setState({
      newValue: event.target.value
    });
  };

  handleSave = () => {

    const item = {
      //_id: this.props.item._id,
      key: this.props.selectItem.key,
      value: this.state.newValue
    }
    this.props.putItem(item);
    this.props.closeEditForm();
  };

  componentDidMount() {
    // this.setState({
    //   open: this.props.isOpen,
    //   item: this.props.selectItem
    // });
    this.setState({
      newValue: this.props.selectItem.value
    });

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

    const { isOpen, selectItem } = this.props;
    
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
          <DialogContent>
            <DialogContentText>Please Update item.</DialogContentText>
            <TextField
              disabled
              margin="dense"
              id="name"
              label="Key"
              defaultValue={selectItem.key}
              rows="1"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Value"
              multiline
              defaultValue={selectItem.value}
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
  closeEditForm: () => dispatch(closeEditForm()),
  putItem: (item) => dispatch(putItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog)