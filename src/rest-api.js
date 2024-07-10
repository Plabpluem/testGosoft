// * You may uncomment one of these modules:
const express = require("express");
// const koa = require('koa');
// const hapi = require('@hapi/hapi');
// const restify = require('restify');

const app = express();

module.exports = (stepService) => {
  const REST_PORT = 8080;

  app.get("/users/:username/steps", async (req, res, next) => {
    const username = req.params.username;

    const userData = await stepService.get(username);

    if (userData) {
      res
        .status(200)
        .json({ cumulativeSteps: userData.cumulativeSteps, ts: userData.ts });
    } else {
      res.status(404).json({ error: "User doesn't exist" });
    }
  });

  const server = app.listen(REST_PORT);
  return {
    close: () => server.close(),
  };
  // * TODO: Write the GET endpoint, using `stepService` for data access
  // * TODO: Return object containing `close()` method for shutting down the server
};
