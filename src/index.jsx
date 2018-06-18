import React from 'react'
import ReactDOM from 'react-dom'

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
      posts: {}
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

  render () {
    const hunters = Object.keys(this.state.posts).map((key) => {
      const hunter = this.state.posts[key]
      return (
        <tr key={key}>
          <td>{hunter.name}</td>
          <td>{hunter.posts_count}</td>
        </tr>
      )
    })

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {hunters}
        </tbody>
      </table>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
