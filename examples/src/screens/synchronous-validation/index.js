import React, {Component} from 'react'

import SyncForm from './components/sync-form'
import SyncInput from './components/sync-input'
export default class SynchronousValidation extends Component {
  render() {
    return (
      <div >

        <h1 className="title">Synchronous <code>Form</code> Validation</h1>
        <hr/>
        <SyncForm/>

        <hr/>

        <h1 className="title">Synchronous <code>Input</code> Validation</h1>
        <hr/>
        <SyncInput/>


      </div>
    )
  }
}
