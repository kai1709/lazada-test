import { Button, Divider, Grid, Paper } from '@material-ui/core'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCategoryDetail, getProducts } from '../actions/category'
import CircularIndeterminate from '../components/commons/Loading'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ProductCard from '../components/ProductCard'
import './CategoryDetail.scss'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

export const CategoryDetail = (props) => {
  const { id } = useParams();

  useEffect(() => {
    props.getCategoryDetail(id)
  }, [])

  const category = props.categoriesData[id]

  if (props.isFetchingCategory) return <CircularIndeterminate />

  if (!category) return null

  return (
    <div className="category-detail">
      <Button aria-label="button-back" onClick={props.history.goBack} className="button-back">
        <ArrowBackIosIcon color="primary" />Back
      </Button>
      <div className="category-header" style={{ backgroundImage: `url(${category.bannerUrl})` }}>
        <div className="header">{category.title}</div>
        <div className="subtitle">{category.subtitle}</div>
      </div>
      <Divider />
      {
        !props.isFetchingProduct && category.products.length === 0 && (
          <div className="no-products-text">No products in this category</div>
        )
      }
      <div className="products-list">

        <Grid container spacing={3}>
          {
            category.products && category.products.map(product => (
              <Grid key={product._id || '_id'} item xs={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          }
        </Grid>
      </div>
      {
        category.products.length > 0 && category.products.length < category.totalProductsCount && (
          <div className="load-more-container">
            {
              props.isFetchingProduct ?
                <CircularIndeterminate /> :
                <Button
                  onClick={() => props.getProducts(id)}
                  color="primary"
                  variant="contained"
                  className="button-load-more"
                >
                  Load more
                </Button>
            }
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.category
  }
}
export default connect(mapStateToProps, { getCategoryDetail, getProducts })(withRouter(CategoryDetail))
