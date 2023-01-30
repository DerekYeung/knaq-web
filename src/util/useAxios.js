import axios from 'axios'
import { useContext } from 'react'
import { UserContext, UserContextUpdate } from '../contexts/UserContext'
import { useHistory } from 'react-router-dom'

export default function useAxios() {
    const history = useHistory()
    // const user = useContext(UserContext)
    // const userUpdate = useContext(UserContextUpdate)

    axios.interceptors.request.use(
        request => {
            // console.log('Intercept!')
            return request
        },
        error => {
            console.log("=Request Error")
            return Promise.reject(error)
        }
    )
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            // if (error.response.data?.message === "Invalid token") refetchToken()
            if (error.response.data?.message === "Invalid token") logout()
            return Promise.reject(error);
        }
    );

    const refresher = axios.create()

    const logout = () => {
        console.log("logout")
        history.push("/login")
    }

    const refetchToken = async () => {
        console.log("=Token Error")
        // const { data } = refresher.post("https://api.knaqapp.com/api/refresh_token", {}, { headers: { Authorization: `Bearer ${user.token}` } })
        // console.log(data)
    }

    // console.log("inside hook")
}