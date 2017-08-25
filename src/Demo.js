import React, { Component } from 'react';
import AuthenticateUser from './AuthenticateUser';
import AuthenticateServer from './AuthenticateServer';
import CreateMSG from './CreateMSG';
import { Col, Image, Nav, NavItem, Tab, Row } from 'react-bootstrap';
import querystring from 'query-string';
import _ from 'underscore';

import 'react-dropdown/style.css';
import setuppng from './img/mybehalf2.png';
// require('request-debug')(request);
// request.debug = true;
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {activePanel: "1", activeTabId: 'first', spaces: '', selected:{ value: '', label: ''}, selected_space: '', selected_space_msg: '', showModal: false, access_token:''};
    this.handleChange = this.handleChange.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.setAccessToken = this.setAccessToken.bind(this);
  };


  componentWillMount() {
    const qs = querystring.parse(location.search);
    const resp = (!_.isEmpty(qs) && qs.code !== '') ? this.setState({activePanel: "2", activeTabId: 'second'}) : '';

  };

  changeTab(tab) {
    this.setState({activeTabId: tab});
  };

  setAccessToken(token) {
    this.setState({access_token: token});
  }

  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value});
  };

  render() {
    return (
      <div className='mainLayout'>
        <h1>Create an application that acts on a users behalf</h1>
        <Tab.Container id='navGroup' activeKey={this.state.activeTabId}  onSelect={this.changeTab}>
          <Row className='clearfix'>
            <Col sm={2}>
              <Nav bsStyle='pills' stacked>
                <NavItem eventKey='first'>
                  Setup
                </NavItem>
                <NavItem eventKey='second'>
                  Step 1
                </NavItem>
                <NavItem eventKey='third'>
                  Step 2
                </NavItem>
                <NavItem eventKey='fourth'>
                  Step 3
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey='first'>
                  <div className='layout'>
                    <p>
                      This demo walks you through the process of creating an application that will act on a users behalf
                    </p>
                    <h4>Setup: Application Registration</h4>
                    <p>
                      In order to add an application to Watson Workspace you must first register your application. Visit
                      https://workspace.ibm.com/developer/apps, enter the name and description of the application. Next select
                      "Add an OAuth2 Redirection URL", this value will be used later on in the application.
                    </p>
                    <Image className='img' src={setuppng} responsive/>
                    <div className='buttonBar'>
                      <a className='button' onClick={() => this.changeTab('second')}><span className='button__text'>Proceed to Step 1</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M61.171 42.829L78.343 60H32v8h46.343L61.171 85.171l5.658 5.658L93.657 64 66.829 37.171z"/><path d="M64 8C33.076 8 8 33.074 8 64s25.076 56 56 56c30.926 0 56-25.074 56-56S94.926 8 64 8zm0 108c-28.673 0-52-23.327-52-52s23.327-52 52-52 52 23.327 52 52-23.327 52-52 52z"/></svg>
                      </a>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='second'>
                  <AuthenticateUser activePanel={this.state.activePanel} changeTab={this.changeTab}/>
                </Tab.Pane>
                <Tab.Pane eventKey='third'>
                  <AuthenticateServer setToken={this.setAccessToken} getSpaces={this.getListOfSpaces} changeTab={this.changeTab}/>
                </Tab.Pane>
                <Tab.Pane eventKey='fourth'>
                  <CreateMSG token={this.state.access_token} changeTab={this.changeTab}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  };
}
export default Demo;
