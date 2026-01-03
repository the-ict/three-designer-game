import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1> Hello mother fucker !. </h1>
  </div>
`


setupCounter(document.querySelector('#counter'))
