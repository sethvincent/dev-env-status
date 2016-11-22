var check = require('dev-env-status-check')
var html = require('yo-yo')

check({}, function (status) {
  var tree = layout(status)
  document.body.appendChild(tree)
})

function layout (state) {
  return html`<div class="">
    ${header()}
    ${osView(state.os)}
    ${nodeView(state.node)}
    ${npmView(state.npm)}
    ${gitView(state.git)}
    ${atomView(state.atom)}
    ${homebrewView(state.homebrew)}
  </div>`
}

function header () {
  return html`<header class="">
    <h1>Development Environment Status</h1>
  </header>`
}

function osView (state) {
  return html`<div class="">
    <h2 class="">About your operating system</h2>
  </div>`
}

function nodeView (state) {
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

function npmView (state) {
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

function gitView (state) {
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

function atomView (state) {
  var status = state.exists ? success() : fail()

  function fail () {
    return html`<p>💥❗️ No, atom is not yet installed, but we can help with that! ❗️💥 </p>`
  }

  function success () {
    return html`<div>
      <p>✨💖 Yes! atom is installed! 💖✨</p>
      <p>Version: ${state.version}</p>
      <p>Path: ${state.path}</p>
    </div>`
  }

  return html`<div class="">
    <h2 class="">Is atom installed?</h2>
    ${status}
  </div>`
}

function homebrewView (state) {
  var status = state.exists ? success() : fail()

  function fail () {
    return html`<p>💥❗️ No, homebrew is not yet installed, but we can help with that! ❗️💥 </p>`
  }

  function success () {
    return html`<div>
      <p>✨💖 Yes! homebrew is installed! 💖✨</p>
      <p>Version: ${state.version}</p>
      <p>Path: ${state.path}</p>
    </div>`
  }

  return html`<div class="">
    <h2 class="">Is homebrew installed?</h2>
    ${status}
  </div>`
}
