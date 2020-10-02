# My Game Catalogue
This app server has : 
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
---

## User endpoints

### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": "<name to get insert into>"
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "email": "<posted email>",
    "msg": "successfully register!"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "name is required",
    "email is required",
    "password is required",
    "not an email format",
    "email address is already in use"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

### POST /login

> Login user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_
```
{
  "token": "<user access token given by system>",
  "msg": "successfully login!"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "wrong email or password!"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## Game endpoints

### GET /games

> Get all games

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Request Query_
```
search: <string>
```

_Response (200 - OK)_
```
{
  "games": [
    {
      "id": <game id>,
      "name": "<game name>",
      "image": "<game image>",
      "released": "<game released>"
    },
    {
      "id": <game id>,
      "name": "<game name>",
      "image": "<game image>",
      "released": "<game released>"
    },
    ...
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "failed to authenticate"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

### GET /games/:id

> Get game by id

_Request Params_
```
id: <game id>
```

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "game": {
    "id": <game id>,
    "name": "<game title>,
    "image": "<game image url>",
    "description": "<game description>",
    "released": "<game released>"
  }
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "failed to authenticate"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "error not found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---


## News endpoints

### GET /news

> Get all news

_Request Header_
```
{
  "token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "games": [
    {
      "id": <game id>,
      "name": "<game name>",
      "image": "<game image>",
      "released": "<game released>"
    },
    ...
  ]
}

{
  "news": [
    {
        "title": "<news title>",
        "urlToImage": "<news image>",
        "description": "<news description>",
        "author": "<news author>"
    },
    ...
  ]
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "failed to authenticate"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---



