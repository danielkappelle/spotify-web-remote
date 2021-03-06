import React, { Component } from 'react'
import './style.css'
import 'font-awesome/css/font-awesome.css'
import logohuis from './logo-huis.png'
import logo from './logo.svg'
import * as api from './api.js'
import * as _ from 'lodash'
import Favicon from 'react-favicon'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      artist: 'Loading...',
      song: 'Loading...',
      playing: false,
      artworkUrl: 'nil',
      searchResults: [],
      showSearch: false
    }

    this.onResultsChange = this.onResultsChange.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.openSearch = this.openSearch.bind(this)
  }

  componentDidMount () {
    this.timerId = setInterval(
      () => this.update(),
      1000
    )

    var head = document.getElementsByTagName('head')[0]
    var linkEl = document.createElement('link')
    linkEl.rel = 'apple-touch-icon'
    linkEl.href = logohuis
    head.appendChild(linkEl)

    head = document.getElementsByTagName('head')[0]
    linkEl = document.createElement('link')
    linkEl.rel = 'icon'
    linkEl.href = logohuis
    linkEl.type = 'image/png'
    head.appendChild(linkEl)
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

  openSearch () {
    this.setState({
      showSearch: true
    })
  }

  onResultsChange (newResults) {
    console.log('Results changed')
    this.setState({
      searchResults: newResults
    })
  }

  clearSearch () {
    this.setState({
      searchResults: [],
      showSearch: false
    })
  }

  render () {
    return (
      <div className='App'>
        <Favicon url={logohuis} />
        <Header onResultsChange={this.onResultsChange} showSearch={this.state.showSearch} openSearch={this.openSearch} clearSearch={this.clearSearch} />
        <Body artworkUrl={this.state.artworkUrl} searchResults={this.state.searchResults} clearSearch={this.clearSearch} />
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

    this.searchCounter = 0
  }

  search (e) {
    this.searchCounter += 1
    let currentSearchCounter = this.searchCounter
    api.get('search/' + e.target.value)
      .then((result) => {
        let searchResults = []
        /* tracks */
        _.forEach(result.body.tracks.items, (track) => {
          searchResults.push({name: track.name, uri: track.uri, artist: track.artists.map(x => x.name).join(', ')})
        })
        if (this.searchCounter === currentSearchCounter) {
          this.props.onResultsChange(searchResults)
        }
      })
  }

  render () {
    return (
      <header>
        <img src={logo} />
        <div className='search-icon' onClick={this.props.openSearch}><span className='fa fa-search' /></div>
        { this.props.showSearch && <div className='search-bar'><input type='text' placeholder='Search' onKeyUp={e => this.search(e)} />
          <div className='clear-search' onClick={this.props.clearSearch}><span className='fa fa-times' /></div></div> }
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
              <SearchResult result={result} clearSearch={this.props.clearSearch} />
            )}
          </div>
        }
      </div>
    )
  }
}

class SearchResult extends Component {
  constructor (props) {
    super(props)
    this.playSong = this.playSong.bind(this)
  }

  playSong () {
    api.get('play/' + this.props.result.uri)
    this.props.clearSearch()
  }

  render () {
    return (
      <div className='search-result' onClick={this.playSong}>{this.props.result.name} <span className='result-artist'>{this.props.result.artist}</span></div>
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
