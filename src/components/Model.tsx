import { useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Model() {
    const { scene } = useGLTF('/for_Davlatjon/Saxna.glb');

    const [
        eshikNormal, eshikLight, eshikRMA,
        yerNormal, yerLight, yerRMA
    ] = useTexture([
        '/for_Davlatjon/web_format_textures/Saxna_eshiklar_Normal.1001.webp',
        '/for_Davlatjon/web_format_textures/Saxna_eshiklar_light.1001.webp',
        '/for_Davlatjon/web_format_textures/Saxna_eshiklar_roughness_metallic_AO.1001.webp',
        '/for_Davlatjon/web_format_textures/Saxna_yer_Normal.1001.webp',
        '/for_Davlatjon/web_format_textures/Saxna_yer_light.1001.webp',
        '/for_Davlatjon/web_format_textures/Saxna_yer_roughness_metallic_AO.1001.webp'
    ])

    useEffect(() => {
        [eshikNormal, eshikLight, eshikRMA, yerNormal, yerLight, yerRMA].forEach(t => {
            t.flipY = false;
        })
    }, [eshikNormal, eshikLight, eshikRMA, yerNormal, yerLight, yerRMA]);

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const name = child.name.toLowerCase()

                if (name.includes('eshik')) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: eshikLight,
                        normalMap: eshikNormal,
                        roughnessMap: eshikRMA,
                        metalnessMap: eshikRMA,
                        aoMap: eshikRMA
                    })
                } else if (name.includes('yer')) {
                    child.material = new THREE.MeshStandardMaterial({
                        map: yerLight,
                        normalMap: yerNormal,
                        roughnessMap: yerRMA,
                        metalnessMap: yerRMA,
                        aoMap: yerRMA
                    })
                }
            }
        })
    }, [scene, eshikNormal, eshikLight, eshikRMA, yerNormal, yerLight, yerRMA]);

    return <primitive object={scene} />;
}

useGLTF.preload('/for_Davlatjon/Saxna.glb')
