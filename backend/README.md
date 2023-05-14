# Pollack

**This is **only** the _Pollack_ a part of _Pollock_.**

_Pollock_ is a specification for a [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) based on the [OpenAPI Specification 3 (OAS3)](https://spec.openapis.org/oas/v3.0.3).

_Pollock_ can be used to create polls, participate in them and modify them. Normally, the polls can be locked, so that only registered users can participate.

The name is composed of **poll** and **lock** and is the name of a fish, the [pollock](https://en.wikipedia.org/wiki/Pollock). A special thing about this fish is that it is also called **pollack**. If _Pollock_ was implemented without registration, then it would therefore be called _Pollack_, because registration is lacking.

# Install
Run the code below (adapting `YAML_FILE_PATH` to your file system path):

```shell
yarn install --dev

yarn run dev
```

# Generate Client code (not needed)
```bash
#  yarn add swagger-node-codegen
cd backend
YAML_FILE_PATH="../../../Moodle/Webprogrammierung (SoSe 23)/Projekt"

YAML_FILE_NAME="Pollack.yaml"  # part 1
# YAML_FILE_NAME="Pollock.yaml"  # part 2 

node_modules/.bin/snc  --output generated-frontend "${YAML_FILE_PATH}/${YAML_FILE_NAME}"
```


# Test

Show statistics to a poll:
```shell
curl --request POST --header "Content-Type: application/json" http://localhost:3000/poll/lack/e6f79f06-f280-11ed-b574-325096b39f47
```

Vote on a poll:
```shell
curl --request POST --header "Content-Type: application/json" http://localhost:3000/vote/lack/e6f79f06-f280-11ed-b574-325096b39f47 --data '{"owner": {"name": "first!1", "lock": false}, "choice": [{"id": 1, "worst": false}]}'
```
```json
{"owner": {"name": "first!1", "lock": false}, "choice": [{"id": 1, "worst": false}]}
```

