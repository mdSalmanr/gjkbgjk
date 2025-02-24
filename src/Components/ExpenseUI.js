import React from 'react'

const ExpenseUI = ({expenses}) => {
  return (

    <ul>
      {expenses.map((item,id)=>{
        return(
        
          <li key={id} >
            <h3>{item.price}-{item.type}-{item.category}<button>Delete</button><button>Edit</button></h3>
          </li>
        )        
      })}
    </ul>
  )
}

export default ExpenseUI