var check = require('dev-env-status-check')
var html = require('yo-yo')

var stream = check()

var state = {
  os: { loading: true },
  node: { loading: true },
  npm: { loading: true },
  git: { loading: true }
}

stream.on('data', function (data) {
  if (data.type === 'os') {
    state[data.type] = data
  } else {
    state[data.command] = data
  }
  update(state)
})

var app = render(state)
document.body.appendChild(app)

function render (state) {
  return layout(state)
}

function update (state) {
  var tree = render(state)
  html.update(app, tree)
}

function layout (state) {
  return html`<div class="container">
    ${header()}
    ${state.os ? osView(state.os) : ''}
    ${state.node ? nodeView(state.node) : ''}
    ${state.npm ? npmView(state.npm) : ''}
    ${state.git ? gitView(state.git) : ''}
  </div>`
}

function header () {
  return html`<header class="">
    <h1>Development Environment Status</h1>
  </header>`
}

function osView (state) {
  if (state.loading) {
    return html`<div class="">
      <h2>Checking your operating system ...</h2>
    </div>`
  } else {
    return html`<div class="">
      <h2 class="">About your operating system</h2>
      <p>You are using version ${state.release} of ${state.name}.</p>
    </div>`
  }
}

function nodeView (state) {
  if (state.loading) {
    return html`<h2 class="">Checking node ...</h2>`
  } else {
    var status = state.exists ? success() : fail()

    function fail () {
      return html`<p>💥❗️ No, node is not yet installed, but we can help with that! ❗️💥 </p>`
    }

    function success () {
      return html`<div>
        <p>✨💖 Yes! Node is installed! 💖✨</p>
        <p>Version: ${state.version}</p>
        <p>Path: ${state.path}</p>
      </div>`
    }

    return html`<div class="">
      <h2 class="">Is node installed?</h2>
      ${status}
    </div>`
  }
}

function npmView (state) {
  if (state.loading) {
    return html`<h2 class="">Checking npm ...</h2>`
  } else {
    var status = state.exists ? success() : fail()

    function fail () {
      return html`<p>💥❗️ No, npm is not yet installed, but we can help with that! ❗️💥 </p>`
    }

    function success () {
      return html`<div>
        <p>✨💖 Yes! npm is installed! 💖✨</p>
        <p>Version: ${state.version}</p>
        <p>Path: ${state.path}</p>
      </div>`
    }

    return html`<div class="">
      <h2 class="">Is npm installed?</h2>
      ${status}
    </div>`
  }
}

function gitView (state) {
  if (state.loading) {
    return html`<h2 class="">Checking git ...</h2>`
  } else {
    var status = state.exists ? success() : fail()

    function fail () {
      return html`<p>💥❗️ No, git is not yet installed, but we can help with that! ❗️💥 </p>`
    }

    function success () {
      return html`<div>
        <p>✨💖 Yes! git is installed! 💖✨</p>
        <p>Version: ${state.version}</p>
        <p>Path: ${state.path}</p>
      </div>`
    }

    return html`<div class="">
      <h2 class="">Is git installed?</h2>
      ${status}
    </div>`
  }
}
