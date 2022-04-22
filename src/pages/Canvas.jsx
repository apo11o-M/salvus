import "./App.css"
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StickyBox from 'react-sticky-box'
// import config from '../credential';
import MainColumn from '../main-column/MainColumn';
import FilterColumn from '../filter-column/FilterColumn'
import NavBar from '../NavBar';
import config from "../config"

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPostIndex: 0,
      /** contains all the post that is being showed onto the window, should only get the posts from 
      the bufferPosts array. */
      currRenderPosts: [],
      /** all the filters that's being selected */
      selectedFilters: [],
      /** all the subreddits that's being selected */
      selectedSubs: [],
      // infiniteScrollEnabled: true
    }
    /** contains all the saved post from the user, should be around 900-1000 items max. */
    this.savedPosts = [];
    /** contains all the saved post but filtered, should only get the posts from savedPosts array. */
    this.bufferPosts = [];
    this.subredditMap = new Map();
    this.subredditIcon = new Map();
  }

  fetchAllSavedPosts = async (after = "", iter = 1, prevRes = []) => {
    return fetch(`https://oauth.reddit.com/user/${config.user_name}/saved?limit=2&after=${after}`, {
      method: "GET",
      headers: {Authorization: `bearer ${config.access_token}`}
    }).then(res => res.json())
      .then(res => {
        prevRes.push(...res.data.children);
        if (iter < 10) {
          iter++;
          return this.fetchAllSavedPosts(res.data.after, iter, prevRes);
        } else {
          return prevRes;
        }
      })
  }

  componentDidMount() {
    console.log("componentDidMount, Fetching saved post..")
    fetch("https://oauth.reddit.com/api/v1/me", {
      method: "GET",
      headers: {Authorization: `bearer ${config.access_token}`}
    }).then(res => res.json())
      .then(res => {
        config.user_name = res.name;
        this.fetchAllSavedPosts()
          .then(res => {
            console.log(res)
            this.savedPosts = res;
            this.bufferPosts = res;
            this.setState({
              currRenderPosts: res.slice(0, 26),
              currPostIndex: 25
            })
            this.createFilters();
          })
          .catch(err => {
            console.error("Failed to fetch saved posts")
            console.err(err)
          })
      })
      .catch(err => {
        console.error("Failed to request access token")
        console.error(err)
      })
  }

  // Create the subreddit map based from the fetched posts.
  createFilters() {
    console.log("Finding all subreddits appeared in the saved posts..");
    for (let post of this.savedPosts) {
      const subName = post.data.subreddit_name_prefixed;
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
    // The reason we need to force update is bc subredditMap is not a state variable, plus it's 
    // an async function, react will render the empty subredditMap first, then accept the fetched
    // post information. So after the subredditMap has been updated we need to forceUpdate the child 
    // components. 
    // And yes this is definetely probably not the best way to do things but I'm too lazy/scared to 
    // touch it.
    this.forceUpdate(); 
  }
  // fetch more post from the savedPosts variable to the currRenderPosts 
  fetchPosts() {    
    console.log("Fetching more post from this.savedPosts")
    this.setState({
      currPostIndex: this.state.currPostIndex + 25,
      currRenderPosts: this.bufferPosts.slice(0, this.state.currPostIndex)
    })
    this.forceUpdate();
  }
  // Filter the submissions from the savedPosts variable, and the submissions that passed the 
  // filters will then get rendered to the screen
  filterPosts() {
    let tempResult = this.savedPosts;

    // Check post or comment
    let filterPost = this.state.selectedFilters.includes("post");
    let filterComment = this.state.selectedFilters.includes("comment");
    if (filterPost && !filterComment) {
      tempResult = tempResult.filter(e => e.kind === "t3");
    } else if (!filterPost && filterComment) {
      tempResult = tempResult.filter(e => e.kind === "t1");
    }
    
    // check nwfw tag
    let filterNSFW = this.state.selectedFilters.includes("nsfwTrue");
    let filterNotNSFW = this.state.selectedFilters.includes("nsfwFalse");
    if (filterNSFW && !filterNotNSFW) {
      tempResult = tempResult.filter(e => e.data.over_18);
    } else if (!filterNSFW && filterNotNSFW) {
      tempResult = tempResult.filter(e => !(e.data.over_18));
    }

    // Check the media type
    let filterImage = this.state.selectedFilters.includes("image");
    let filterVideo = this.state.selectedFilters.includes("video");
    let filterText = this.state.selectedFilters.includes("text");
    tempResult = tempResult.filter(e => {
      return (
        (filterImage && (e.data.post_hint === "image" || e.data.gallery_data != null)) ||
        (filterVideo && e.data.is_video) ||
        (filterText && e.data.is_self) ||
        (filterImage && filterText && filterVideo) ||
        (!filterImage && !filterText && !filterVideo)
      );
    });

    // Check the subs filter
    if (this.state.selectedSubs.length > 0 && this.state.selectedSubs.length < this.subredditMap.size) {
      tempResult = tempResult.filter(e => {
        return this.state.selectedSubs.includes(e.data.subreddit_name_prefixed);
      });
    }

    this.bufferPosts = tempResult;
    window.scrollTo(0, 0);
    this.setState({
      currPostIndex: 25,
      currRenderPosts: this.bufferPosts.slice(0, 26)
    })
  }

  handleClickApplyFilter = (event) => {
    console.log("clicked " + event.target.value);
    this.filterPosts();
    window.scrollTo(0, 0);
    this.setState({
      currPostIndex: 25,
      currRenderPosts: this.bufferPosts.slice(0, 26)
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
              <StickyBox offsetTop={30}>
                <FilterColumn 
                  // initialFetch={this.initialFetch.bind(this)} 
                  // fetchPosts={this.fetchPosts.bind(this)}
                  filterPosts={this.filterPosts.bind(this)}
                  handleClickFilters={this.handleClickFilters.bind(this)}
                  handleClickSubs={this.handleClickSubs.bind(this)}
                  subMap={this.subredditMap}
                />
              </StickyBox>
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
 