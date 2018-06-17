var ajax = (opts) => {
  var request = new window.XMLHttpRequest()
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      opts.success(JSON.parse(request.responseText))
    }
  }
  request.open('get', opts.url, true)
  request.send()
}

ajax({
  url: './hunters/posts.json',
  success: (hunters) => {
    var html = '<table><thead><tr><th>Name</th><th>Posts</th></tr></thead><tbody>'
    for (var key in hunters) {
      var hunter = hunters[key]
      html += '<tr><td>' + hunter.name + '</td><td>' + hunter.posts_count + '</td></tr>'
    }
    html += '</tbody></table>'

    var root = document.getElementById('root')
    root.innerHTML = html
  }
})
