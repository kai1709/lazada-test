import { GridList, GridListTile, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './CategoryCard.scss'
import { Link } from 'react-router-dom'

const CategoryCard = (props) => {
  const { category } = props;
  return (
    <Link to={`/category/${category.id}`}>
      <div className="category-card" style={{ backgroundImage: `url(${category.bannerUrl})` }}>
        <div className="title">{category.title}</div>
      </div>
    </Link>
  )
}

export default CategoryCard
