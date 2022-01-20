import { Layout } from "../../components/layout/layout";
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore"; 
import { getStorage, ref, listAll, getDownloadURL} from "firebase/storage"; 
import { db } from '../../firebase/initFirebase'
import { useRouter } from 'next/router'

const storage = getStorage();
export const getStaticPaths = async () => {
	const allProject = [];
	const q = query(collection(db,"projects"))
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc)=>{allProject.push(doc.data());})
    const paths = allProject.map(project=>{
      return {
        params: {name:project.title}
      }
    })
    return {
      paths:paths,
      fallback:false
    }
};

export const getStaticProps = async (context) => {
  const name = context.params.name;
  try{
    const docRef = doc(db,'projects',name)
    const res = await getDoc(docRef)
    const data = res.data()

    return {
      props:{project:data}
    }
  }catch(error){
    console.log(error)
    router.push('/404')
  }
}

export default function Project({project}){
  console.log(project)
  return (
    <Layout>
      <h1> {project.title} </h1>
      <h1> {project.organisation} </h1>
      <h1> {project.role} </h1>
      <h1> {project.tag} </h1>
    </Layout>
  );
}