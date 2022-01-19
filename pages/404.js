import Link from "next/link";
import { Layout } from "../components/layout/layout";
import styles from '../styles/Admin.module.scss'
export default function NotFound(){
    return (
        <Layout>
            <main className={styles.main}>
                <section>
                    <h1>Oops..., we took you to the wrong path</h1>
                    <h2>404 :  error page not found.</h2>
                    <h1><Link href="/">Go back to Home</Link></h1>
                </section>
            </main>
            
        </Layout>
    )
}