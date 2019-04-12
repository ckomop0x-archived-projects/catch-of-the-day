import React from 'react'
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({addToOrder, fish, index}) => {
  const {name, image, price, desc, status} = fish
  const isAvailable = status === 'available'
  const handleClick = () => {
    addToOrder(index)
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

Fish.propTypes = {
  fish: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    status: PropTypes.string,
  }),
  index: PropTypes.number,
  addToOrder: PropTypes.func
}

export default React.memo(Fish)
