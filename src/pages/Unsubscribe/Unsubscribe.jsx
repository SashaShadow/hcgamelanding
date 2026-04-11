
import axios from "axios";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const Unsubscribe = () => {

    const [alertMsg, setAlertMsg] = useState(null)
    const [loader, setLoader] = useState(false)
    const { token } = useParams();

    const unsubscribe = async (token) => {
        try {
            setLoader(true)
            const back_url = import.meta.env.VITE_BACKEND_URL
            const payload = { token: token }

            const unsubscribeCall = await axios.post(`${back_url}mail/unsubscribe`, payload)
            console.log(unsubscribeCall.data)

            if (`${unsubscribeCall.data.status_code}`.startsWith(2)) {
                setAlertMsg(`You have been unsubscribed from our mailing list.`)
            } else {
                setAlertMsg(`${unsubscribeCall.data.description || "Something went wrong. Please try again later."}`)
            }
        } catch (err) {
            setAlertMsg("Something went wrong. Please try again later.")
            console.log(err.toString())
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        if (token) {
            const apiCalls = async () => {
                await unsubscribe(token)
            }
            apiCalls()
        }
    }, [token])

    return (
        <div>
            <h2 className="rosebud" style={{ marginTop: "3rem" }}>We will miss you!</h2>
            {alertMsg && !loader && <CustomAlert message={alertMsg} onClose={() => setAlertMsg(null)} />}

        </div>
    )
}

export default Unsubscribe