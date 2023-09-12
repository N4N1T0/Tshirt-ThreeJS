import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

function Shirt () {
  const snap = useSnapshot(state)
  // @ts-expect-error: Disable TypeScript checking for this line
  const { nodes, materials } = useGLTF('./shirt_baked.glb')

  const logoTexture = useTexture(snap.logoDecal)
  const fullTexture = useTexture(snap.fullDecal)

  useFrame((_state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta))

  const stateString = JSON.stringify(snap)

  return (
    <group key={stateString}>
      <mesh
        // eslint-disable-next-line react/no-unknown-property
        castShadow
        // eslint-disable-next-line react/no-unknown-property
        geometry={nodes.T_Shirt_male.geometry}
        // eslint-disable-next-line react/no-unknown-property
        material={materials.lambert1}
        // eslint-disable-next-line react/no-unknown-property
        material-roughness={1}
        // eslint-disable-next-line react/no-unknown-property
        dispose={null}
        // eslint-disable-next-line react/no-unknown-property
        rotation={[0, 0, 0]}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
