import React, { Component } from 'react'
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

  addFish = fish => {
    const fishes = {...this.state.fishes};

    fishes[`fish${Date.now()}`] = fish;
    this.setState({fishes})
  };

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
              <Fish key={`${key}-${index}`} fish={fishes[key]} index={key} addToOrder={this.addToOrder}/>
            ))}
          </ul>
        </div>
        <Order fishes={fishes} order={order}/>
        <Inventory addFish={this.addFish}
                   loadSampleFishes={this.loadSampleFishes}
                   fishes={fishes}/>
      </div>
    )
  }
}

export default App
