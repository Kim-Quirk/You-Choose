# YOU-CHOOSE: Restaurant Chooser API

---

## FOR THE FRONTEND: GET STARTED

### A note on POST requests:

Each request should include a body and headers.For requests that require the user to be logged in, include a JWT authorization token in the headers. You can obtain the authorization token by passing in the username and password to the /login endpoint. Store this somewhere on the browser so it can be accessed later. Pay attention to the expiration date.

---

## **FOR STUFF THAT HANDLES SESSIONS:**

### CREATE A NEW SESSION:

Example Rquest:

```javascript
fetch('https://you-choose-api.herokuapp.com/createSession', {
    method: "GET"
    headers: {
        'Content-Type': 'application/json',
        Authorization: <token>
    }
})
```

Example Response:

```javascript

```

### CHECK IF A ROOM EXISTS

```javascript
fetch("https://you-choose-api.herokuapp.com/roomExists?roomId={num}");
```

Example Response:

```javascript

```

### GET A LIST OF NEARBY RESTAURANTS

Example Request:

```javascript
fetch(
  "https://you-choose-api.herokuapp.com/getRestaurantData?lat={latitude}?long={longitude}?radius={radius}?priceRange={priceRange}"
);
```

Note the query parameters. Latitude and longitude are required, the default search radius is 5 miles. If you don't specify a price range, all will be included

latitude: number

longitude: number

radius: number of miles

priceRange: 1, 2, or 3, with 3 being the most expensive.

We will return a list of 30 restaurants

Example response:

```javascript
{
message: "Retrevial successful",
data:[
0:{
"restaurant_name":"Bareburger - Cobble Hill"
"restaurant_phone":"(347) 529-6673"
"restaurant_website":""
"hours":"Sun-Wed: 11am-10pm Thu-Sat: 11am-11pm"
"price_range":"$$"
"price_range_num":2
"restaurant_id":4068919073992378
"cuisines":[...]4 items
"address":{...}5 items
"geo":{...}2 items
"menus":[]0 items
"last_updated":"2021-01-05T07:35:38.231Z"
}
1:{...}
2:{...}
3:{...}
4:{...}
5:{...}
6:{...}
7:{...}
]
}
```

---

## **FOR STUFF THAT HANDLES RESULT SETS:**

### SAVE A RESULT SET

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/saveResult', {
    method: "POST"
    body: {
        top3: [], //an array of the top 3 restaurants
        UserId: ,
    }
    headers: {
        'Content-Type': 'application/json',
        Authorization: <token>
    }
})
```

Example Response:

```javascript
{
    "message": "Results saved",
    "results": [
        "Test1",
        "Test2",
        "Test3"
    ]
}
```

### DELETE A RESULT SET

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/deleteResult', {
    method: "DELETE"
    body: {
        resultId: ,
    }
    headers: {
        'Content-Type': 'application/json',
        Authorization: <token>
    }
})
```

Example Response:

```javascript
{
    "message": "Successfully deleted!"
}
```

### VIEW A LIST OF ALL RESULT SETS SAVED TO AN ACCOUNT

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/getResults', {
    method: "GET"
    headers: {
        'Content-Type': 'application/json',
        Authorization: <token>
    }
})
```

Example Response:

```javascript
{
    "message": "View your previous results",
    "results": [
        {
            "_id": "6196b2313c2d67db07ff05c7",
            "resultSet": [
                "Test1",
                "Test2",
                "Test3"
            ]
        }
    ]
}
```
---

## **FOR STUFF THAT HANDLES LOGIN AND AUTHENTICATION:**

### LOGIN A USER

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/login', {
    method: "POST"
    body: {
        email: ,
        password: ,
    }
    headers: {
        'Content-Type': 'application/json'
    }
})
```

Example Response:

```javascript
      {
        "message": "Login Successful!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJlbWFpbCI6Im1lQG1lLmNvbSIsInVzZXJJZCI6IjYxODJmMzBiNzk3MjhmZWRlYzhkMDY2NiIsImlhdCI6MTYzNTk3MjYxMSwiZXhwIjoxNjM2MDU5MDExfQ.lpiph4KyhV3-GP5hNtEH5F9T_NG-C-BgciV59PZ2pdU",
        "userId": "6182f30b79728fedec8d0666"
    }
```

### SIGN A NEW USER UP

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/signup', {
    method: "POST"
    body: {
        email: <email>,
        password: <password>
    }
    headers: {
        'Content-Type': 'application/json'
    }
})
```

Email must be a valid email.

Password Requirements:
* Minimum of 5 characters
* Is alphanumeric (no special characters)

Example Response:

```javascript
{
    "message": "User created!",
    "userId": "6182f30b79728fedec8d0666"
}
```
