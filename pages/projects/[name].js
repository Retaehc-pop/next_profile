import { Layout } from "../../components/layout/layout";

// export const getStativPaths = async () => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await res.json();

//     const paths = data.map(project => {
//         return {
//             params:{name:project.name}
//         }
//     })
//     return{
//         paths,
//         fallback: false
//     }

// }

export default function Project(){
    return (
        <Layout>
            <h1> Project page </h1>
        </Layout>
    );
}