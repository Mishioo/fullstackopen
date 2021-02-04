import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'


const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={props.handleChange} />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  handleChange: (event) => {
    dispatch(setFilter(event.target.value))
  }
})

export default connect(null, mapDispatchToProps)(Filter)
