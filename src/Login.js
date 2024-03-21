import { Button } from "react-bootstrap"
import { GoogleLogin } from '@react-oauth/google';
function Login() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    return (
        <div class="m-4">
            <h1 class="m-4">Login Page</h1>
            <form action="/Login" method="get"  style={{boxShadow: "10px 10px 5px grey", border:"1px solid black", padding:"10px", width:"fit-content", height:"fit-content",margin:"auto"}}>
                <div class="form-outline m-4">
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> 
                </div>
            </form>
        </div>
    )
};

export default Login