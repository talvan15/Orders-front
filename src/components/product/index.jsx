import React from 'react'

function Product({name, price}) {
  return (
    <div className='flex w-full p-3 justify-between'>
      <div>
        nome: {name}
      </div>
      <div>
        preço: {price}
      </div>
    </div>
  )
}

export default Product