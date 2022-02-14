import { Layout } from "../../components/layout/layout";
import Head from "next/head";

import { Canvas } from "@react-three/fiber"
import { Html } from '@react-three/drei';
export default function Threed(){

  return (
    <div>
		<Head>
        <title>Papop: 3D</title>
        <meta name="description" content="Papop Lekhapanyaporn's Website" />
        <meta charSet="UTF-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Layout>
      <Canvas
        colorManagement
        camera = {{position:[0,0,120],fov:70}}>
          <Html>
            <div>
              <h1>TITLE</h1>
            </div>
          </Html>
      </Canvas>
    </Layout>
    </div>
  )
}