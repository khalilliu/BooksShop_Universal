import React from 'react';
import {MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';

import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {bindActionCreators} from 'redux';

import {postBooks, deleteBooks,getBooks,resetButton} from '../../actions/booksActions';
import axios from 'axios';

class BookForm extends React.Component{
	constructor(){
		super();
		this.state = {
			images:[{}],
			img:''
		}
	}
	//listcircle function
	componentDidMount(){
		this.props.getBooks();
		//GET IMAGES FROM API
		axios.get('/api/images')
		.then(function(res){
			this.setState({images: res.data})
		}.bind(this))
		.catch(function(err){
			this.setState({image:'error loading image file from the server', img:''})
		}.bind(this))
	}


	//event action
	handleSubmit(){
		const book = [{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			images: findDOMNode(this.refs.image).value,
			price: findDOMNode(this.refs.price).value
		}]
		console.log(book);
		this.props.postBooks(book);
	}

	handleSelect(img){
		this.setState({
			img: '/images/' + img
		})
	}

	deleteSelectBook(){
		let bookId = findDOMNode(this.refs.delete).value;
		this.props.deleteBooks(bookId);

	}

	resetForm(){
		console.log(this.props);
		this.props.resetButton();

		findDOMNode(this.refs.title).value = '';
		findDOMNode(this.refs.description).value = '';
		findDOMNode(this.refs.image).value = '' ;
		findDOMNode(this.refs.price).value = '' ;
		this.setState({img:''});
	}

	render(){
		const bookList = this.props.books.map(function(bookarr){
			return (
				<option key={bookarr._id}>{bookarr._id}</option>
			)
		})

		const imgList = this.state.images.map(function(imgArr,i){
			return(
				<MenuItem 
					key={i} eventKey={imgArr.name}
					onClick={this.handleSelect.bind(this,imgArr.name)}
				>
					{imgArr.name}
				</MenuItem>
			)
		}, this);

		return(
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup >
								<FormControl type='text' ref='image' value={this.state.img} />
									<DropdownButton 
										componentClass={InputGroup.Button}
										id='input-dropdowm-addon'
										title='select an image'
										bsStyle='primary'
									>
									{imgList}
									</DropdownButton>
							</InputGroup>
							<Image src={this.state.img} responsive />
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup controlId='title' validationState={this.props.validation}>
								<ControlLabel>Title</ControlLabel>
								<FormControl
									type='text'
									placeholader = 'Enter title'
									ref='title'
								/>
								<FormControl.Feedback />
							</FormGroup>

							<FormGroup controlId='description' validationState={this.props.validation}>
								<ControlLabel>Description</ControlLabel>
								<FormControl
									type='text'
									placeholader = 'Enter description'
									ref='description'
								/>
								<FormControl.Feedback />
							</FormGroup>

							<FormGroup controlId='price' validationState={this.props.validation}>
								<ControlLabel>Price</ControlLabel>
								<FormControl
									type='number'
									placeholader = 'Enter Price'
									ref='price'
								/>
								<FormControl.Feedback />
							</FormGroup>
							<Button
								onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
								bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
								{(!this.props.msg) ? ("Save book" ): (this.props.msg)}
							</Button>
						</Panel>

						<Panel style={{marginTop:'15px'}}>
					    <FormGroup controlId="formControlsSelect">
					      <ControlLabel>Select a book to delete</ControlLabel>
					      <FormControl ref='delete' componentClass="select" placeholder="select">
					        <option value="select">select</option>
					        {bookList}
					      </FormControl>
					      <Button onClick={this.deleteSelectBook.bind(this)} bsStyle='danger' style={{marginTop:'15px'}}>Delete book</Button>
					    </FormGroup>
						</Panel>
					</Col>
				</Row>
			</Well>
		)
	}
}

function mapStateToProps(state){
	return {
		books: state.books.books,
		msg: state.books.msg,
		style:state.books.style,
		validation:state.books.validation
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({postBooks, getBooks ,deleteBooks, resetButton},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);