import { Layout } from "../components/layout/layout";
import Authentication from "../components/auth/Authentication";

const Login = () =>{
    return (
        <div>
            <Layout>
                <section style={{height:"100vh"}}>
                <Authentication/>
                <p><a href='/'>Home</a></p>
                </section>
            </Layout>
        </div>

    )
}
export default Login