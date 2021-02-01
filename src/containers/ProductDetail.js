import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductById } from '../actions/category'
import CircularIndeterminate from '../components/commons/Loading';
const ProductDetail = (props) => {
  const { id } = useParams();
  useEffect(() => {
    props.getProductById(id)
  }, [])
  const product = props.productsData[id]
  if (!product) return null

  if (props.isFetchingProduct) return <div><CircularIndeterminate /></div>
  console.log(product)
  return (
    <div>{product.itemTitle}</div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.category
  }
}
export default connect(mapStateToProps, { getProductById })(ProductDetail)
