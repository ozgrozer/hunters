import React from 'react'
import ReactDOM from 'react-dom'
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap'

import './../css/style.scss'

const ajax = (opts) => {
  const request = new window.XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      opts.success(JSON.parse(request.responseText))
    }
  }
  request.open('get', opts.url, true)
  request.send()
}

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      posts: {},
      popoverOpen: {}
    }
  }

  componentDidMount () {
    ajax({
      url: './hunters/posts.json',
      success: (hunters) => {
        this.setState({ posts: hunters })
      }
    })
  }

  toggle (key) {
    const popoverOpen = this.state.popoverOpen
    popoverOpen[key] = !this.state.popoverOpen[key]

    this.setState({
      popoverOpen: popoverOpen
    })
  }

  render () {
    const hunters = Object.keys(this.state.posts).map((key) => {
      const hunter = this.state.posts[key]

      return (
        <div key={key} className='img'>
          <img src='https://gradientjoy.com/100' alt='' className='card-img-top' id={`popover${key}`} onClick={this.toggle.bind(this, key)} />

          <Popover placement='bottom' isOpen={this.state.popoverOpen[key]} target={`popover${key}`} toggle={this.toggle.bind(this, key)}>
            <PopoverHeader>{hunter.name}</PopoverHeader>
            <PopoverBody>
              Posts: {hunter.posts_count}
            </PopoverBody>
          </Popover>
        </div>
      )
    })

    return (
      <React.Fragment>
        {hunters}
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
