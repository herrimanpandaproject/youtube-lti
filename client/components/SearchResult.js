
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
            <FlexItem shrink padding = "medium 0 medium medium">
              <Img src = {result.snippet.thumbnails.medium.url} alt = "Image not found." style = {{borderRadius: '15px'}}/>
            </FlexItem>
            <FlexItem width = "15.5%" padding = "medium" grow >
              <Heading level="h4">{result.snippet.title.replace(/&#39;/g,"'").replace(/&quot;/g, '"')}</Heading>
              <p>{moment(result.snippet.publishedAt, moment.ISO_8601).format('MMMM DD, YYYY')} - {this.shortenViewCount(result.statistics.viewCount)}</p>
              {/* <p> </p> */}
              <p style = {{
                fontFamily: 'Arial, sans-serif', 
                hover: 'border: red 5px solid',
                wordWrap: 'break-word'
                }}
              >
                {result.snippet.description.length > 200
                ? result.snippet.description.substring(0, 197)+"..."
                : result.snippet.description}
              </p>
             
            </FlexItem>
          </Flex>
        </div>
      )
    )
  }
  shortenViewCount = (items) => 
  {
    let firstNum;
    let secondNum;
    // Between 1 mill and 10 mil
    if (items > 1000000 && items < 10000000)
    {
      firstNum = items.toString().substring(0, 1);
      secondNum = items.toString().substring(1, 2);
      return (firstNum + "." + secondNum + " mil views");
    }
    // Between 10 mil and 100 mil
    else if (items > 10000000 && items < 100000000)
    {
      firstNum = items.toString().substring(0, 2);
      secondNum = items.toString().substring(2,3);
      return (firstNum + "." + secondNum + " mil views");
    }
    // Between 100 mil and 1 billion
    else if (items > 100000000 && items < 1000000000)
    {
      firstNum = items.toString().substring(0, 3);
      secondNum = items.toString().substring(3, 4);
      return (firstNum + "." + secondNum + " mil views");
    }
    // Between 1 Billion and 100 Billlion
    else if (items > 1000000000 && items < 10000000000)
    {
      firstNum = items.toString().substring(0, 1);
      secondNum = items.toString().substring(2, 3);
      return (firstNum + "." + secondNum + " billion views");
    }
    // Between 100k and 1 million
    else if (items > 100000 && items < 1000000)
    {
      firstNum = items.toString().substring(0, 3);
      secondNum = items.toString().substring(3, 4);
      return (firstNum + "." + secondNum + "K views");
    }
    // Between 10k and 100k
    else if (items > 10000 && items < 100000)
    {
      firstNum = items.toString().substring(0, 2);
      secondNum = items.toString().substring(2, 3);
      return (firstNum + "." + secondNum + " k views");
    }
    else
    {
      return (items + " views");
    }

    
  }

  
}

export default SearchResult

