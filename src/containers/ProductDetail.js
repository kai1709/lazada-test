import { Button, Divider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductById } from '../actions/category'
import CircularIndeterminate from '../components/commons/Loading';
import { withRouter } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './ProductDetail.scss'
import Rating from '@material-ui/lab/Rating';

const ProductDetail = (props) => {
  const { id } = useParams();
  useEffect(() => {
    props.getProductById(id)
  }, [])
  const product = props.productsData[id]
  if (!product) return null

  if (props.isFetchingProduct) return <div><CircularIndeterminate /></div>

  return (
    <div className="product-detail">
      <Button onClick={props.history.goBack} className="button-back">
        <ArrowBackIosIcon color="primary" />Back
      </Button>
      <div className="product-info-container">
        <div className="product-image" style={{ backgroundImage: `url(${product.itemImg})` }} />
        <div className="product-info">
          <div className="title">{product.itemTitle}</div>
          <div className="rating">
            <Rating name="read-only" value={product.itemRatingScore} readOnly /> <span className="rating-count">{product.itemReviews} Ratings</span>
          </div>
          <div className="price">
            <div className="discount-price">{product.currency} {product.itemDiscountPrice}</div>
            <div>
              <span className="product-price">{product.itemPrice.length > 0 && product.currency} {product.itemPrice}</span>
              -{product.itemDiscount}
            </div>
          </div>
          <div>
            <Button variant="contained" color="secondary" size="large" className="button-buy">Buy Now</Button>
          </div>
        </div>
      </div>
      <div className="product-description">
        <div className="header">Product Description</div>
        <Divider />
      </div>
      <div className="product-reviews">
        <div className="header">User Reviews</div>
        <Divider />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.category
  }
}
export default connect(mapStateToProps, { getProductById })(withRouter(ProductDetail))
