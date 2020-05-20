import React, { Component } from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

class AddCustomer extends Component {
	 constructor(props){
        super(props);
        this.state = {deps:[], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*componentDidMount(){
        fetch('http://localhost:49902/api/department')
        .then(response => response.json())
        .then(data => {
        this.setState({deps:data});
        });
    }*/

    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
      };


      handleSubmit(event){
          console.log(event.target.customerName.value);
        event.preventDefault();
        fetch('http://localhost:8080/save',{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            name: event.target.CustomerName.value,
            address: event.target.Address.value,
            city: event.target.City.value,
            phoneNumber: event.target.PhoneNumber.value,
            active: event.target.Active.value
            
          })
        })
        .then(res=> res.json())
        .then((result)=>
        {
            //alert(result);
            this.setState({snackbaropen:true, snackbarmsg:result});
        },
        (error)=>{
          //alert('Failed')
          this.setState({snackbaropen:true, snackbarmsg:'failed'});
        }
        )
    }


    render(){
        return(
          <div className="container">
<Snackbar 
anchorOrigin={{vertical:'bottom',horizontal:'center'}}
open = {this.state.snackbaropen}
autoHideDuration = {3000}
onClose={this.snackbarClose}

message = {<span id="message-id">{this.state.snackbarmsg}</span>}
action={[
<IconButton
key="close"
arial-label="Close"
color="inherit"
onClick={this.snackbarClose}
>
  x
</IconButton>
]}
/>

            <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>

              <Form.Group controlId="CustomerName">
              <Form.Label>CustomerName</Form.Label>
              <Form.Control
                type="text"
                name="CustomerName"
                required
                placeholder="Customer Name"
               />
              </Form.Group>

              {/*
              <Form.Group controlId="Department">
              <Form.Label>Department</Form.Label>
             
             <Form.Control as="select">
                {this.state.deps.map(dep =>
                <option key={dep.DepartmentID}>{dep.DepartmentName}</option>
                    )}
             </Form.Control>
			 </Form.Group>

         */}

             
              <Form.Group controlId="Address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="Address"
                required
                placeholder="Address"
               />
              </Form.Group>

              <Form.Group controlId="City">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="City"
                required
                placeholder="City"
               />
              </Form.Group>

               <Form.Group controlId="PhoneNumber">
              <Form.Label>PhoneNumber</Form.Label>
              <Form.Control
                type="text"
                name="PhoneNumber"
                required
                placeholder="PhoneNumber"
               />
              </Form.Group>

               <Form.Group controlId="Active">
              <Form.Label>Active</Form.Label>
              <Form.Control
                type="text"
                name="Active"
                required
                placeholder="Active"
               />
              </Form.Group>


              <Form.Group>
                  <Button variant="primary" type="submit">
                  Add Customer
                  </Button>
              </Form.Group>
              </Form>
              </Col>
          </Row>

         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      </div>
        );
    }

}

export default AddCustomer;