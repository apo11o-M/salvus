import React from "react";
import Button from "react-bootstrap/Button"
import snoowrap from "snoowrap";

function Home(props) {
  function openLogin() {
    console.log("reddit login link opened");
    let authenticationUrl = snoowrap.getAuthUrl({
      clientId: "RkFiC5KHLPYUmWQiTBKsyg",
      scope: ["identity", "save", "mysubreddits", "read", "history"],
      redirectUri: "http://localhost:3000/login/callback",
      permanent: true,
      state: "success"
    });
    window.location.href = authenticationUrl;
  }
  
  return (
    <div>
      <h1>Press the button below to login via reddit</h1>
      <Button onClick={() => {openLogin()}}>Login with Reddit</Button>
    </div>
  );
}
export default Home;