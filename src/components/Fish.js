import React from 'react'
import { formatPrice } from '../helpers';

const Fish = (props) => {
  const {name, image, price, desc, status} = props.fish
  const isAvailable = status === 'available'
  const handleClick = () => {
    props.addToOrder(props.index)
  }

  return (
    <li className="menu-fish">
      <img src={image} alt={name}/>
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button disabled={!isAvailable} onClick={handleClick}>{isAvailable ? 'Add to cart' : 'Sold out!'}</button>
    </li>
  )
}

export default React.memo(Fish)