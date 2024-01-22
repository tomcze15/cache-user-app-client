import { createUsers, getUser } from './userService.js'
import { getRandomIndex } from './helper.js'

const numberOfUsersToCreate = 100
const numberOfRequests = 10
const usersIds = []

await createUsers(numberOfUsersToCreate)
  .then((res) => {
    console.table(res.map(user => {
      usersIds.push(user.data.user.id)
      return user.data.user
    }))
    console.log('All requests have been processed')
  })
  .catch((err) => console.error('Something went wrong during creating users: ', err))

const users = []
const promises = []
const randomIds = [
  usersIds[getRandomIndex(usersIds)],
  usersIds[getRandomIndex(usersIds)],
  usersIds[getRandomIndex(usersIds)]
]

randomIds.forEach((randomId) => {
  for (let i = 0; i < numberOfRequests; i++) {
    const promise = getUser(randomId)
      .then(user => {
        users.push(user)
      })
      .catch(err => console.log('Something went wrong: ', err))

    promises.push(promise)
  }
})

await Promise.all(promises)
console.log('='.repeat(25) + '\n')

randomIds.forEach((randomId) => {
  console.log(`Get users by id ${ randomId }`)
})

console.table(users)