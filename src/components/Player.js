import React, { Component } from 'react';
import { Button} from 'reactstrap';

class Player extends Component{

  constructor(props) {
    super(props);
  }

  render(){
    return(

      <tr key={this.props.id}>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.avgPts}</td>
        <td> {this.props.isPG ==1 ? ('PG  ') : ('')}
             {this.props.isSG ==1 ? ('SG  ') : ('')}
             {this.props.isSF ==1 ? ('SF  ') : ('')}
             {this.props.isPF ==1 ? ('PF  ') : ('')}
             {this.props.isC ==1 ? ('C  ') : ('')}
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
