import './App.css';
import React from 'react';
import config from './credential';
import { Container, Row, Col } from 'react-bootstrap';
import MainColumn from './main-column/MainColumn';
import FilterColumn from './filter-column/FilterColumn'
import NavBar from './NavBar';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currRenderPosts: [],
      selectedFilters: [],
      selectedSubs: []
    }
    this.savedPosts = [];
    this.subredditMap = new Map();
    this.subredditIcon = new Map();
  }

  // Fetch the saved posts from reddit 
  initialFetch = async () => {
    console.log("Fetching saved post..");
    config.requester.getMe().getSavedContent()
    .then((data) => {
      this.setState({
        currRenderPosts: data
      })
      this.savedPosts = data;
      this.createFilters();
    }).catch(err => {
      console.log(err);
    })
  }
  // Create the subreddit map based from the fetched posts.
  createFilters() {
    console.log("Finding all subreddits appeared in the saved posts..");
    for (let post of this.savedPosts) {
      const subName = post.subreddit_name_prefixed;
      if (this.subredditMap.get(subName) === undefined) {
        this.subredditMap.set(subName, [post]);
      } else {
        const tempArr = this.subredditMap.get(subName);
        tempArr.push(post);
        this.subredditMap.set(subName, tempArr);
      }
    }
    this.subredditMap = new Map([...this.subredditMap.entries()].sort((a, b) => {
      return a[0].toLowerCase().localeCompare(b[0].toLowerCase());
    }));
    // The reason why we need to force update is bc subredditMap is not a state variable, plus it's 
    // an async function, react will render the empty subredditMap first, then accept the fetched
    // post information. So after the subredditMap has been updated we need to forceUpdate the child 
    // components. 
    this.forceUpdate(); 
  }

  // Fetch {30} more saved items, and apply them with the filters
  fetchPosts() {
    console.log(this.state.selectedFilters);
    console.log(this.state.selectedSubs);
    this.savedPosts.fetchMore({amount: 30})
    .then((newList) => {
      this.savedPosts = newList;
      console.log(this.savedPosts);
      this.createFilters();
      this.filterPosts();
    }).catch((err) => {
      console.log(err);
    })
    // Apply the filter to the saved posts and save to the currRenderPosts
  }

  // Filter the submissions from the savedPosts variable, and the submissions that passed the 
  // filters will then get rendered to the screen
  filterPosts() {
    let tempResult = this.savedPosts;

    // Check post or comment
    let filterPost = this.state.selectedFilters.includes("post");
    let filterComment = this.state.selectedFilters.includes("comment");
    if (filterPost && !filterComment) {
      tempResult = tempResult.filter(e => e.constructor.name === "Submission");
    } else if (!filterPost && filterComment) {
      tempResult = tempResult.filter(e => e.constructor.name === "Comment");
    }
    
    // check nwfw tag
    let filterNSFW = this.state.selectedFilters.includes("nsfwTrue");
    let filterNotNSFW = this.state.selectedFilters.includes("nsfwFalse");
    if (filterNSFW && !filterNotNSFW) {
      tempResult = tempResult.filter(e => e.over_18);
    } else if (!filterNSFW && filterNotNSFW) {
      tempResult = tempResult.filter(e => !(e.over_18));
    }

    // Check the media type
    let filterImage = this.state.selectedFilters.includes("image");
    let filterVideo = this.state.selectedFilters.includes("video");
    let filterText = this.state.selectedFilters.includes("text");
    tempResult = tempResult.filter(e => {
      return (
        (filterImage && (e.post_hint === "image" || e.gallery_data != null)) ||
        (filterVideo && e.is_video) ||
        (filterText && e.is_self) ||
        (filterImage && filterText && filterVideo) ||
        (!filterImage && !filterText && !filterVideo)
        );
    });

    // Check the subs filter
    if (this.state.selectedSubs.length > 0 && this.state.selectedSubs.length < this.subredditMap.size) {
      tempResult = tempResult.filter(e => {
        return this.state.selectedSubs.includes(e.subreddit_name_prefixed);
      });
    }

    this.setState({ currRenderPosts: tempResult }, () => {
      // console.log("currRenderPosts:")
      // console.log(this.state.currRenderPosts);
    })
  }

  handleClickFilters = (event) => {
    console.log("clicked " + event.target.value);
    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({
        selectedFilters: [...this.state.selectedFilters, event.target.value]
      })
    } else {
      const index = this.state.selectedFilters.indexOf(event.target.value);
      this.state.selectedFilters.splice(index, 1);
      this.setState({
        selectedFilters: this.state.selectedFilters
      })
    }
  }
  handleClickSubs = (event) => {
    console.log("clicked " + event.target.value);
    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({
        selectedSubs: [...this.state.selectedSubs, event.target.value]
      })
    } else {
      const index = this.state.selectedSubs.indexOf(event.target.value);
      this.state.selectedSubs.splice(index, 1);
      this.setState({
        selectedSubs: this.state.selectedSubs
      })
    }
  }
  
  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>
        <Container>
          <Row>
            <Col sm={4}> 
              <FilterColumn 
                initialFetch={this.initialFetch.bind(this)} 
                fetchPosts={this.fetchPosts.bind(this)}
                filterPosts={this.filterPosts.bind(this)}
                handleClickFilters={this.handleClickFilters.bind(this)}
                handleClickSubs={this.handleClickSubs.bind(this)}
                subMap={this.subredditMap}
              />
            </Col>
            <Col sm={8}>
             <MainColumn 
               posts={this.state.currRenderPosts}
               fetchPosts={this.fetchPosts.bind(this)}
             /> 
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Canvas;
 