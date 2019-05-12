import {TextInput} from '@instructure/ui-text-input';
import React, {Component} from 'react';

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <TextInput
        label=""
        placeholder="Search"
        value={this.props.value}
        onChange={e => {
          let field = {};
          field['search'] = e.target.value;
          this.props.onChange(field);
        }}
      />
    );
  }
}

export default SearchBar;
