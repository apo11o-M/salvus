import React from "react";
import { useEffect } from "react";
import {useLocation, Link} from "react-router-dom";
import queryString from "query-string"
import { Buffer } from "buffer";
import config from "./../config"

function LoginWithReddit(props) {
  const location = useLocation();
  const parsed = queryString.parse(location.search, true);
  const c = parsed.code;
  const CLIENT_ID = "RkFiC5KHLPYUmWQiTBKsyg";
  useEffect(() => {
    const credentials = Buffer.from(`${CLIENT_ID}:`).toString("base64")
    fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {Authorization: `Basic ${credentials}`},
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: c,
        redirect_uri: "http://localhost:3000/login/callback"
      })
    }).then(function(res) {
      return res.json();
    }).then(function(data) {
      console.log(data);
      config.access_token = data.access_token;
      config.refresh_token = data.refresh_token;
      console.log(config.access_token)
    })
  });

  return (
    <div>
      <div>
        Authorized successfully, requesting access_token
      </div>
      <div>
        <Link to="/">
          <button>
            Back to home page
          </button>
        </Link>
        <Link to="/canvas">
          <button>
            Take me to the canvas
          </button>
        </Link>
      </div>
    </div>
  )
}
export default LoginWithReddit;