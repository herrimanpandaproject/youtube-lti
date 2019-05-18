
import React, {Component} from 'react'
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import { Img } from '@instructure/ui-elements'
import moment from 'moment'

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
            minWidth: '464px',
            margin: '0 auto'
          }}
          key={result.etag}
        >
          <Flex justifyItems = "space-between" margin = "large none large none">
            <FlexItem shrink>
              <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{borderRadius: '15px'}}/>
            </FlexItem>
            <FlexItem width = "15.5%" padding = "medium" grow >
              <Heading level="h4">{result.snippet.title.replace(/&#39;/g,"'").replace(/&quot;/g, '"')}</Heading>
              <p style = {{
                fontFamily: 'Arial, sans-serif', 
                hover: 'border: red 5px solid',
                wordWrap: 'break-word'
                }}
              >
                {result.snippet.description}
              </p>
              <p>{moment(result.snippet.publishedAt, moment.ISO_8601).format('MMMM DD, YYYY')}</p>
            </FlexItem>
          </Flex>
        </div>
      )
    )
  }

  
}

export default SearchResult

