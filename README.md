# YOU-CHOOSE: Restaurant Chooser API

## FOR THE FRONTEND: GET STARTED

### A note on POST requests:

Each request should include a body and headers.For requests that require the user to be logged in, include a JWT authorization token in the headers. You can obtain the authorization token by passing in the username and password to the /login endpoint. Store this somewhere on the browser so it can be accessed later. Pay attention to the expiration date.

---

## **FOR STUFF THAT HANDLES SESSIONS:**

### CREATE A NEW SESSION:

Example Rquest:

```javascript
fetch('https://you-choose-api.herokuapp.com/createSession', {
    method: "POST"
    body: {
	"lat": "43.8231",
	"lon": "-111.7924",
	"radius": "5"
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
	"message": "Session created",
	"roomId": 100128,
	"roomInfo": {
		"idCode": 100128,
		"allRestaurants": [
			{
				"restaurant_name": "Gator Jack's Sandwich Shack",
				"restaurant_id": 43821949111788744,
				"price_range": "$",
				"cuisines": [
					""
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad74"
			},
			{
				"restaurant_name": "Taco Time",
				"restaurant_id": 43820337111789550,
				"price_range": "",
				"cuisines": [
					"American",
					"Mexican",
					"Tex-Mex"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad75"
			},
			{
				"restaurant_name": "Ying Yang Oriental Kitchen",
				"restaurant_id": 43825192111788220,
				"price_range": "$$",
				"cuisines": [
					""
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad76"
			},
			{
				"restaurant_name": "Pizza Hut",
				"restaurant_id": 43826070111788500,
				"price_range": "",
				"cuisines": [
					"American",
					"Pizza"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad77"
			},
			{
				"restaurant_name": "Domino's Pizza",
				"restaurant_id": 43826000111788000,
				"price_range": "",
				"cuisines": [
					"American",
					"Pizza",
					"Wings"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad78"
			},
			{
				"restaurant_name": "Jamba Juice",
				"restaurant_id": 43826064111787810,
				"price_range": "",
				"cuisines": [
					"American",
					"Smoothies & Juices"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad79"
			},
			{
				"restaurant_name": "Da Pineapple Grill",
				"restaurant_id": 43818044111789510,
				"price_range": "$$",
				"cuisines": [
					"American",
					"Hawaiian"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad7a"
			},
			{
				"restaurant_name": "Subway",
				"restaurant_id": 43818000111788800,
				"price_range": "",
				"cuisines": [
					"Sandwiches"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad7b"
			},
			{
				"restaurant_name": "Taco Bell",
				"restaurant_id": 43826078111784456,
				"price_range": "",
				"cuisines": [
					"Mexican"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad7c"
			},
			{
				"restaurant_name": "Taco Bell",
				"restaurant_id": 43826400111784500,
				"price_range": "",
				"cuisines": [
					""
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad7d"
			},
			{
				"restaurant_name": "Gringo's Mexican Restaurant",
				"restaurant_id": 43825131111783530,
				"price_range": "$$",
				"cuisines": [
					""
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad7e"
			},
			{
				"restaurant_name": "Sammys",
				"restaurant_id": 43824790111782560,
				"price_range": "$",
				"cuisines": [
					""
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad7f"
			},
			{
				"restaurant_name": "Papa Murphy's Take 'N' Bake Pizza",
				"restaurant_id": 43827700111777700,
				"price_range": "",
				"cuisines": [
					"American",
					"Pizza",
					"Salads"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad80"
			},
			{
				"restaurant_name": "Arctic Circle",
				"restaurant_id": 43830661111777784,
				"price_range": "$$",
				"cuisines": [
					"American",
					"Burgers",
					"Ice Cream"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad81"
			},
			{
				"restaurant_name": "Sonic Drive-In",
				"restaurant_id": 43830642111777496,
				"price_range": "",
				"cuisines": [
					"American",
					"Burgers"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad82"
			},
			{
				"restaurant_name": "Heart Mind & Soul",
				"restaurant_id": 43812107111804030,
				"price_range": "",
				"cuisines": [
					"American"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad83"
			},
			{
				"restaurant_name": "Subway",
				"restaurant_id": 43832700111778500,
				"price_range": "",
				"cuisines": [
					""
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad84"
			},
			{
				"restaurant_name": "McDonald's",
				"restaurant_id": 43833303111778830,
				"price_range": "",
				"cuisines": [
					"American",
					"Burgers"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad85"
			},
			{
				"restaurant_name": "Dairy Queen",
				"restaurant_id": 43833069111778080,
				"price_range": "",
				"cuisines": [
					"American",
					"Burgers",
					"Ice Cream"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad86"
			},
			{
				"restaurant_name": "Royal Soda",
				"restaurant_id": 43833992111776610,
				"price_range": "",
				"cuisines": [
					""
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad87"
			},
			{
				"restaurant_name": "KFC - Kentucky Fried Chicken",
				"restaurant_id": 43834938111777890,
				"price_range": "",
				"cuisines": [
					"American",
					"Chicken"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad88"
			},
			{
				"restaurant_name": "Jack in the Box",
				"restaurant_id": 43835073111778080,
				"price_range": "",
				"cuisines": [
					"American",
					"Burgers"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad89"
			},
			{
				"restaurant_name": "WINGERS Restaurant",
				"restaurant_id": 43836200111779800,
				"price_range": "$",
				"cuisines": [
					"American"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad8a"
			},
			{
				"restaurant_name": "Quiznos Sub",
				"restaurant_id": 43835474111778080,
				"price_range": "",
				"cuisines": [
					"American",
					"Sandwiches",
					"Wraps"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad8b"
			},
			{
				"restaurant_name": "Subway",
				"restaurant_id": 43836190111778080,
				"price_range": "",
				"cuisines": [
					"Sandwiches"
				],
				"vote": 0,
				"voteCount": 0,
				"_id": "61af9d0e4edf69acd672ad8c"
			}
		],
		"_id": "61af9d0e4edf69acd672ad73"
	}
}
```

