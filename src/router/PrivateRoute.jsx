import { Navigate } from "react-router-dom";

 const PrivateRoute = ({ children })=>{
    const id = localStorage.getItem('id');
    if (id) {
        return children;
    }
    return <Navigate to={'/login'}></Navigate>
    
}

export default PrivateRoute;