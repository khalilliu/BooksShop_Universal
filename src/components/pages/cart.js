import React from 'react';
import {connect} from 'react-redux';
import {Panel, Col, Row, Well, Button ,ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {getCart,deleteCartItem, updateCart} from '../../actions/cartActions';

class Cart extends React.Component{

	constructor(){
		super();
		this.state = {
			showModal: false
		}
	}

	componentDidMount(){
		this.props.getCart();
	}

	render(){
		if(this.props.cart[0]){
			return this.renderCart();
		}else{
			return this.renderEmpty();
		}
	}

	openModal(){
		this.setState({showModal: true})
	}

	closeModal(){
		this.setState({showModal: false})
	}

	// handleDeleteCart(cartArr){
	// 	this.props.deleteCartItem(cartArr)
	// }

	onDelete(_id){

		const currentBookToDelete= [...this.props.cart];
		const indexToDelete = currentBookToDelete.findIndex(function(cart){return cart._id === _id})
		let cartAfterDelete = [...currentBookToDelete.slice(0,indexToDelete),...currentBookToDelete.slice(indexToDelete+1)];
		this.props.deleteCartItem(cartAfterDelete);
	}

	onIncrement(_id){
		this.props.updateCart(_id,1,this.props.cart)
	}

	onDecrement(_id,quantity){
		if(quantity > 1){
			this.props.updateCart(_id,-1,this.props.cart);
		}
	}

	renderEmpty(){
		return (<div></div>)
	}

	renderCart(){
		const cartItemsList = this.props.cart.map((cartArr,i) => {
			return(
				<Panel key={i}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{cartArr.title}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>{cartArr.price}</h6>
						</Col>
						<Col xs={12} sm={2}>
							<h6>QTY. <Label bsStyle='success'>{cartArr.quantity}</Label></h6>
						</Col>
						<Col xs={12} sm={4}>
							<ButtonGroup>
								<Button onClick={this.onDecrement.bind(this,cartArr._id, cartArr.quantity)} bsStyle='default' bsSize='small'>-</Button>
								<Button onClick={this.onIncrement.bind(this,cartArr._id)} bsStyle='default' bsSize='small'>+</Button>
								<span></span>
								<Button onClick={this.onDelete.bind(this,cartArr._id)} bsStyle='danger' bsSize='small'>Delete</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			)
		})
		return (
			<div className='container'>
			<Panel header='Cart' bsStyle='primary'>
				{cartItemsList}
				<Row>
					<Col xs={12}>
						<h6>Total amount: <strong>{this.props.totalAmount}</strong></h6>
						<Button onClick={this.openModal.bind(this)} bsStyle='success' bsSize='small'>
							PROCEED TO CHECKOUT
						</Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          	<h6>Your order has been saved.</h6>
          	<p>You will receive an email confirmation.</p>
          </Modal.Body>
          <Modal.Footer>
          	<Col xs={6}>
          		<h6>total $:{this.props.totalAmount}</h6>
          	</Col>
            <Button onClick={this.closeModal.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
			</Panel>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getCart,deleteCartItem, updateCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);