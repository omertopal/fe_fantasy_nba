import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import axios from 'axios';

class App extends Component {

  state = {
    players : []
  }

  componentWillMount(){
    axios.get('http://10.0.75.1:8084/nba/players/myPlayers').then((response) => {
      this.setState({
        players : response.data
      })
    });
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
