import React from "react";
import  {Route, useNavigate } from "react-router-dom"

const ProtectedRouter = ({component, isLoggedIn }) => {
    const navigate = useNavigate()
    return <Route path="/">{isLoggedIn ? component : navigate("/singup")}</Route>
}

export default ProtectedRouter