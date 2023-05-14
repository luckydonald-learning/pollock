import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import logger from "../lib/logger.js";
import config from "../lib/config.js";
import printRoutes from "../lib/routes.js";

import pollRoutes from "./routes/poll.js";
import voteRoutes from "./routes/vote.js";

const log = logger(config.logger);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
 * Routes
 */
app.use('/poll', pollRoutes);
app.use('/vote', voteRoutes);

// catch 404
app.use((req, res, next) => {
  log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

console.log('Registered routes are:')
app._router.stack.forEach(printRoutes.bind(null, []))

export default app;
