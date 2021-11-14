import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Route, Redirect, useHistory } from "react-router-dom"
import { _Cache } from 'services/Cache';
import { ubahText } from '../Crypto';
import { gcookies, globalText } from '../Text/GlobalText';

// var getCache = sessionStorage.getItem(globalText.x_auth_resu)
// export const userLogin = JSON.parse(getCache && ubahText(getCache))


function ProtectedRoute({ component: Component, ...rest }) {
    var author = true;
    Object.values(globalText).forEach(val => {
        var cek = sessionStorage.getItem(val) != null ? true : author = false;
    });
    Cookies.get(gcookies.kia) ? true : author = false;

    const [Auth] = useState(author)

    return (
        <Route
            {...rest}
            render={(props) => {
                if (Auth) {
                    return <Component />
                } else {
                    return (
                        <Redirect to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }} />
                    )
                }
            }}
        >

        </Route>
    )
}

export default ProtectedRoute

export const logOut = () => {
    Object.values(globalText).forEach(val => {
        sessionStorage.removeItem(val)
    });
    Cookies.remove(gcookies.kia)
    _Cache.remove('x-pacient')
}

