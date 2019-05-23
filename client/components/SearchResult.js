import React, {Component} from 'react';
import {Flex, FlexItem} from '@instructure/ui-layout';
import {Heading} from '@instructure/ui-elements';
import {Img} from '@instructure/ui-elements';
import moment from 'moment';
import numeral from 'numeral';
import styles from './Sheet.js';
import {IconEyeLine} from '@instructure/ui-icons';
import {IconLikeLine} from '@instructure/ui-icons';
import {Pagination} from '@instructure/ui-pagination';
import EmbedButton from './EmbedButton';
import {Button} from '@instructure/ui-buttons';

class SearchResult extends Component {
  state = {};
  styles = new styles();

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  showDetail = () => {
    this.setState({detail: this.state.detail ? false : true});
  };

  render() {
    let min = this.props.page * this.props.resultsPerPage;
    let max = this.props.resultsPerPage * (this.props.page + 1) - 1;
    max = max >= this.props.length ? this.props.length - 1 : max;

    return this.props.result.map((result, index) => {
      return index >= min && index <= max ? (
        <div
          style={
            this.state.detail
              ? this.styles.detailedCard
              : this.styles.resultCard
          }
          key={result.etag}
        >
          <Flex
            justifyItems="space-between"
            margin="large none large none"
            direction="column"
          >
            <FlexItem padding="medium" align="center">
              {this.state.detail ?
              <iframe width="510" height="315" src={`https://www.youtube.com/embed/${result.id}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
              : 
              <Img
                src={result.snippet.thumbnails.medium.url}
                alt="Image not found."
                style={{
                  borderRadius: '10px',
                }}
              /> }
              
            </FlexItem>
            <FlexItem padding="none medium none medium">
              <Heading level="h4">
                {result.snippet.title
                  .replace(/&#39;/g, "'")
                  .replace(/&quot;/g, '"')}
              </Heading>
              <p> 
                Published By:
                 <a 
                href={`https://www.youtube.com/channel/${
                  result.snippet.channelId
                }`}
                target="_blank"
                style = {this.styles.channelStyle}
                >
                 {result.snippet.channelTitle}
                </a>
              </p>
              <p>
                {moment(result.snippet.publishedAt, moment.ISO_8601).format(
                  'MMMM DD, YYYY',
                )}
              </p>
              <p>
                {numeral(result.statistics.viewCount).format('0.0a')}{' '}
                <IconEyeLine color="primary" /> {'- '}
                {numeral(result.statistics.likeCount).format('0.0a')}{' '}
                <IconLikeLine color="primary" /> {'- '}
                {numeral(result.statistics.dislikeCount).format('0.0a')}{' '}
                <IconLikeLine rotate="180" color="primary" />
              </p>
              <p style = {this.styles.overflowPrevention}>
                {this.state.detail ? result.snippet.description.substring(0, 311) + '...' : 
                  result.snippet.description.substring(0, 211) + '...'}
              </p>
            </FlexItem>
            <FlexItem padding="none none medium none" align="center">
              <EmbedButton
                onEmbed={this.props.onEmbed}
                videoId={result.id}
                title={result.snippet.title}
              />
              <Button onClick={this.showDetail} margin="none none none medium">
                Details
              </Button>
            </FlexItem>
          </Flex>
        </div>
      ) : (
        ''
      );
    });
  }
}

export default SearchResult;
