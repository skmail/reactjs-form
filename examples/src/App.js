import React, {Component} from 'react'


import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import Simple from './screens/simple'
import ArrayInputs from './screens/array-inputs'
import SynchronousValidation from './screens/synchronous-validation'
import AsynchronousValidation from './screens/asynchronous-validation'
import 'bulma/css/bulma.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <section className="section">
            <div className="columns">

              <div className="column is-2">
                <aside className="menu is-four-fifths">
                  <p className="menu-label">
                    Examples
                  </p>
                  <ul className="menu-list">
                    <li><Link to="/">Simple Form</Link></li>
                    <li><Link to="/array-inputs">Array Inputs</Link></li>
                    <li><Link to="/synchronous-validation">Synchronous Validation</Link></li>
                    <li><Link to="/asynchronous-validation">Asynchronous Validation</Link></li>
                  </ul>
                </aside>
              </div>
              <div className="column is-10">
                <div>
                  <Route exact path="/" component={Simple}/>
                  <Route exact path="/array-inputs" component={ArrayInputs}/>
                  <Route exact path="/synchronous-validation" component={SynchronousValidation}/>
                  <Route exact path="/asynchronous-validation" component={AsynchronousValidation}/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Router>
    )
  }
}

export default App
