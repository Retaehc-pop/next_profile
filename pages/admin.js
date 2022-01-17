
import { useUser } from '../firebase/useUser'
import Link from "next/link";
import { Layout } from "../components/layout/layout";

export default function Admin() {
    const { user, logout } = useUser()
    if (user){
        return (
            <Layout>

            </Layout>
        )
    }
    else{
        return (<Layout>
            <section>
                <h1> You don't have access to this directory</h1>
                <h1><Link href='/login'>Home</Link></h1>
            </section>
        </Layout>

        );
    }
}