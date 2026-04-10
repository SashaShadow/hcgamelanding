import { useState, createContext, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "../services/LocalStorState/LocalStorState.js";

const Context = createContext();

export const SessionContext = ({ children }) => {

  const [token, setToken] = useLocalStorage(null, "token");
  const [checkToken, setCheckToken] = useState(false);
  const [user, setUser] = useLocalStorage(null, "user");

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          setToken(null);
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [setToken, setUser]);

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const getAxiosInstance = (baseUrl) => {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  };

  return (<Context.Provider value={{ setToken, token, setCheckToken, checkToken, user, setUser, getAxiosInstance, logout }} >
    {children}
  </Context.Provider>)
}

export default Context;