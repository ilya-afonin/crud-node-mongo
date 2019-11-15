import React, { Component } from "react";
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import { CLOSE_FORM, ADD_ITEM } from "../redux/constants/actionTypes";

import { closeForm, postItem } from "../redux/actions"

class FormDialog extends Component {
  state = {
    key: "",
    value: ""
  };

  handleClose = () => {
    this.props.closeForm()
  };

  handleChangeKey = () => event => {
    this.setState({
      key: event.target.value
    });
  };

  handleChangeVal = () => event => {
    this.setState({
     value: event.target.value
    });
  }
  handleSave = () => {
    const item = {
      key: this.state.key,
      value: this.state.value
    }
    this.props.postItem(item)
    this.setState({
      key: "",
      value: ""
    })

  };

  componentDidMount() {
    // this.setState({
    //   open: store.getState()["uiState"]["openFormDialog"]
    // });

    // store.subscribe(() => {
    //   console.log(
    //     "Form Dialog State" + JSON.stringify(store.getState()["uiState"])
    //   );

    //   this.setState({
    //     open: store.getState()["uiState"]["openFormDialog"]
    //   });
    // });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.state.uiState.openFormDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
          <DialogContent>
            <DialogContentText>Please enter new item.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="key"
              label="key"
              multiline
              rowsMax="1"
              rows="1"
              fullWidth
              onChange={this.handleChangeKey()}
              value={this.state.key}
              placeholder="Введите ключ"
            />
            &nbsp;
             <TextField
              autoFocus
              margin="dense"
              id="value"
              label="value"
              multiline
              rowsMax="5"
              rows="5"
              fullWidth
              onChange={this.handleChangeVal()}
              value={this.state.value}
              placeholder="Введите значение"
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

const mapState = (state) => ({
  state
})

const mapDispatch = (dispatch) => {
  return {
    closeForm: () => dispatch(closeForm()),
    postItem: (item) => dispatch(postItem(item))
  }
}

export default connect(mapState, mapDispatch)(FormDialog);