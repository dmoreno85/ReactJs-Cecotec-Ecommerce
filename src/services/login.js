import axios from 'axios';

export const loginUser = async (user) => {
    try {
        console.log(user);
        const res = await axios.post('http://localhost:3001/login', user)

        localStorage.setItem('authToken', res.data.accessToken)


        console.log(res);
        return res.data
    } catch (error) {

    }
};

export const logout = async () => {
    try {

         localStorage.removeItem('authToken');

        return

    } catch (error) {

    }
}