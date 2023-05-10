const express = require('express');
const poll = require('../services/poll');

const router = new express.Router();


/**
 * Add a new poll.
 */
router.post('/lack', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await poll.addPollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Return the statistics of the poll by share token.
 */
router.get('/lack/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await poll.findPollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a poll by admin token.
 */
router.put('/lack/:token', async (req, res, next) => {
  const options = {
    body: req.body,
    token: req.params['token']
  };

  try {
    const result = await poll.updatePollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Deletes a poll by admin token.
 */
router.delete('/lack/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await poll.deletePollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Add a new poll
 */
router.post('/lock', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await poll.addPollock(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Return the statistics of the poll by share token.
 */
router.get('/lock/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await poll.findPollock(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a poll by admin token.
 */
router.put('/lock/:token', async (req, res, next) => {
  const options = {
    body: req.body,
    token: req.params['token']
  };

  try {
    const result = await poll.updatePollock(options);
    res.status(200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Deletes a poll by admin token.
 */
router.delete('/lock/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await poll.deletePollock(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
