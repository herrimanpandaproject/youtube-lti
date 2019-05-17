import React, {Component} from 'react'
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements'

class SearchResult extends Component {
  state = {}
  render() {
    return (
      this.props.result.map(result => 
        <div 
          style= {{
            backgroundColor: '#eaebed', 
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            width: '40%',
            margin: '0 auto'
          }}
        >
          <Flex justifyItems = "space-between" margin = "large none large none">
            <FlexItem shrink>
              <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{borderRadius: '15px'}}/>
            </FlexItem>
            <FlexItem width = "15.5%" padding = "medium" grow >
              <Heading level="h4">{result.snippet.title}</Heading>
              <p style = {{fontFamily: 'Arial, sans-serif', hover: 'border: red 5px solid'}}>{result.snippet.description}</p>
              <DatePublished result={result}/>
            </FlexItem>
          </Flex>
        </div>
      )
    )
  }
}

class DatePublished extends Component {
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  render() {
    //todo: fix buggy date calculation, maybe use moment.js?
    let year = this.props.result.snippet.publishedAt.substring(0,4)
    let date = this.props.result.snippet.publishedAt.substring(6,7)
    let month = this.months[parseInt(this.props.result.snippet.publishedAt.substring(9,10), 10)]
    return (
      <p>{month+" "+date+", "+year}</p>
    )
  }
}

export default SearchResult