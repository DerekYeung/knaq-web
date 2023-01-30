import { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { UserContext } from '../contexts/UserContext'
import useAxios from '../util/useAxios.js'

function ProtectedRoute({ component: Component, ...rest }) {
    const user = useContext(UserContext)
    useAxios()

    return (
        <Route
            {...rest}
            render={(props) =>
                user.id
                    ? <Component {...props} />
                    // : <Redirect to={`/login?redirect=${props.history.location.pathname}`} />
                    : <Redirect to={`/`} />
            }
        />
    );
}

export default ProtectedRoute
