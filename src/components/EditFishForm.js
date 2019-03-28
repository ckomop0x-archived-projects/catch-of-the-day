import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class EditFishForm extends Component {
  handleChange = (event) => {

  }

  render() {
    const { name, price, desc, status, image } = this.props.fish;

    return (
      <div className="fish-edit">
        <input name="name" type="text" onChange={this.handleChange} value={name}/>
        <input name="price" type="text" onChange={this.handleChange} value={formatPrice(price)}/>
        <select name="status" onChange={this.handleChange} value={status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" value={desc} onChange={this.handleChange}/>
        <input name="image" type="text" onChange={this.handleChange} value={image}/>
      </div>
    );
  }
}

export default EditFishForm;
