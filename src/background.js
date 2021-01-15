const manifest = './pixmaps/manifest.json'

let timeout = 6000
let index = 0
let images = []
let el
let interval

function loadManifest() {
  return fetch(manifest).then(function(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  })
}

function initializeBackgroundsElement(file) {
  return document.querySelector('aside.bg')
}

function setNextBackground() {
  index = Math.floor(Math.random() * Math.floor(images.length))
  el.style.backgroundImage = 'url(' + images[index].webp + ')'
}

function runBackgrounds(backgrounds) {
  setNextBackground()
  interval = setInterval(function() {
    setNextBackground()
  }, timeout)
}

function reduceByName(aggr, item) {
  const nameSplit = item.split('.')
  const baseName = nameSplit.slice(0, -1).join('.')
  const suffix = nameSplit.slice(-1)
  const index = aggr.findIndex(function(x) { return x.name === baseName })
  const newObj = { name: baseName }
  newObj[suffix] = './pixmaps/' + item

  if (index === -1) {
    return aggr.concat([newObj])
  }
  aggr[index] = Object.assign({}, aggr[index], newObj)
  return aggr
}

function createBackgrounds() {
  loadManifest().then(function (files) {
    images = files.reduce(reduceByName, [])
    runBackgrounds()
  })
}

function main() {
  el = initializeBackgroundsElement()
  createBackgrounds()
}

document.addEventListener('DOMContentLoaded', main)
