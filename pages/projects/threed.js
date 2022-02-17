import { Layout } from "../../components/layout/layout";
import Head from "next/head";
import Styles from "../../styles/Threed.module.scss"
import { Canvas, useFrame} from "@react-three/fiber"
import { Circle, Html , OrbitControls, Text } from "@react-three/drei";
import { useRef, useState,createRef, useEffect } from "react";

const state = {
  section: 3,
  pages: 3,
  zoom : 75,
  top: createRef()
}

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  useFrame((state, delta) => (ref.current.rotation.x += 0.01,ref.current.rotation.y += 0.01,ref.current.rotation.z += 0.01 ))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 2: 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
export default function Threed(){
  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <div>
		<Head>
        <title>Papop: 3D</title>
        <meta name="description" content="Papop Lekhapanyaporn's Website" />
        <meta charSet="UTF-8"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <Layout>
      <Canvas linear orthographic camera={{ zoom: state.zoom, position:[0,0,500] }} className={Styles.canvas}>
        {/* <OrbitControls/> */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, 10, -10]} />
        <Box position={[-2, 0, 0]} />
        <Box position={[2, 0, 0]} />
      </Canvas>
    </Layout>
    <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
      <div style={{ height: `${state.pages * 100}vh` }} />
    </div>
    </div>
  )
}