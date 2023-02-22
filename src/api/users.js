import axios from "axios"

const getUsers = async () => {
    const response = await axios.get("http://localhost:4003/users");
    return response.data;
}

const addUser = async (newUser) => {
    await axios.post("http://localhost:4003/users", newUser)
}

export { addUser, getUsers };