import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    inputNum: '',
    fromBase: 2,
    toBase: 10,
    processOut: '',
    result: ''
  }

  chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
  ]

  render () {
    return (
      <main className='App wrapper'>
        <h3>Base<sub>x</sub>—Base<sub>y</sub> Converter</h3>
        <form
          onSubmit={e => {
            e.preventDefault()
            this.convert()
          }}
        >
          <label className='textfield'>
            <input
              type='text'
              onChange={e => this.setState({ inputNum: e.target.value })}
            />
            <span className='textfield__label'>Input Number</span>
          </label>
          <div className='grid'>
            <label className='textfield'>
              <input
                type='number'
                min={2}
                max={16}
                value={this.state.fromBase}
                onChange={e =>
                  this.setState({ fromBase: Number(e.target.value) })}
              />
              <span className='textfield__label'>From Base</span>
            </label>
            <label className='textfield'>
              <input
                type='number'
                min={2}
                max={16}
                value={this.state.toBase}
                onChange={e =>
                  this.setState({ toBase: Number(e.target.value) })}
              />
              <span className='textfield__label'>To Base</span>
            </label>
          </div>
          <button onClick={this.convert}>Convert</button>
        </form>
        <details className='process'>
          <summary>Process</summary>
          <pre dangerouslySetInnerHTML={{ __html: this.state.processOut }} />
        </details>
        <div>
          <h4>Output</h4>
          <pre>{this.state.result}</pre>
        </div>
        <footer>Copyright &copy; 2017 Fahad Hossain &middot; License: BSD-3-Clause</footer>
      </main>
    )
  }

  convert = e => {
    const fromVal = this.state.inputNum.split('')
    const base1 = this.state.fromBase
    const base2 = this.state.toBase
    const decValues = []
    let processOut = `|${fromVal.join('|')}|<sub>${base1}</sub>\n`
    let base10res = 0
    let result = 0

    fromVal.forEach((val, idx, me) => {
      const vMap = this.chars.indexOf(val)
      const revIdx = me.length - 1 - idx
      const decVal = vMap * base1 ** revIdx
      decValues.push(decVal)
      processOut += val
      if (vMap > 9) processOut += `(val: ${vMap})`
      processOut += ` &times; ${base1}<sup>${revIdx}</sup> = ${decVal}\n`
    })
    base10res = decValues.reduce((a, b) => a + b)
    processOut += `\n${decValues.join(' + ')} = ${base10res} &lt;-- In decimal\n`

    if (base2 === 10) {
      result = base10res
    } else {
      const rmndrs = []
      let divident = base10res
      while (divident > 0) {
        processOut += `${divident} &divide; ${base2} = `
        const remainder = divident % base2
        divident = (divident - remainder) / base2
        processOut += `${divident} \t R: ${remainder}\n`
        rmndrs.push(remainder)
      }
      rmndrs.reverse()
      const mapRem = rmndrs.map(x => this.chars[x])
      processOut += `Remainders: ${rmndrs.join(', ')}
Base${base2} charset: ${mapRem.join(', ')}

${this.state.inputNum}<sub>${base1}</sub> = ${mapRem.join('')}<sub>${base2}</sub>
`
      result = mapRem.join('')
    }
    processOut += `<p>DONE!</p>`

    this.setState({
      processOut,
      result
    })
  }
}

export default App
