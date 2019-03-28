import React from 'react'
import { getFunName } from '../helpers';

export default class StorePicker extends React.Component {
  myInput = React.createRef()

  goToStore = (event) => {
    event.preventDefault()

    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h1>Please enter a store</h1>
        <input type="text"
               required
               ref={this.myInput}
               placeholder="Store name"
               defaultValue={getFunName()}/>
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}
