import { Paper } from "@material-ui/core"
import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom'
import './ProductCard.scss'

const ProductCard = (props) => {
  const { product } = props;
  return (

    <Paper className="product-card">
      <Link to={`/product/${product.itemId}`}>
        <div className="product-image" style={{ backgroundImage: `url(${product.itemImg})` }} />
        <div className="product-info">
          <div className="product-title-container"><span className="product-title">{product.itemTitle}</span></div>
          <div className="product-discount-price">{product.currency} {product.itemDiscountPrice}</div>
          <div className="product-price">{product.itemPrice.length > 0 && product.currency} {product.itemPrice}&nbsp;</div>
          <div>
            <Rating name="read-only" value={product.itemRatingScore} readOnly /> ({product.itemReviews})
          </div>
        </div>
      </Link>
    </Paper>
  )
}

export default ProductCard
