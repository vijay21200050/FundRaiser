import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserService from "../services/user.service";

export default class DeleteStartup extends Component {

  constructor(props) {
    super(props);
    this.getStartup = this.getStartup.bind(this);
    this.DeleteStartupDetails = this.DeleteStartupDetails.bind(this);

    this.state = {
      currentStartup: {
        startupId: null,
        startupName: "",
        startupSummary: "",
        startupDesc : "",
        startupFunds : 0,
        fundsRaised : 0
      },
      message: ""
    };
  }
  componentDidMount() {
    this.getStartup(this.props.match.params.id);
  }
  
  getStartup(id) {
    UserService.fetchStartup(id)
      .then(response => {
        this.setState({
          currentStartup : response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  DeleteStartupDetails() {
    UserService.deletestartup(
      this.state.currentStartup.startupId
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "You Edited Successfully" 
        });
      })
      .catch(e => {
        console.log(e);
      });
      this.props.history.push('/admin')
      window.location.reload();
  }
  render(){
    const { currentStartup } = this.state;
    return (
      <Form onSubmit={this.DeleteStartupDetails}>
        <div className="form-group">
        <label className="my-2" htmlFor="startupname"><i>Startup Name</i></label>
        <Input
            type="text"
            className="form-control"
            name="startupname"
            value={currentStartup.startupName}
            onChange={this.onChangeStartupName}
            required
            disabled
        />
        </div>

        <div className="form-group">
        <label className="my-2" htmlFor="startupsummary"><i>Summary</i></label>
        <Input
            type="text"
            className="form-control"
            name="startupsummary"
            value={currentStartup.startupSummary}
            onChange={this.onChangeStartupSummary}
            required
            disabled
        />
        </div>
        
        <div className="form-group">
        <label className="my-2" htmlFor="startupdesc"><i>Description</i></label>
        <textarea
            rows="8"
            type="text"
            className="form-control"
            name="startupdesc"
            value={currentStartup.startupDesc}
            onChange={this.onChangeStartupDesc}
            required
            disabled
        />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className="form-group col-3">
        <label className="mb-2 mt-4" htmlFor="fundsraised"><i>Funds Raised</i></label>
        <Input
            type="text"
            className="form-control"
            name="fundsraised"
            value={currentStartup.fundsRaised}
            disabled
            
        />
        </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className="form-group col-3">
        <label className="my-2" htmlFor="startupfunds"><i>Target Funds</i></label>
        <Input
            type="text"
            className="form-control"
            name="startupfunds"
            value={currentStartup.startupFunds}
            onChange={this.onChangeStartupFunds}
            required
            disabled
        />
        </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-dark my-4 mx-2" type="submit">Delete Startup</button>
            <Link to="/admin" className="btn btn-light my-4 mx-2">Cancel</Link>
        </div>
      </Form>
    )
  }
}

    
