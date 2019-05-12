import {TextInput} from '@instructure/ui-text-input';
import React, {Component} from 'react';
import {Button} from '@instructure/ui-buttons';
import {Flex, FlexItem} from '@instructure/ui-layout';

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <Flex margin="none none none">
        <FlexItem shrink padding="x-small" width="15%">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/YouTube_social_white_squircle_%282017%29.svg/1024px-YouTube_social_white_squircle_%282017%29.svg.png"
            alt="img not found"
            style={{width: '65%', height: '65%'}}
          />
        </FlexItem>
        <FlexItem grow padding="small">
          <TextInput
            label=""
            placeholder=""
            value={this.props.value}
            onChange={e => {
              let field = {};
              field['event'] = e;
              field['search'] = {search: e.target.value};
              this.props.onChange(field);
            }}
            onKeyDown={e => this.props.onKeyDown(e)}
          />
        </FlexItem>
        <FlexItem>
          <Button onClick={this.props.search}>Search</Button>
        </FlexItem>
      </Flex>
    );
  }
}

export default SearchBar;
