const GAUGE_MAX = 329

function setGaugePercent($node, percent) {
  const $gaugeCircle = $node.querySelector('.gauge__cirlce-arc')
  const $gaugePercent = $node.querySelector('.gauge__percent')
  
  const value = GAUGE_MAX * (percent)

  $gaugeCircle.setAttribute('stroke-dasharray', `${value} ${GAUGE_MAX}`)
  $gaugePercent.innerText = Math.round(percent * 100);

  let percentSpan = document.createElement('span');
  percentSpan.innerText = "%"
  percentSpan.className = "percent"
  $gaugePercent.append(percentSpan)

}

function saveState(state) {
  localStorage.setItem('todayAppState', JSON.stringify(state))
}

function getStoredStateOrDefault(defaultState) {
  const stateAsStr = localStorage.getItem('todayAppState')
  if (stateAsStr) {
    return JSON.parse(stateAsStr)
  } else {
    return defaultState
  }
}