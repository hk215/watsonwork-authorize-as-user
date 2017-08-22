/*
  Step 1: User will need to authorize app to act on their behalf.

  https://developer.watsonwork.ibm.com/docs#ibm_ws_docs_42
*/

import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Panel, PanelGroup } from 'react-bootstrap';
import _ from 'underscore';
import querystring from 'query-string';
import crypto from 'crypto';

class AuthenticateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {spaces: '', selected:{ value: '', label: ''}, selected_space: '', selected_space_msg: '', client_id: '',
    client_state: crypto.randomBytes(16).toString('base64'), redirect_uri: '', response_type: 'code', auth_endpoint: 'https://api.watsonwork.ibm.com/oauth/authorize', code:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.getClientToken = this.getClientToken.bind(this);
  };

  componentWillMount() {
    const qs = querystring.parse(location.search);
    const resp = (!_.isEmpty(qs) && qs.code !== '') ? this.setState({code: qs.code}) : '';

  };

  getClientToken(e) {
    e.preventDefault();
    const config = {
      authRequest : {
        client_id : this.state.client_id,
        redirect_uri : this.state.redirect_uri,
        response_type : this.state.response_type,
        state : this.state.client_state
    	}
    }
    window.location.href = this.state.auth_endpoint + '?' + querystring.stringify(config.authRequest);
  };

  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value});
  };

  setTab(tab) {
    this.props.changeTab(tab);
  }

  render() {
    return(
      <div className='layout'>

        <PanelGroup defaultActiveKey={this.props.activePanel} accordion>
          <h2>Step 1: Authenticate User</h2>
          <Panel header="User Authentication Request" eventKey="1">
            <div className="panelLeft">
            <p>
              This next step involves the user authenticating into Watson Workspace and giving the application permission
              to act on the user's behalf. First you will need to populate the fields below so we can generate the
              proper parameters to send to the authorization server.
            </p>
            <form onSubmit={this.getClientToken}>
              <FormGroup>
              <div className='fields'>
                <ControlLabel htmlFor='client_id'>Client ID (Required)</ControlLabel>
                <FormControl type='text' ref={(input) => this.client_id = input} id='client_id' onChange={this.handleChange}></FormControl>
              </div>
              <div className='fields'>
                <ControlLabel htmlFor='state'>State (Required)</ControlLabel>
                <FormControl type='text' ref={(input) => this.client_state = input} id='state' value={this.state.client_state} onChange={(e) => this.updateValue}></FormControl>
              </div>
              <div className='fields'>
                <ControlLabel htmlFor='redirect_uri'>Redirect URI (Required)</ControlLabel>
                <FormControl type='text' ref={(input) => this.redirect_uri = input} id='redirect_uri' onChange={this.handleChange}></FormControl>
              </div>
              <div className='fields'>
                <ControlLabel htmlFor='response_type'>Response Type (Required)</ControlLabel>
                <FormControl type='text' ref={(input) => this.response_type = input} id='response_type' value={this.state.response_type} disabled></FormControl>
              </div>
              <div className='fields'>
                <ControlLabel htmlFor='auth_endpoint'>Authorization Endpoint URI</ControlLabel>
                <FormControl type='text' ref={(input) => this.auth_endpoint = input} id='auth_endpoint' value={this.state.auth_endpoint} disabled></FormControl>
              </div>
              <div className='buttonBar'>
                <Button type='submit' bsStyle="primary"> Allow Application To Act On Your Behalf</Button>
              </div>
            </FormGroup>
            </form>
          </div>
          <div className='panelRight'>
            <aside>
              <dl>
                <dt><dfn>Client ID</dfn></dt>
                <dd>This ID is obtained when you register your application with Watson Workspace Services</dd>
                <dt><dfn>State</dfn></dt>
                <dd>An opaque value to prevent Cross-Site request forgery. Apps should use the following guidelines https://tools.ietf.org/html/rfc6749#section-10.12</dd>
                <dt><dfn>Redirect_URI</dfn></dt>
                <dd>This is the same URI that was used when registering your application with Watson Workspace Services </dd>
                <dt><dfn>Response Type</dfn></dt>
                <dd>This value must always be set to "code"</dd>
                <dt><dfn>Authorization Endpoint URI</dfn></dt>
                <dd>https://api.watsonwork.ibm.com/oauth/authorize</dd>
              </dl>
            </aside>
          </div>
          </Panel>
          <Panel header="Response From Server" eventKey="2">
            <div className='server_resp'>
              <div className='fields'>
                <ControlLabel htmlFor='code'>Code</ControlLabel>
                <FormControl type='text' ref={(input) => this.code = input} id='code' value={this.state.code} placeholder='Code' readOnly></FormControl>
              </div>
              <div className='fields'>
                <ControlLabel htmlFor='state'>State</ControlLabel>
                <FormControl type='text' ref={(input) => this.client_state = input} id='state' value={this.state.client_state} placeholder='State' readOnly></FormControl>
              </div>
              <a className='button' onClick={() => this.setTab('third')}><span className='button__text'>Proceed to Step 2</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M61.171 42.829L78.343 60H32v8h46.343L61.171 85.171l5.658 5.658L93.657 64 66.829 37.171z"/><path d="M64 8C33.076 8 8 33.074 8 64s25.076 56 56 56c30.926 0 56-25.074 56-56S94.926 8 64 8zm0 108c-28.673 0-52-23.327-52-52s23.327-52 52-52 52 23.327 52 52-23.327 52-52 52z"/></svg>
              </a>
            </div>
            <div className='panelLeft'>
              <aside>
              <dl>
                <dt><dfn>Code</dfn></dt>
                <dd>Authorization code returned by the server and delivered as a query string parameter in the Redirection URI</dd>
                <dt><dfn>State</dfn></dt>
                <dd>If you supplied a state in the authentication request then the server will pass back the state value as part of the query string</dd>
              </dl>
            </aside>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    );
  }

}

AuthenticateUser.propTypes = {
  changeTab: React.PropTypes.func
}

export default AuthenticateUser;
