import React,{Component} from 'react';
import {Row , Col , Image,Button,Well} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends Component{

	constructor(){
		super();
		this.state={
			isClicked: false
		}
	}

	onReadMore(){
		this.setState({isClicked:!this.state.isClicked});
	}

	handleCart(){
		// const book = [...this.props.cart, {
		// 	id: this.props.id,
		// 	title: this.props.title,
		// 	description: this.props.description,
		// 	price: this.props.price
		// }];
		const book = [...this.props.cart,{
			_id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      price:this.props.price,
      images: this.props.images,
      quantity:1
		}];

		if(this.props.cart.length > 0){
			let _id =this.props._id;
			let cartIndex = this.props.cart.findIndex((cart)=>{
				return cart._id == _id;
			})

			if(cartIndex === -1 ){
				this.props.addToCart(book)
			}else{
				this.props.updateCart(_id,1,this.props.cart);
			}
		}else{
			this.props.addToCart(book)
		}
		
	}
	render(){
		return(
			<Well>
				<Row>
					<Col xs={12} sm={4}>
						<Image src={this.props.images} responsive />
					</Col>
					<Col xs={6} sm={8}>
						<h6>{this.props.title}</h6>
						<p>{(this.props.description.length>50&&this.state.isClicked==false)
							?(this.props.description.substring(0,50))
							:(this.props.description)}
							{
							(this.props.description.length>50)?
							(<button className='link' onClick={this.onReadMore.bind(this)}>
								{(this.props.description.length>50&&this.state.isClicked==false)?("...Read More"):('...Read Less')}
							</button>):''}
						</p>
						<h6>{this.props.price}</h6>
						<Button onClick={this.handleCart.bind(this)} bsStyle="primary">Buy Now</Button>
					</Col>
				</Row>
			</Well>
		)
	}
}

function mapStateToProps(state){
	return {
		cart: state.cart.cart
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToCart, updateCart},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
