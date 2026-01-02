import {
  useGLTF,
  useAnimations
} from '@react-three/drei';
import React from 'react';

export function Model(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF('/for_Davlatjon/Saxna.glb');
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="aylana" geometry={nodes.aylana.geometry} material={materials.yer} />
        <mesh name="eshik_noutbuk" geometry={nodes.eshik_noutbuk.geometry} material={materials.eshiklar} />
        <mesh name="eshik_about" geometry={nodes.eshik_about.geometry} material={materials.eshiklar} />
        <mesh name="eshik_Wall_E" geometry={nodes.eshik_Wall_E.geometry} material={materials.eshiklar} />
        <mesh name="eshik_Jinxs_gun" geometry={nodes.eshik_Jinxs_gun.geometry} material={materials.eshiklar} />
        <mesh name="eshik_instruments" geometry={nodes.eshik_instruments.geometry} material={materials.eshiklar} />
        <mesh name="eshik_piano" geometry={nodes.eshik_piano.geometry} material={materials.eshiklar} />
        <mesh name="eshik_kamera" geometry={nodes.eshik_kamera.geometry} material={materials.eshiklar} />
        <mesh name="eshik_gitara" geometry={nodes.eshik_gitara.geometry} material={materials.eshiklar} />
      </group>
    </group>
  )
}

useGLTF.preload('/for_Davlatjon/Saxna.glb');