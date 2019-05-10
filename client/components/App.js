import React, { Component } from 'react'


import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'


class App extends Component {
  render() {
    return (
      <div className="App" style={{ textAlign: 'center', backgroundColor: '#f3f3f3', paddingTop: '25%' }} >
        <Heading>Now using Instructure-UI components with default Canvas theme!</Heading>
        <Button>Submit</Button>
        <p>Bruh momentum</p>
      </div>
    )
  }
}

export default App