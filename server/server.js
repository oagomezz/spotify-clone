const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "0e34b0eec1664b1ea987e4bd4ebf36cf",
    clientSecret: "8e7d861f53154be0bdc6b818d564c68f",
    refreshToken
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
    //   res.json({
    //     accessToken: data.body.accessToken,
    //     expiresIn: data.body.expiresIn,
    //   })
    console.log(data.body);
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "0e34b0eec1664b1ea987e4bd4ebf36cf",
    clientSecret: "8e7d861f53154be0bdc6b818d564c68f",
  })
  spotifyApi
  .authorizationCodeGrant(code)
  .then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  })
  .catch(err => {
    res.sendStatus(400)
  })
})
app.listen(3001)