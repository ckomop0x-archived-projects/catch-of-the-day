import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      image: PropTypes.string,
    }),
    index: PropTypes.string,
    deleteFish: PropTypes.func,
    updateFish: PropTypes.func,
  }

  handleChange = event => {
    const { name, value } = event.currentTarget;
    // update that fish
    // take a copy of a current fish
    const updatedFish = {
      ...this.props.fish,
      [name]: value
    };
    this.props.updateFish(this.props.index, updatedFish)
  }

  render() {
    const { name, price, desc, status, image } = this.props.fish;

    return (
      <div className="fish-edit">
        <input name="name" type="text" onChange={this.handleChange} value={name}/>
        <input name="price" type="text" onChange={this.handleChange} value={price}/>
        <select name="status" onChange={this.handleChange} value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" value={desc} onChange={this.handleChange}/>
        <input name="image" type="text" onChange={this.handleChange} value={image}/>
        <button onClick={() => this.props.deleteFish(this.props.index)}>Remove fish</button>
      </div>
    );
  }
}

export default EditFishForm;
