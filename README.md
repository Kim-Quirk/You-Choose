# **YOU-CHOOSE: Restaurant Chooser API**

---

# GETTING STARTED

## A note on POST requests:

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

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/roomExists?roomId={num}')
```

Example Response:

```javascript

```

### **GET A LIST OF NEARBY RESTAURANTS**

Example Request:

```javascript
fetch("https://you-choose-api.herokuapp.com/getRestaurantData?lat={latitude}?long={longitude}?radius={radius}?priceRange={priceRange}");
```

**Note the query parameters.** Latitude and longitude are required, the default search radius is 5 miles. If you don't specify a price range, all will be included

* latitude: number

* longitude: number

* radius: number of miles

* priceRange: 1, 2, or 3, with 3 being the most expensive.

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

### **SAVE A RESULT SET**

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/saveResult', {
    method: "POST"
    body: {
        results: [], //an array of the top 3 restaurants
        userId: , //The user's ID
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
        "Happy's",
        "Tacos",
        "Taconios"
    ]
}

```

### **DELETE A RESULT SET**

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/deleteResult', {
    method: "POST"
    body: {
        resultId: ,
        userId:
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

### **VIEW A LIST OF ALL RESULT SETS SAVED TO AN ACCOUNT**

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/getResults', {
    method: "GET"
    headers: {
        'Content-Type': 'application/json',
        Authorization: <token>
    }
    body: {
        'userId': <userID>
    }
})
```
Example Response:

```javascript
{ 
    "message": "View your previous results",
    "results": [
    {
        "_id": "618ad0da44f6b99c65c266b2",
        "resultSet": [
            "McDonalds",
            "Wendys"
        ]},
    {
        "_id": "618ad0da44f6b99c65c266b3",
        "resultSet": [
            "Five Guys",
            "Walmart"
        ]
    }]
}  

```
**Note the resultSet response.** The result set will be in rank order. The array item at index 0 will be first place, index 1 will be second place, and index 2 will be third place. *(array[0] - First, array[1] - Second, array[2] - Third)*

---

## **FOR STUFF THAT HANDLES LOGIN AND AUTHENTICATION:**

### **Login a User**

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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lQG1lLmNvbSIsInVzZXJJZCI6IjYxODJmMzBiNzk3MjhmZWRlYzhkMDY2NiIsImlhdCI6MTYzNTk3MjYxMSwiZXhwIjoxNjM2MDU5MDExfQ.lpiph4KyhV3-GP5hNtEH5F9T_NG-C-BgciV59PZ2pdU",
        "userId": "6182f30b79728fedec8d0666"
    }      
```

### **SIGN UP A NEW USER**

Example Request:

```javascript
fetch('https://you-choose-api.herokuapp.com/signup', {
    method: "POST"
    body: {
        email: ,
        password: ,
        confirmPassword: ,
    }
    headers: {
        'Content-Type': 
    }
})
```
Email must be a valid email.




Password Requirements:
* Length:
* Characters:

Password Requirements: Must be at least 5 characters and only alphanumeric characters


Example Response:


```javascript
    {
    "message": "User created!",
    "userId": "6182f30b79728fedec8d0666"
    }
```
