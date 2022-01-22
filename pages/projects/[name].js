import { Layout } from "../../components/layout/layout";
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { db } from '../../firebase/initFirebase'
import { useRouter } from 'next/router'
import styles from '../../styles/project.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const storage = getStorage();
export const getStaticPaths = async () => {
  const allProject = [];
  const q = query(collection(db, "projects"))
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => { allProject.push(doc.data()); })
  const paths = allProject.map(project => {
    return {
      params: { name: project.title }
    }
  })
  return {
    paths: paths,
    fallback: false
  }
};

export const getStaticProps = async (context) => {
  const name = context.params.name;
  try {
    const docRef = doc(db, 'projects', name)
    const res = await getDoc(docRef)
    const data = res.data()

    return {
      props: { project: data }
    }
  } catch (error) {
    console.log(error)
    router.push('/404')
  }
}

export default function Project({ project }) {
  console.log(project)
  return (
    <Layout>
      <main className={styles.main}>
        <section>
          <img src={project.cover} />
          <div>
            <h1> {project.title} <a href={project.sourceCode}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></a></h1>
            {/* <h1> {project.organisation} </h1> */}
            <h3> as :{project.role} </h3>
            <p> {project.tag} </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}