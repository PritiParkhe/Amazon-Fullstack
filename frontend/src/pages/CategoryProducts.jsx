import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProducts = () => {
  const params = useParams()
  console.log("Category", );
  return (
    <div>{params?.categoryNames}</div>
  )
}

export default CategoryProducts