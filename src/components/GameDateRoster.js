import React, { Component } from 'react';
import { Button} from 'reactstrap';

class GameDateRoster extends Component{

  constructor(props) {
    super(props);
  }

  render(){

    var {gameDate,pgModel,sgModel,sfModel,pfModel,cModel,isPF,utModel} = this.props.gameDateRoster;
    return(

      <tr key={gameDate}>
        <td>{gameDate}</td>
        <td>{pgModel ? pgModel.name : ('')}</td>
        <td>{sgModel ? sgModel.name : ('') }</td>
        <td>{sfModel ? sfModel.name : ('') }</td>
        <td>{pfModel ? pfModel.name : ('') }</td>
        <td>{cModel ? cModel.name : ('') }</td>
        <td>{utModel ? utModel.name : ('') }</td>
      </tr>

    )
  }
}

export default GameDateRoster;
