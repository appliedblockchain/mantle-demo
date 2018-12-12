# mantle-demo

A demo app highlighting how to use Mantle's encryption capabilities.

# Setup

TODO: Set up docker-compose for local development

To set up the demo locally, perform the following actions:

#### `From /api:`

- `npm i`

#### `From /contracts:`

- `npm i`
- `npm run compile`
- `npm run parity`
- `npm run deploy` (Deploys contracts to your running parity node)

#### `From /react:`

- `npm i`

#### `From project root(/):`

- `npm i`
- `npm start`

The API server will start on port 3000 and react app on port 3001

Available API routes:

```
GET http://localhost:3000/api/users
GET http://localhost:3000/api/notes
POST http://localhost:3000/api/notes
```

