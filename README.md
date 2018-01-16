# Caloriosa lightweight REST client

Caloriosa.com rest client for JavaScript/Node.js projects or websites

## Installation

```shell
npm install @caloriosa/rest-client # or yarn add
```

## Usage

### Node.js

```javascript
const CaloriosaRestClient = require('@caloriosa/rest-client')

var client = CaloriosaRestClient.createApiClient({ url: 'https://api.caloriosa.com' })
```

### Browser

```html
<script src="path/to/lib/caloriosa-restc.min.js"></script>
<script>
  var client = CaloriosaRestClient.createApiClient({ url: 'https://api.caloriosa.com' })
</script>
```

## Custom build

```shell
git checkout git@github.com:Caloriosa/rest-client.git
cd rest-client
npm install # or yarn
npm run build # or yarn build
```

In directory `dist/` you can find dist files.

### Running tests

```shell
npm run test # or yarn test
```

## Examples

### As user

```javascript
const CaloriosaRestClient = require('@caloriosa/rest-client')

var client = CaloriosaRestClient.createApiClient({ url: 'https://api.caloriosa.com' })

// User login example 
client.login('foobar', 'password123').then(authInfo => console.log)

// Get user list
client.api.users.get().then(u => console.log(u.content))
client.api.users.get({filter: {name: 'Ashley' }}).then(u => console.log(u.content)) // with query

// Get logged user profile (User must be logged in!)
client.api.users.me.get().then(u => console.log(u.content))

// Get specific user by login name
client.api.users('@ashley').get().then(u => console.log(u.content))

// Logout
client.logout().then(() => console.log('User has been logged out'))
```

### As device

```javascript
const CaloriosaRestClient = require('@caloriosa/rest-client')

var client = CaloriosaRestClient.createApiClient({ url: 'https://api.caloriosa.com' })

client.token = "<PutYourDeviceTokenHere>"

// Send measured values example
client.api.measure.post({
  // Measured values here
}).then(m => console.log(m.content))

// Get device's info
client.api.devices.me.get().then(d => console.log(d.content))
```