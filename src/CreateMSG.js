import React, { Component } from 'react';
import request from 'request';
import { Button, ControlLabel, FormControl, FormGroup, Modal } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import _ from 'underscore';

class CreateMSG extends Component {
  constructor(props) {
    super(props);
    this.state = {spaces: '', selected:{ value: '', label: ''}, selected_space: '', selected_space_msg: '', showModal: false};
    this.getListOfSpaces = this.getListOfSpaces.bind(this);
    this.createMSG = this.createMSG.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setTab = this.setTab.bind(this);
  };

  componentWillReceiveProps() {
    this.getListOfSpaces();
  }

  handleChange(event) {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value});
  };

  setTab(tab) {
    this.props.changeTab(tab);
  }


  getListOfSpaces() {
    request.post('https://api.watsonwork.ibm.com/graphql', {
      headers: {
        jwt: this.props.token,
        'Content-Type': 'application/graphql'
      },

      /* This is a GraphQL query, used to retrieve the list of spaces
         visible to the app (given the app OAuth token)
         https://developer.watsonwork.ibm.com/docs#ibm_ws_docs_7
      */
      body: `
        query getSpaces {
          spaces(first: 50) {
            items {
              title,
              id
            }
          }
        }
      }`
    }, (err, res) => {
      if(err || res.statusCode !== 200) {
        console.log('Error retrieving spaces %o', err || res.statusCode);
        return;
      }

      // Return the list of spaces
      const body = JSON.parse(res.body);
      const spaces = body.data.spaces.items;
      let spaces_array = [];
      for (let i = 0; i < spaces.length; i++) {
        let title_id = {'value': spaces[i].id, 'label': spaces[i].title};
        spaces_array.push(title_id);
      }
      this.setState({spaces: spaces_array});
    });
  }
  /*
    Use Spaces API to create message in selected space
    https://developer.watsonwork.ibm.com/docs#send-messages-into-conversations
  */
  createMSG(e){
    e.preventDefault();
    request.post(
      "https://api.watsonwork.ibm.com/v1/spaces/" + this.state.selected.value  + "/messages",{
      headers: {
        Authorization: 'Bearer ' + this.props.token
      },
      json: true,
      body: {
        type: 'appMessage',
        version: 1.0,
        annotations: [{
          type: 'generic',
          version: 1.0,

          color: '#6CB7FB',
          title: 'Posting as User',
         text: this.state.selected_space_msg,
         actor: {
           name: 'Hello World App'
         }
        }]
      }
      }, (error, resp, body) => {
      if(error || resp.statusCode !== 201) {
        console.log('Error sending message %o', error || resp.statusCode);
        return;
      } else {
        console.log("Created Message");
      }
    });
    this.setState({showModal: true});
  };

  _onSelect(option) {
   this.setState({selected: option});
  };

  closeModal() {
    this.setState({ showModal: false});
  };

  render() {

    return(
      <div className='layout'>
        <h3>Create an application that acts on my behalf</h3>
        <h4>Step 3: Create Message</h4>
        <p>
          This next step involves the application authenticating into Watson Workspace. First you will need to populate the fields below so we can generate the
          proper parameters to send to the authorization server.
        </p>
        <form onSubmit={this.createMSG}>
          <FormGroup>
            <div className='spaces_dropdown'>
              <Dropdown id='selected_space' options={this.state.spaces} value={this.state.selected.label} placeholder="Select a space" onChange={this._onSelect}/>
            </div>
            <div className='spaces_msg'>
              <ControlLabel htmlFor='selected_space_msg'>Create Message</ControlLabel>
              <FormControl componentClass='textarea' id='selected_space_msg' rows={4} onChange={this.handleChange}/>
            </div>
            <div>
              <Button type='submit' bsStyle="primary">Send Message</Button>
            </div>
          </FormGroup>
        </form>

        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
          aria-labelledby="modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="modal-title">Message Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h4>Your message has been created in the {this.state.selected.label} space</h4>
              <p>
                You can view your message here: <br/>
                <a href={'https://workspace.ibm.com/space/' + this.state.selected.value} > https://workspace.ibm.com/space/{this.state.selected.value}</a>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

CreateMSG.propTypes = {
  changeTab: React.PropTypes.func
}

export default CreateMSG;