All Possible Error Responses:
```javascript
{
    "message": "One or more errors occured.",
    "error": "No response from API"
}

{
    "message": "One or more errors occured.",
    "error": "Radius cannot be a negative value or zero."
}

{
    "message": "One or more errors occured.",
    "error": "No restaurants found with the provided query."
}
```

### CHECK IF A ROOM EXISTS

```javascript
fetch("https://you-choose-api.herokuapp.com/roomExists?roomId={num}");
```

Example Response:

```javascript
{
    "message": "room 100035 exists.",
    "roomExists": true
}
```

---

## **FOR STUFF THAT HANDLES RESULT SETS**

### SAVE A RESULT SET

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/saveResult', {
    method: "POST"
    body: {
        results: [], //an array of the top 3 restaurants
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
All Possible Error Responses:
```javascript
{
    "message": "One or more errors occured.",
    "error": [
        "Failed to confirm token",
        "JsonWebTokenError: jwt malformed",
        "No results provided",
        "No userID provided from decoded token",
        "User not found by provided token."
    ]
}

{
    "message": "Some other error occured",
    "error": [Some message here]
}

```

### DELETE A RESULT SET

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/deleteResult', {
    method: "DELETE"
    body: {
        resultId: '',
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
All Possible Error Responses:
```javascript
{
    "message": "One or more errors occured.",
    "error": [
        "Failed to confirm token",
        "JsonWebTokenError: jwt malformed",
        "The result ID was not found",
        "User not found by provided token."
    ]
}

{
    "message": "Some other error occured",
    "error": [Some message here]
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
            "date": "2021-12-02T00:54:02.009Z",
            "resultSet": [
                "Test1",
                "Test2",
                "Test3"
            ]
        }
    ]
}
```

All Possible Error Responses:
```javascript
{
    "message": "One or more errors occured.",
    "error": [
        "Failed to confirm token",
        "JsonWebTokenError: jwt malformed",
        "User not found by provided token. No results found."
    ]
}

{
    "message": "Some other error occured",
    "error": [Some message here]
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
All Possible Error Responses:
```javascript
{
    "message": "One or more errors occured.",
    "error": [
        "Wrong password!",
        "A user with this email could not be found.",
    ]
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
        confirmPassword : <confirmPassword>
        {    
}
    }
    headers: {
        'Content-Type': 'application/json'
    }
})
```

All Possible Error Responses:
```javascript
{
    "message": "One or more errors occured.",
    "error": [
        {
            "value": "test0test.com",
            "msg": "Please enter a valid email.",
            "param": "email",
            "location": "body"
        },
        {
            "value": "pasword",
            "msg": "Passwords have to match!",
            "param": "confirmPassword",
            "location": "body"
        }
    ]
}
```

Email must be a valid email.

Password Requirements:
* Minimum of 5 characters
* Is alphanumeric (no special characters)

Example Responses:

```javascript
{
    "message": "User created!",
    "userId": "6182f30b79728fedec8d0666"
}
```
```javascript
{
    "message": "Error",
    "error": [
        {
            "value": "",
            "msg": "Please enter a valid email.",
            "param": "email",
            "location": "body"
        }
    ]
}
```
