import {fetchSinToken} from "./fetch";
import {activeUser} from "../redux/features/auth/authSlice";


export const Solicita = async () => {
    try {
        const resp = fetchSinToken('api/sistema/solicitantes/')
        const body = await resp.json();

    } catch (error) {
        console.log(error)
    }
}
