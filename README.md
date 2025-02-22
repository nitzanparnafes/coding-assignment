# Vi Coding Assignment 

__A simple web server to answer trivia facts about movies and their actors__

## Tools
- Express for API routing and middleware
- Axios for handling HTTP requests to external APIs
- dotenv for Environment variable management
- LRUCache for data caching 
- Jest for testing
- Supertest for API testing 
- __List additional tools you used...__

## Getting Started

### Install dependencies

Before starting to code, don't forget to install all dependencies.

```shell
yarn
```

### Running tests

Run all tests once:

```shell
yarn test
```

### How to use

Create a .env file in the root directory and add the following
```
TMDB_API_KEY=your_tmdb_api_key_here
CACHE_TTL=600 # Time-to-live for memoization (in milliseconds). not required
```

To start the server:
```shell
npm start
```

### API Endpoints

| usage                                                                       | name                          | method | request / response                                 |
|-----------------------------------------------------------------------------|-------------------------------|--------|----------------------------------------------------|
| Fetches from movie DB which movies did each actor play in                   | /moviesPerActor               | GET    | [{ actorName: [movie names] }]                     |
| Fetches from movie DB who are the actors who played more than one character | /actorsWithMultipleCharacters | GET    | [{ actorName: [{movieName, characterName}] }]      |
| Fetches from the movies which roles were played by more than one actor      | /charactersWithMultipleActors | GET    | [{ characterName: [{movieName, actorName}] }]      |
| Updates internal movie and actor interests to fetch from movie DB           | /updateInterests              | POST   | { 'movies': [movie names], 'actors': [actor names] |


