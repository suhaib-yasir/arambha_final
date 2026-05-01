import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export function ProtectedRoute({children}){

const {currentUser,loading}=useAuth();

if(loading){
return(
<div className="
min-h-screen
flex
items-center
justify-center
">
<div className="
w-16
h-16
border-4
border-indigo-200
border-t-indigo-600
rounded-full
animate-spin
"></div>
</div>
)
}

if(!currentUser){
return <Navigate to="/" replace />
}

return children

}