import React, {Component} from 'react';
import {Heading} from '@instructure/ui-elements';
import {Button} from '@instructure/ui-buttons';
import SearchBar from './SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className="App"
        style={{
          textAlign: 'center',
          backgroundColor: '#f3f3f3',
          paddingTop: '25%',
        }}
      >
        <Heading>
          Now using Instructure-UI components with default Canvas theme!
        </Heading>
        <SearchBar
          onChange={field => {
            this.setState(field);
          }}
        />
        <Button
          onClick={e => {
            console.log(this.state);
          }}
        >
          Submit
        </Button>
        <p>Bruh momentum</p>
      </div>
    );
  }
}

export default App;
