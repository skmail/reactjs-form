import React, {Component} from 'react'


import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import Simple from './screens/simple'
import Deep from './screens/deep'
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
                    <li><Link to="/deep-inputs">Deep Inputs</Link></li>
                  </ul>
                </aside>
              </div>
              <div className="column is-10">
                <div>
                  <Route exact path="/" component={Simple}/>
                  <Route exact path="/deep-inputs" component={Deep}/>
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
