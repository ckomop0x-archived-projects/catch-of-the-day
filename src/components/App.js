import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Header from './Header'
import Inventory from './Inventory'
import Order from './Order'
import sampleFishes from '../sample-fishes'
import Fish from './Fish';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  addFish = fish => {
    const fishes = {...this.state.fishes};

    fishes[`fish${Date.now()}`] = fish;
    this.setState({fishes})
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of a current state
    const fishes = { ...this.state.fishes }
    // 2. Update that state
    fishes[key] = updatedFish
    // 3. Set that to state
    this.setState({fishes})
  }

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes }
    fishes[key] = null
    this.setState({fishes})
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = {...this.state.order}
    // 2. Either add to the order , or update the number in our order
    order[key] = order[key] + 1 || 1
    // 3. Call setState to update our state object
    this.setState({order})
  };

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = {...this.state.order}
    // 2. Either add to the order , or update the number in our order
    // order[key] = order[key] - 1 || null
    delete order[key]
    // 3. Call setState to update our state object
    this.setState({order})
  };

  componentDidMount() {
    const {params} = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId)

    if (localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)})
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {params} = this.props.match;

    localStorage.setItem(params.storeId, JSON.stringify(this.state.order))
  }

  render() {
    const {fishes, order} = this.state;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market"/>
          <ul className="fishes">
            {Object.keys(fishes).map((key, index) => (
              <Fish key={`${key}-${index}`}
                    fish={fishes[key]}
                    index={key}
                    addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={fishes} order={order} removeFromOrder={this.removeFromOrder}/>
        <Inventory addFish={this.addFish}
                   updateFish={this.updateFish}
                   deleteFish={this.deleteFish}
                   loadSampleFishes={this.loadSampleFishes}
                   storeId={ this.props.match.params.storeId}
                   fishes={fishes}/>
      </div>
    )
  }
}

export default App
