import React, { Component } from 'react'
import './style.css'
import 'font-awesome/css/font-awesome.css'
import logo from './logo.svg'
import * as api from './api.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artist: 'Loading...',
      song: 'Loading...',
      playing: false,
      artworkUrl: 'nil',
      searchResults: []
    }

    this.onResultsChange = this.onResultsChange.bind(this)
  }

  componentDidMount () {
    this.timerId = setInterval(
      () => this.update(),
      1000
    )
  }

  componentWillUnmount () {
    clearInterval(this.timerId)
  }

  update () {
    api.get('currentSong')
      .then(result => {
        this.setState({
          artist: result.body.item.artists[0].name,
          song: result.body.item.name,
          playing: result.body.is_playing,
          artworkUrl: result.body.item.album.images[0].url
        })
      })
  }

  onResultsChange (newResults) {
    console.log('Results changed')
    this.setState({
      searchResults: newResults
    })
  }

  render () {
    return (
      <div className='App'>
        <Header onResultsChange={this.onResultsChange} />
        <Body artworkUrl={this.state.artworkUrl} searchResults={this.state.searchResults} />
        <Controls artist={this.state.artist} song={this.state.song} playing={this.state.playing} />
      </div>
    )
  }
}

class Header extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showSearch: false
    }

    this.openSearch = this.openSearch.bind(this)
  }

  openSearch () {
    this.setState({
      showSearch: true
    })
  }

  search (e) {
    console.log('search', e.target.value)
    this.props.onResultsChange(['a', 'b', 'c'])
  }

  render () {
    return (
      <header>
        <img src={logo} />
        <div className='search-icon' onClick={this.openSearch}><span className='fa fa-search' /></div>
        { this.state.showSearch && <div className='search-bar'><input type='text' placeholder='Search' onKeyUp={e => this.search(e)} /></div> }
      </header>
    )
  }
}

class Body extends Component {
  render () {
    return (
      <div className='body'>
        <div className='artwork'>
          <img src={this.props.artworkUrl} />
        </div>
        { this.props.searchResults.length > 0 &&
          <div className='search-results'>
            {this.props.searchResults.map((result, key) =>
              <SearchResult resultName={result} />
            )}
          </div>
        }
      </div>
    )
  }
}

class SearchResult extends Component {
  render () {
    return (
      <div className='search-result'>{this.props.resultName}</div>
    )
  }
}

class Artist extends Component {
  render () {
    return (
      <span className='artist'>{this.props.artist}</span>
    )
  }
}

class Song extends Component {
  render () {
    return (
      <span className='song'>{this.props.song}</span>
    )
  }
}

class Controls extends Component {
  constructor (props) {
    super(props)

    this.prev = this.prev.bind(this)
    this.next = this.next.bind(this)
    this.pause = this.pause.bind(this)
  }

  prev () {
    api.get('control/prev')
    // .then(() => this.update())
  }

  next () {
    api.get('control/next')
    // .then(() => this.update())
  }

  pause () {
    if (this.props.playing) {
      api.get('control/pause')
      // .then(() => this.update())
    } else {
      api.get('control/play')
      // .then(() => this.update())
    }
  }

  render () {
    return (
      <div className='controls'>
        <Artist artist={this.props.artist} /><br />
        <Song song={this.props.song} /><br />
        <button className='btn-controls' onClick={this.prev}><span className='fa fa-step-backward' /></button>
        <button className='btn-controls' onClick={this.pause}><span className={'fa fa-' + (this.props.playing ? 'pause' : 'play')} /></button>
        <button className='btn-controls' onClick={this.next}><span className='fa fa-step-forward' /></button>
      </div>
    )
  }
}

export default App
