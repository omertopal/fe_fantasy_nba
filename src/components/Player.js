import React, { Component } from 'react';
import { Button} from 'reactstrap';

class Player extends Component{

  constructor(props) {
    super(props);
  }

  render(){

    var {player} = this.props;

    if(player==null){
      return null;
    }

    var {id,name,avgPts,isPG,isSG,isSF,isPF,isC} = player;

    return(

      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{avgPts}</td>
        <td> {isPG ==1 ? ('PG  ') : ('')}
             {isSG ==1 ? ('SG  ') : ('')}
             {isSF ==1 ? ('SF  ') : ('')}
             {isPF ==1 ? ('PF  ') : ('')}
             {isC ==1 ? ('C  ') : ('')}
        </td>
        <td>
          <Button color="success" size="sm" className="mr-2">Edit</Button>
          <Button color="danger" size="sm">Delete</Button>
        </td>
      </tr>
    )
  }
}

export default Player;
