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
      let profilePicture = hunter.image_url
      if (profilePicture) {
        profilePicture = profilePicture.replace(/w=original/g, 'w=100')
        profilePicture = profilePicture.replace(/h=original/g, 'h=100&fit=crop')
      }

      return (
        <div key={key} className='img'>
          <img src={profilePicture} alt='' className='card-img-top' id={`popover${key}`} onClick={this.toggle.bind(this, key)} />

          <Popover placement='bottom' isOpen={this.state.popoverOpen[key]} target={`popover${key}`} toggle={this.toggle.bind(this, key)}>
            <PopoverHeader># {parseInt(key) + 1}</PopoverHeader>
            <PopoverBody>
              <table>
                <tbody>
                  <tr>
                    <td colspan='2'>
                      <a href={hunter.profile_url} target='_blank' className='name'>{hunter.name}</a>
                      <div className='headline'>{hunter.headline}</div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan='2'>&nbsp;</td>
                  </tr>
                  <tr>
                    <td>Posts:</td>
                    <td>{hunter.posts_count}</td>
                  </tr>
                  <tr>
                    <td>Followers:</td>
                    <td>{hunter.followers_count}</td>
                  </tr>
                  <tr>
                    <td>Maker of:</td>
                    <td>{hunter.maker_of_count}</td>
                  </tr>
                  {
                    hunter.twitter_username ? (
                      <tr>
                        <td>Twitter:</td>
                        <td><a href={`https://twitter.com/${hunter.twitter_username}`} target='_blank'>@{hunter.twitter_username}</a></td>
                      </tr>
                    ) : ''
                  }
                </tbody>
              </table>
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
