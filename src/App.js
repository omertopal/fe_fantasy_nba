import React, { Component } from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Button, FormGroup, Label, Input} from 'reactstrap';
import { Spinner } from 'reactstrap';
import Player from './components/Player';
import GameDateRoster from './components/GameDateRoster';
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
        <tbody>
          <Player id={player.id} name={player.name} avgPts={player.avgPts} isPG ={player.isPG}
                  isSG ={player.isSG} isSF ={player.isSF} isPF ={player.isPF} isC ={player.isC} />

        </tbody>
      )
    });


    let gameDateRosters = this.state.gameDateRosters.map((rosterOfDay) => {
      return (
        <tbody>
          <GameDateRoster gameDate={rosterOfDay.gameDate} pgModel={rosterOfDay.pgModel} sgModel={rosterOfDay.sgModel} sfModel={rosterOfDay.sfModel}
                          pfModel={rosterOfDay.pfModel} cModel={rosterOfDay.cModel} utModel={rosterOfDay.utModel}/>
        </tbody>
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
          {players}

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
          {gameDateRosters}

        </Table>
      </div>
    );
  }
}

export default App;
