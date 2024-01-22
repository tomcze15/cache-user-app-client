import axios from 'axios'
import { faker } from '@faker-js/faker'

const baseUrl = 'http://localhost:8080/users/'

export async function createUsers (numberOfUsers) {
  return sendRequests(numberOfUsers)
}

async function sendRequests (numberOfRequests) {
  const promises = []

  for (let i = 0; i < numberOfRequests; i++) {
    const name = generateRandomName()
    const surname = generateRandomSurname()

    const promise = axios.post(baseUrl, {
      name,
      surname
    })

    promises.push(promise)
  }

  return await Promise.all(promises)
}

function generateRandomName () {
  return faker.person.firstName()
}

function generateRandomSurname () {
  return faker.person.lastName()
}

export async function getUser (id) {
  return axios.get(`${ baseUrl }${ id }`)
    .then(response => response.data)
}

export async function getUsers () {
  return axios.get(baseUrl)
    .then(response => response.data)
}