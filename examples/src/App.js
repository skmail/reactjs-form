import React, {Component} from 'react'


import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import Simple from './screens/simple'
import ArrayInputs from './screens/array-inputs'
import SyncForm from './screens/sync-form'
import SyncInput from './screens/sync-input'
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
                    <li><Link to="/sync-form">Synchronous Form Validation</Link></li>
                    <li><Link to="/sync-input">Synchronous Input Validation</Link></li>
                  </ul>
                </aside>
              </div>
              <div className="column is-10">
                <div>
                  <Route exact path="/" component={Simple}/>
                  <Route exact path="/array-inputs" component={ArrayInputs}/>
                  <Route exact path="/sync-form" component={SyncForm}/>
                  <Route exact path="/sync-input" component={SyncInput}/>
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
