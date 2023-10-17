import axios from "axios";

export const GetDataFormBackend = async ({action, endpoint}) => {
    try {
        await axios.get(
            process.env.NEXT_PUBLIC_API_HOST + endpoint
        )
            .then(response => {
                action((response.data));
            })
    } catch (error) {
        console.log(error)
    }

}