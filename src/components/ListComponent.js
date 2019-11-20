
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Comment from "@material-ui/icons/Error";
import { selectItem, deleteItem, openEditForm } from "../redux/actions"; 
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    width: "100%",
    height: 360,
    backgroundColor: theme.palette.background.paper,

  },
  avatar: {
    padding: 30,
    color: "#fff",
    backgroundColor: "#F00"
  },
  listItem: {
    
  },
  loader: {
    padding: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class ListComponent extends React.Component {

  
  handleToggle = id => {
    console.log("Select----------" + id);
    
    this.props.selectItem(id);
    console.log(this.props.checked);
  };

  handleDelete = item => {
    const result = window.confirm(`Do you really want to delete item?`);
    if(result){ 
      this.props.deleteItem(item);
    }
  };
  
  // componentDidUpdate(nextProps) {
  //   // You don't have to do this check first, but it can help prevent an unneeded render
  //   if (nextProps.checked !== this.props.checked) {
  //     this.setState({ checked: nextProps.checked });
  //   } 
  // }

  handleChange = event => {
    // if (event.target.value.trim() !="")
    // {
    console.log("Search----------" + event.target.value);

    var updatedList = this.props.items;
    updatedList = updatedList.filter(function (item) {
      return (
        item.key.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      );
    });

    this.setState({ items: updatedList });

    // var newArray = this.state.items.filter(function (item) {
    //   return item.title.indexOf(event.target.value) > 0;
    // });

    // this.setState({
    //   items: newArray
    // });
    // }else{

    // }
  };

  

  render() {
    
    const { items, checked, classes } = this.props;
    
    return (
      <div className={classes.root}>
        <Grid container spacing={2} margin={10} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              id="input-with-icon-grid"
              label="Search"
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
        {this.props.isFetching ? (
          <div className={classes.loader}> 
          <CircularProgress disableShrink color="secondary" />
          </div>
        ) : (
            this.props.items.length === 0 ? (
              <Card>
                <CardContent>
                  <Comment />

                  <Typography color="primary">No Data</Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    No Article found ¯\_(ツ)_/¯
              </Typography>
                </CardContent>
              </Card>
            ) : (
                <List>
                  {items.map((item) => (
                   
                    <ListItem
                      key={item._id}
                      dense
                      disableGutters
                      divider
                      className={classes.listItem}
                    >
                      <Checkbox
                        onChange={() => this.handleToggle(item._id)}
                        checked={checked.indexOf(item._id) !== -1}
                      />

                      <ListItemText primary={item.key} secondary={item.value} />

                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Comments"
                          onClick={ () => this.props.openEditForm(item) }
                        >
                          <CommentIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Delete"
                          onClick={ () => this.handleDelete(item) }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )
          )}
      </div>
    );
  }
}

ListComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
  isFetching: state.isFetching,
  checked: state.uiState.checked,
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  selectItem: (item) => dispatch(selectItem(item)),
  deleteItem: (item) => dispatch(deleteItem(item)),
  openEditForm: (item) => dispatch(openEditForm(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ListComponent));
