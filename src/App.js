import React, { Component } from 'react'
import CapsuleContract from '../build/contracts/Capsule.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      capsuleInstance: null,
      newMsgInput: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const capsule = contract(CapsuleContract);
    capsule.setProvider(this.state.web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    let capsuleInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      capsule.deployed().then((instance) => {
        capsuleInstance = instance;
        this.setState({ capsuleInstance })
        return capsuleInstance.setMessage('hello world', {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return capsuleInstance.getMessage.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        let stringResult = this.state.web3.toAscii(result);
        return this.setState({ storageValue: stringResult })
      })
    })
  }

  handleChange(event) {
    this.setState({newMsgInput: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Note To Self</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Ethereum Time Capsule</h1>
              <form>
                <input type="text" maxLength="32" value={this.state.newMsgInput} onChange={this.handleChange}/>
                <input type="submit" value="Transact"/>
              </form>
            </div>
            <div className="pure-u-1-1">
              <h1>Ethereum Time Capsule</h1>
              <p>Your message is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
