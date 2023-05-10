# Pollack

**This is **only** the _Pollack_ a part of _Pollock_.**

_Pollock_ is a specification for a [REST API](https://www.redhat.com/en/topics/api/what-is-a-rest-api) based on the [OpenAPI Specification 3 (OAS3)](https://spec.openapis.org/oas/v3.0.3).

_Pollock_ can be used to create polls, participate in them and modify them. Normally, the polls can be locked, so that only registered users can participate.

The name is composed of **poll** and **lock** and is the name of a fish, the [pollock](https://en.wikipedia.org/wiki/Pollock). A special thing about this fish is that it is also called **pollack**. If _Pollock_ was implemented without registration, then it would therefore be called _Pollack_, because registration is lacking.



```bash

#  yarn add swagger-node-codegen
cd backend
yarn install --dev

node_modules/.bin/snc "../../../Moodle/Webprogrammierung (SoSe 23)/Projekt/Pollack.yaml" --output ../generated-backend
```

