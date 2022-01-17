import { Layout } from "../components/layout/layout";
import Authentication from "../components/auth/Authentication";
import  Link  from "next/link"
import styles from "../styles/Login.module.css"
const Login = () =>{
    return (
        <div>
            <Layout>
                <main className={styles.main}>
                    <section>
                        <h1> Sign in </h1>
                        <Authentication/>
                        <h1><Link href='/'>Home</Link></h1>
                    </section>
                </main>
            </Layout>
        </div>

    )
}
export default Login