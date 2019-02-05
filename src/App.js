import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, FormGroup, Label, Input} from 'reactstrap';
import { Spinner } from 'reactstrap';
import axios from 'axios';

class App extends Component {

  state = {
    gameDateRosters : [],
    players : [],
    newPlayerData : {
      playerName : '',
      avgPoints : ''
    },
    newPlayerModal : false
  }

  componentWillMount(){
    axios.get('http://localhost:8084/nba/players/myPlayers').then((response) => {
      this.setState({
        players : response.data
      })
    });
  }

  calculateOptaMethod(){
    axios.get('http://localhost:8084/nba/calc/calcUsage/OPTA').then((response) => {
      this.setState({
        gameDateRosters : response.data
      })
    });
  }

  calculateStandartMethod(){
    axios.get('http://localhost:8084/nba/calc/calcUsage/STD').then((response) => {

      this.setState({
        gameDateRosters :  response.data
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
          <td> {player.isPG ==1 ? ('PG  ') : ('')}
               {player.isSG ==1 ? ('SG  ') : ('')}
               {player.isSF ==1 ? ('SF  ') : ('')}
               {player.isPF ==1 ? ('PF  ') : ('')}
               {player.isC ==1 ? ('C  ') : ('')}
          </td>
          <td>
            <Button color="success" size="sm" className="mr-2">Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      )
    });


    let gameDateRosters = this.state.gameDateRosters.map((rosterOfDay) => {
      return (
        <tr key={rosterOfDay.gameDate}>
          <td>{rosterOfDay.gameDate}</td>
          <td>{rosterOfDay.pgModel ? rosterOfDay.pgModel.name : ('')}</td>
          <td>{rosterOfDay.sgModel ? rosterOfDay.sgModel.name : ('') }</td>
          <td>{rosterOfDay.sfModel ? rosterOfDay.sfModel.name : ('') }</td>
          <td>{rosterOfDay.pfModel ? rosterOfDay.pfModel.name : ('') }</td>
          <td>{rosterOfDay.cModel ? rosterOfDay.cModel.name : ('') }</td>
          <td>{rosterOfDay.utModel ? rosterOfDay.utModel.name : ('') }</td>
        </tr>
      )
    });

    return (
      <div className="App container">

        <Button color="primary" className="float-right" onClick={this.toggleNewPlayerModal.bind(this)}>Add Player</Button>
        {' '}
        <Button color="secondary"  className="float-md-right" onClick={this.calculateStandartMethod.bind(this)}>Standart Calculate</Button>{' '}
        <Button color="primary" className="float-right" onClick={this.calculateOptaMethod.bind(this)}>OPTA Calculate</Button>

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
        <Table>
          <thead>
            <tr>
              <th>Game Date</th>
              <th>Point Guard</th>
              <th>Shooting Guard</th>
              <th>Small Forward</th>
              <th>Power Forward</th>
              <th>Center</th>
              <th>Util</th>
            </tr>
          </thead>
          <tbody>
            {gameDateRosters}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
