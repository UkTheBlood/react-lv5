import axios from "axios"

const addUser = async (newUser) => {
    await axios.post("http://localhost:4003/users", newUser)
}

export { addUser };