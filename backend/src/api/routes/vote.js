const express = require('express');
const vote = require('../services/vote');

const router = new express.Router();


/**
 * Add a new vote to the poll
 */
router.post('/lack/:token', async (req, res, next) => {
  const options = {
    body: req.body,
    token: req.params['token']
  };

  try {
    const result = await vote.addVotePollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Find the vote of the token
 */
router.get('/lack/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await vote.findVotePollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a vote of the token
 */
router.put('/lack/:token', async (req, res, next) => {
  const options = {
    body: req.body,
    token: req.params['token']
  };

  try {
    const result = await vote.updateVotePollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Delete a vote of the token
 */
router.delete('/lack/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await vote.deleteVotePollack(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Add a new vote to the poll
 */
router.post('/lock/:token', async (req, res, next) => {
  const options = {
    body: req.body,
    token: req.params['token']
  };

  try {
    const result = await vote.addVotePollock(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Find the vote of the token
 */
router.get('/lock/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await vote.findVotePollock(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a vote of the token
 */
router.put('/lock/:token', async (req, res, next) => {
  const options = {
    body: req.body,
    token: req.params['token']
  };

  try {
    const result = await vote.updateVotePollock(options);
    res.status(200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Delete a vote of the token
 */
router.delete('/lock/:token', async (req, res, next) => {
  const options = {
    token: req.params['token']
  };

  try {
    const result = await vote.deleteVotePollock(options);
    res.status(200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
