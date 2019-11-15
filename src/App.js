import React, { Component } from 'react'
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ListComponent from "./components/ListComponent";
import FormDialog from "./components/FormDialog";
import EditDialog from "./components/EditDialog";
import SimpleAppBar from "./components/SimpleAppBar.js";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import * as actions from './redux/actions';

const { fetchData, openForm } = actions;

class App extends Component {

    openDialog = () => {
        this.props.openForm();
    }

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
      
        return (
            <div className="app">

                <SimpleAppBar />
                <ListComponent />

                <FormDialog />
                <EditDialog />

                <Fab
                    style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10
                    }}
                    onClick={this.openDialog}
                    color="secondary"
                >
                    <AddIcon />
                </Fab>

            </div>
        )
    };
}
const mapState = (state) => ({
    state
})

const mapDispatch = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
    openForm: () => dispatch(openForm())
  }
}

export default connect(mapState, mapDispatch)(App);