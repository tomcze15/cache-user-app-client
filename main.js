import { getUser } from "./userService.js";

const numberOfRequests = 10;
// createUsers(100)

const users = []
const promises = [];

for (let i = 0; i < numberOfRequests; i++) {
  const promise = getUser('00f9be8a-c390-4575-ab8f-867d148ff051').then(user => {
    users.push(user)
  })
  .catch(err => console.log('something went wrong: ', err))

  promises.push(promise);
}

await Promise.all(promises);
console.table(users)