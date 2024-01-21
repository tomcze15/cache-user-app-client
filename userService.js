import axios from "axios";
import { faker } from "@faker-js/faker";

export function createUsers(numberOfUsers) {
    sendRequests(numberOfUsers)
    .then(() => console.log('All requests have been processed'))
    .then(() => console.error(`Something went wrong during creating users`))
}

async function sendRequests(numberOfRequests) {
    const promises = [];

    for (let i = 0; i < numberOfRequests; i++) {
        const name = generateRandomName();
        const surname = generateRandomSurname();

        const promise = axios.post('http://localhost:8080/users/',{
            name: name,
            surname: surname
        }).then((response) => {
            console.log('Response for request', i, ':', response.status);
        }).catch(() => console.error('Error in request', i))

        promises.push(promise);
    }

    await Promise.all(promises);
}

function generateRandomName() {
    return faker.person.firstName()
}

function  generateRandomSurname() {
    return faker.person.lastName()
}

export async function getUser(id) {
    return axios.get(`http://localhost:8080/users/${id}`)
        .then(response => response.data)
}