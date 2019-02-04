import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class App extends Component {

  state = {
    players : [],
    newPlayerData : {
      playerName : '',
      avgPoints : ''
    },
    newPlayerModal : false
  }

  componentWillMount(){
    axios.get('http://10.0.75.1:8084/nba/players/myPlayers').then((response) => {
      this.setState({
        players : response.data
      })
    });
  }


  toggleNewPlayerModal(){
    this.setState({
      newPlayerModal : ! this.state.newPlayerModal
    });
  }

  addPlayer (){

  }
  render() {
    let players = this.state.players.map((player) => {
      return (
        <tr key={player.id}>
          <td>{player.id}</td>
          <td>{player.name}</td>
          <td>{player.avgPts}</td>
          <td>PG:{player.isPG} SG:{player.isSG}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    });

    return (
      <div className="App container">

        <Button color="primary" className="float-right" onClick={this.toggleNewPlayerModal.bind(this)}>Add Player</Button>
        <Modal isOpen={this.state.newPlayerModal} toggle={this.toggleNewPlayerModal.bind(this)} >
          <ModalHeader toggle={this.toggleNewPlayerModal.bind(this)}>Add New Player</ModalHeader>
          <ModalBody>
          <FormGroup>
            <Label for="playerName">Player Name</Label>
            <Input id="playerName" value={this.state.newPlayerData.playerName} onChange={(e)=> {

              let { newPlayerData } = this.state;
              newPlayerData.playerName = e.target.value;
              this.setState = ({ newPlayerData});

            }}/>
          </FormGroup>
          <FormGroup>
            <Label for="avgPoints">Avg Points</Label>
            <Input id="avgPoints" value={this.state.newPlayerData.avgPoints} onChange={(e)=> {
              let {newPlayerData} = this.state;
              newPlayerData.avgPoints = e.target.value;
              this.setState = ({ newPlayerData})
            }}/>
          </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addPlayer.bind(this)}>Add Player</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewPlayerModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Avg Pts</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
