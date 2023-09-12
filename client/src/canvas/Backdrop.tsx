import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const Backdrop = () => {
  return (
    <AccumulativeShadows
      temporal
      frames={60}
      alphaTest={0.50}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.95}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.75}
        ambient={0.35}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop
