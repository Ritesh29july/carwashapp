import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';


class Customer extends Component {
	constructor(props){
        super(props);
        this.state ={deps:[], addModalShow : false, editModalShow : false}
    }
componentDidMount(){
	this.refreshList();
}
     refreshList(){
       fetch('http://localhost:8080/getCustomerDetails')
       .then(response=> response.json())
       .then(data => {
        this.setState({deps:data});
       }
        );
    }
componentDidUpdate(){
        this.refreshList();
    }
 deleteDep(depid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('http://localhost:8080/delete/'+depid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }


  render(){
  	const {deps, custId, depname, depadd, depcity, depph, depact} = this.state;
  	 let addModalClose =() => this.setState({addModalShow:false});
  	 let editModalClose =() => this.setState({editModalShow:false});

        return(
          <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>CustomerID</th>
                    <th>CustomerName</th>
                    <th>address</th>
                    <th>city</th>
                    <th>phoneNumber</th>
                    <th>active</th>
                    <th>Options</th>
                   
                </tr>
            </thead>
            <tbody>
                {deps.map(dep=>
                   <tr key ={dep.customerId}> 
                   <td>{dep.customerId}</td>
                   <td>{dep.name}</td>
                   <td>{dep.address}</td>
                   <td>{dep.city}</td>
					<td>{dep.phoneNumber}</td>
                   <td>{dep.active}</td>
                    <td>
    <ButtonToolbar>
				<Button
				className="mr-2" variant="info"
				onClick= {()=> this.setState({editModalShow:true, 
					custId:dep.customerId, 
					depname:dep.name, 
					depadd:dep.address, 
					depcity:dep.city,
					depph:dep.phoneNumber, 
					depact:dep.active})}
				>
				    Edit
				</Button>

				<Button className="mr-2" 
				onClick={()=> this.deleteDep(dep.customerId)} 
				variant="danger"
				>Delete</Button>

				<EditCustomer
				show = {this.state.editModalShow}
				onHide={editModalClose}
				custId = {custId}
				depname = {depname}
				depadd = {depadd}
				depcity = {depcity}
				depph = {depph}
				depact = {depact}
				/>

	</ButtonToolbar>
                   </td>
                   </tr>
                   )}
            </tbody>
            </Table>
<ButtonToolbar>
    <Button
    variant='primary'
    onClick={()=> this.setState({addModalShow: true})} 
    >Add Customer</Button>

    <AddCustomer
    show={this.state.addModalShow}
    onHide={addModalClose}
    />

</ButtonToolbar>
</div>
        )
    }
}

export default Customer;