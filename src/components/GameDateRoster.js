import React, { Component } from 'react';
import { Button} from 'reactstrap';

class GameDateRoster extends Component{

  constructor(props) {
    super(props);
  }

  render(){
    return(

      <tr key={this.props.gameDate}>
        <td>{this.props.gameDate}</td>
        <td>{this.props.pgModel ? this.props.pgModel.name : ('')}</td>
        <td>{this.props.sgModel ? this.props.sgModel.name : ('') }</td>
        <td>{this.props.sfModel ? this.props.sfModel.name : ('') }</td>
        <td>{this.props.pfModel ? this.props.pfModel.name : ('') }</td>
        <td>{this.props.cModel ? this.props.cModel.name : ('') }</td>
        <td>{this.props.utModel ? this.props.utModel.name : ('') }</td>
      </tr>

    )
  }
}

export default GameDateRoster;
