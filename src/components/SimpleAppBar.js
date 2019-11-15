import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
//import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/Delete";
import { deleteItem } from "../redux/actions";

const styles = {};
class SimpleAppBar extends React.Component {
  
  handleDelete = () => {
    this.props.deleteItem()
  };

  render() {

    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="secondary">
            Storage app
          </Typography>

          {this.props.checked.length !== 0 ? (
            <IconButton onClick={this.handleDelete} color="inherit">
              <AccountCircle />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    checked: state.uiState.checked
});

const mapDispatchToProps = (dispatch) => ({
    deleteItem: dispatch(deleteItem)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleAppBar));
