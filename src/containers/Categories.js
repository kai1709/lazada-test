import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container';
import { GridList, GridListTile, Paper } from '@material-ui/core';
import { getCategories } from '../actions/category'
import Loading from '../components/commons/Loading'
import CategoryCard from '../components/CategoryCard';
import Divider from '@material-ui/core/Divider';
import './Categories.scss'

export const Categories = (props) => {
  useEffect(() => {
    props.getCategories()
  }, [])

  return (
    <div className="category-container">
      <div className="header">All Categories</div>
      <Divider />
      <div className="category-list">
        {props.isLoading ? <Loading /> : (
          <GridList cellHeight={160} className="grid-list" cols={3}>
            {props.categories.map(category => (
              <GridListTile key={category.id} cols={2}>
                <CategoryCard key={category.id} category={category} cols={2} />
              </GridListTile>
            ))}
          </GridList>
        )}
      </div>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.category
  }
}

export default connect(mapStateToProps, { getCategories })(Categories)
