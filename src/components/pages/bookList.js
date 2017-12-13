"use stict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Carousel,Grid, Row, Button, Col} from 'react-bootstrap';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';


class BooksList extends React.Component{
	componentDidMount(){
		this.props.getBooks();
	}
	render(){
			//console.log(this.props.books)
			const booksList = this.props.books.map((booksArr,i) => {
				return (
					<Col xs={12} sm={6} md={6} key={i}>
						<BookItem
							_id = {booksArr._id}
							title={booksArr.title}
							description={booksArr.description}
							price={booksArr.price}
							images = {booksArr.images}
						/>
					</Col>
				)
			});
		return(
			<Grid >
				<Row>
					<Carousel>
						<Carousel.Item>
							<img width={900} height={500} alt="900x300" src='/images/banner1.jpeg'/>
							<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit
							libero, a pharetra augue mollis interdum.</p>
							</Carousel.Caption>
							</Carousel.Item>
							<Carousel.Item>
								<img width={900} height={500} alt="900x300" src="/images/banner2.jpeg"/>
								<Carousel.Caption>
							<h3>Second slide label</h3>
								<p>Lorem ipsum dolor sit
								amet, consectetur adipiscing elit.</p>
								</Carousel.Caption>
							</Carousel.Item>
					</Carousel>
				</Row>
				<Row style={{marginTop:'15px'}}>
					<Cart />
				</Row>
				<Row style={{marginTop:'15px'}}>

					{booksList}

					<Col xs={12} sm={6}>
						<BookForm />
					</Col>
				</Row> 

			</Grid>
		)
	}
}

function mapStateToProps(state){
	console.warn(state)

	return{
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({getBooks}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BooksList);