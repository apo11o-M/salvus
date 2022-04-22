import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './Card'
import "./MainColumn.css"
class MainColumn extends React.Component {

  render() {
    return (
      <div className="main-column" id="scrollableDiv">
        <InfiniteScroll
          dataLength={this.props.posts.length}
          next={this.props.fetchPosts}
          hasMore={true}
          scrollThreshold={0.9}
          endMessage={<h4>You have reached the end.</h4>}
          loader={<LoadingScreen />}
        >
          {this.props.posts.map((i, index) => (
            <Card 
              key={index} 
              post={i}
            />
          ))}
        </InfiniteScroll>
      </div>
      // <LoadingScreen />
    );
  }
}

function LoadingScreen(props) {
  return (
    <div>
      Fetching your posts from reddit, one moment please...
    </div>
  );
}

export default MainColumn;