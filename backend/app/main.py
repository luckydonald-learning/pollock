# generated by fastapi-codegen:
#   filename:  Pollack.yaml
#   timestamp: 2023-05-10T16:27:09+00:00

from __future__ import annotations

from typing import Union

from fastapi import FastAPI

from .models import (
    PollBody,
    PollLackPostResponse,
    PollLackTokenDeleteResponse,
    PollLackTokenDeleteResponse1,
    PollLackTokenGetResponse,
    PollLackTokenPutResponse,
    PollResult,
    ResponseMessage,
    Statistics,
    Vote,
    VoteInfo,
    VoteLackTokenDeleteResponse,
    VoteLackTokenDeleteResponse1,
    VoteLackTokenGetResponse,
    VoteLackTokenGetResponse1,
    VoteLackTokenPostResponse,
    VoteLackTokenPostResponse1,
    VoteLackTokenPutResponse,
    VoteResult,
)

app = FastAPI(
    title='Pollack',
    description='**This is **only** the _Pollack_ a part of _Pollock_.**\n\n_Pollock_ is a specification for a [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) based on the [OpenAPI Specification 3 (OAS3)](https://spec.openapis.org/oas/v3.0.3).\n\n_Pollock_ can be used to create polls, participate in them and modify them. Normally, the polls can be locked, so that only registered users can participate.\n\nThe name is composed of **poll** and **lock** and is the name of a fish, the [pollock](https://en.wikipedia.org/wiki/Pollock). A special thing about this fish is that it is also called **pollack**. If _Pollock_ was implemented without registration, then it would therefore be called _Pollack_, because registration is lacking.',
    version='1.0.0',
    servers=[{'url': 'http'}],
)


@app.post(
    '/poll/lack',
    response_model=PollResult,
    responses={
        '405': {'model': PollLackPostResponse},
        'default': {'model': ResponseMessage},
    },
    tags=['poll'],
)
def add_pollack(
    body: PollBody,
) -> Union[PollResult, PollLackPostResponse, ResponseMessage]:
    """
    Add a new poll.
    """
    pass


@app.get(
    '/poll/lack/{token}',
    response_model=Statistics,
    responses={
        '404': {'model': ResponseMessage},
        '410': {'model': PollLackTokenGetResponse},
        'default': {'model': ResponseMessage},
    },
    tags=['poll'],
)
def find_pollack(
    token: str,
) -> Union[Statistics, ResponseMessage, PollLackTokenGetResponse]:
    """
    Find statistics of a poll by token.
    """
    pass


@app.put(
    '/poll/lack/{token}',
    response_model=PollLackTokenPutResponse,
    responses={'default': {'model': ResponseMessage}},
    tags=['poll'],
)
def update_pollack(
    token: str, body: PollBody = ...
) -> Union[PollLackTokenPutResponse, ResponseMessage]:
    """
    Update a poll
    """
    pass


@app.delete(
    '/poll/lack/{token}',
    response_model=PollLackTokenDeleteResponse,
    responses={
        '400': {'model': PollLackTokenDeleteResponse1},
        'default': {'model': ResponseMessage},
    },
    tags=['poll'],
)
def delete_pollack(
    token: str,
) -> Union[PollLackTokenDeleteResponse, PollLackTokenDeleteResponse1, ResponseMessage]:
    """
    Deletes a poll
    """
    pass


@app.post(
    '/vote/lack/{token}',
    response_model=VoteResult,
    responses={
        '404': {'model': ResponseMessage},
        '405': {'model': VoteLackTokenPostResponse},
        '410': {'model': VoteLackTokenPostResponse1},
        'default': {'model': ResponseMessage},
    },
    tags=['vote'],
)
def add_vote_pollack(
    token: str, body: Vote = ...
) -> Union[
    VoteResult, ResponseMessage, VoteLackTokenPostResponse, VoteLackTokenPostResponse1
]:
    """
    Add a new vote to the poll
    """
    pass


@app.get(
    '/vote/lack/{token}',
    response_model=VoteInfo,
    responses={
        '404': {'model': ResponseMessage},
        '405': {'model': VoteLackTokenGetResponse},
        '410': {'model': VoteLackTokenGetResponse1},
        'default': {'model': ResponseMessage},
    },
    tags=['vote'],
)
def find_vote_pollack(
    token: str,
) -> Union[
    VoteInfo, ResponseMessage, VoteLackTokenGetResponse, VoteLackTokenGetResponse1
]:
    """
    Find the vote of the token
    """
    pass


@app.put(
    '/vote/lack/{token}',
    response_model=VoteLackTokenPutResponse,
    responses={'default': {'model': ResponseMessage}},
    tags=['vote'],
)
def update_vote_pollack(
    token: str, body: Vote = None
) -> Union[VoteLackTokenPutResponse, ResponseMessage]:
    """
    Update a vote of the token
    """
    pass


@app.delete(
    '/vote/lack/{token}',
    response_model=VoteLackTokenDeleteResponse,
    responses={
        '400': {'model': VoteLackTokenDeleteResponse1},
        'default': {'model': ResponseMessage},
    },
    tags=['vote'],
)
def delete_vote_pollack(
    token: str,
) -> Union[VoteLackTokenDeleteResponse, VoteLackTokenDeleteResponse1, ResponseMessage]:
    """
    Delete a vote of the token
    """
    pass
