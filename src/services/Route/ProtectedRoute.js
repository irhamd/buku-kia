import React, { useState } from 'react'
import { Route, Redirect, useHistory } from "react-router-dom"
import { ubahText } from '../Crypto';
import { globalText } from '../Text/GlobalText';

// var getCache = sessionStorage.getItem(globalText.x_auth_resu)
// export const userLogin = JSON.parse(getCache && ubahText(getCache))


function ProtectedRoute({ component: Component, ...rest }) {

    // var author = sessionStorage.getItem(globalText.y_auth_fhdev) != null ? true : false;
    // var author = sessionStorage.getItem(globalText.x_auth_resu) != null ? true : false;
    var author = true;

    Object.values(globalText).forEach(val => {
        var cek = sessionStorage.getItem(val) != null ? true : author = false;
        console.log(cek)
    });
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
    // var author = true;
    // Object.values(globalText).forEach(val => {
    //     sessionStorage.getItem(val) != null ? true : author = false;
    // });

    // if (author) {
    //     // his.push('/login')
    // }


}

