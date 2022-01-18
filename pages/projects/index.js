// import { useRouter } from "next/router";
import { Layout } from "../../components/layout/layout";
import Link from "next/link";

// export const getStaticProps = async () => {
//     const res =  await fetch("htttps://jsonplaceholder.typicode.com/users");
//     const data = await res.json();
//     return {
//         props: {projects:data}
//     }
// }
export default function Projects() {
	// const projects = {
	// 	sporos:{
	// 		name:"SPOROS",
	// 		role:"programmer"
	// 	},
	// 	foodbuster:{
	// 		name:"foodbuster",
	// 		role:"AI developer"
	// 	},
	// }
    // console.log(projects)
	return (
		<div>
			<Layout>
				<main>
					<section>
						<h1> Projects </h1>
						{/* {
							projects.map(project =>{
								<Link href={'/projects/'+project.name} key={project.name}>
									<h3>Project.name</h3>
								</Link>
							})
						} */}
					</section>
				</main>
			</Layout>

		</div>
	)
}