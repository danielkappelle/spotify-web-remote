import React, { Component } from 'react'
import './style.css'
import 'font-awesome/css/font-awesome.css'
import logo from './logo.svg'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Body />
        <Controls />
      </div>
    )
  }
}

class Header extends Component {
  render () {
    return (
      <header>
        <img src={logo} />
        <div className='search-icon'><span class='fa fa-search' /></div>
      </header>
    )
  }
}

class Body extends Component {
  render () {
    return (
      <div className='artwork'>
        <p>The artwork will be here</p>
      </div>
    )
  }
}

class Artist extends Component {
  render () {
    return (
      <span className='artist'>Sample Artist</span>
    )
  }
}

class Song extends Component {
  render () {
    return (
      <span className='song'>Sample Song</span>
    )
  }
}

class Controls extends Component {
  render () {
    return (
      <div className='controls'>
        <Artist /><br />
        <Song /><br />
        <button className='btn-controls'><span className='fa fa-step-backward' /></button>
        <button className='btn-controls'><span className='fa fa-pause' /></button>
        <button className='btn-controls'><span className='fa fa-step-forward' /></button>
      </div>
    )
  }
}

export default App
