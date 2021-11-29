
# Compassolisa 

This is the final project that i'm doing for Compasso UOL trainee's program.



## Authors

- [@algteixeira](https://www.github.com/algteixeira)


## Features

- CRUD for people
- CRUD for cars (need to have an authorization token to use)
- CRUD for rentals
- CRUD for the rental fleet
- CRUD for car reserves in specific rentals
- Authentication system
- page&limit pagination scheme
- Using MongoDB Atlas to avoid needing a local database


## Used technologies

**Server:** 
- Node v14.17.4
- Express v4.17.1
- MongoDB v5.0.2
- Mongoose v6.0.11
- JWT v8.5.1 & Bcrypt v5.0.1

**Tests:**
- Jest v27.3.1
- Supertest v6.1.6

**Client:**
- - SwaggerUI v4.1.6


## How to run

Clone the project

```bash
  git clone https://github.com/algteixeira/projeto_final
```

Go to the project directory

```bash
  cd projeto_final
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

...Or in dev mode

```bash
  npm run dev
```

...To test use

```bash
  npm run test
```

...Additional info
```bash
  it runs at port 3000 (or env.proccess.PORT if passed)
```


## Documentation

To plot the documentation just run the following command in your browser while server is running

```bash
  http://localhost:3000/api/v1/api-docs/
```
    