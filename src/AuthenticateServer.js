/*
  Step 3: Authenticate Application

  https://developer.watsonwork.ibm.com/docs#ibm_ws_docs_41

*/

import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import _ from 'underscore';
import querystring from 'query-string';
import request from 'request';


class AuthenticateServer extends Component {

  constructor(props) {
    super(props);
      this.state = {auth_endpoint: 'https://api.watsonwork.ibm.com/oauth/authorize', code:'', redirect_uri: '', client_id: '', client_secret: ''};
      this.handleChange = this.handleChange.bind(this);
      this.getServerToken = this.getServerToken.bind(this);
  }

  componentWillMount() {
    const qs = querystring.parse(location.search);
    const resp = (!_.isEmpty(qs) && qs.code !== '') ? this.setState({code: qs.code}) : '';

  };

  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value});
  };

  setTab(tab) {
    this.props.changeTab(tab);
  }

  getServerToken(e) {
    e.preventDefault();
    request.post({
      url : 'https://api.watsonwork.ibm.com/oauth/token',
      form : {
        code : this.state.code,
        grant_type : 'authorization_code',
        redirect_uri : this.state.redirect_uri,
        client_id : this.state.client_id,
        client_secret : this.state.client_secret
      }
    }, (err, res, body) => {
        if(err) {
          console.log("ERROR: " + err);
        }
        //parse response body to get access token
        const respBody = JSON.parse(body);
        // make sure the response is a valid token
        if(!respBody.token_type || respBody.token_type !== "bearer") {
          console.log("Invalid token");
        }

        this.props.setToken(respBody.access_token);
        this.setTab('fourth');
      });

  };

  render() {

    return(
      <div className='layout'>
        <h3>Create an application that acts on my behalf</h3>
        <div className='panel-body'>
        <div className='panelLeft'>
        <h4>Step 2: Token Request</h4>
        <p>
          This next step involves the application authenticating into Watson Workspace. First you will need to populate the fields below so we can generate the
          proper parameters to send to the authorization server.
        </p>
        <form onSubmit={this.getServerToken}>
          <FormGroup>
          <div className='fields'>
            <ControlLabel htmlFor='client_id'>Client ID (Required)</ControlLabel>
            <FormControl type='text' id='client_id' value={this.state.client_id} onChange={this.handleChange}></FormControl>
          </div>
          <div className='fields'>
            <ControlLabel htmlFor='client_secret'>Client Secrect (Required)</ControlLabel>
            <FormControl type='text' id='client_secret' value={this.state.client_secret} onChange={this.handleChange}></FormControl>
          </div>
          <div className='fields'>
            <ControlLabel htmlFor='redirect_uri'>Redirect URI (Required)</ControlLabel>
            <FormControl type='text' id='redirect_uri' value={this.state.redirect_uri} onChange={this.handleChange}></FormControl>
          </div>
          <div className='fields'>
            <ControlLabel htmlFor='code'>Code (Required)</ControlLabel>
            <FormControl type='text' id='code' value={this.state.code} disabled></FormControl>
          </div>
          <div className='fields'x>
            <Button type='submit' bsStyle="primary"> Authenticate Application with Watson Workspace Services</Button>
          </div>
        </FormGroup>
        </form>
      </div>

      <div className='panelRight'>
        <aside>
          <dl>
            <dt><dfn>Client ID</dfn></dt>
            <dd>This ID is obtained when you register your application with Watson Workspace Services</dd>
            <dt><dfn>Client Secret</dfn></dt>
            <dd>This is obtained when you register your application with Watson Workspace Services</dd>
            <dt><dfn>Redirect_URI</dfn></dt>
            <dd>This is the same URI that was used when registering your application with Watson Workspace Services </dd>
            <dt><dfn>Code</dfn></dt>
            <dd>This is the value that was return by the authorization server through the query string parameter</dd>
          </dl>
        </aside>
      </div>
      </div>
      </div>
    );
  }
}

AuthenticateServer.propTypes = {
  changeTab: React.PropTypes.func
}

export default AuthenticateServer;
