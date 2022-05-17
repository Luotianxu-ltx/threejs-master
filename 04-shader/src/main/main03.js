import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from 'cannon-es'

// 原始着色器

// 顶点着色器
import basicVertexShader from '../shader/deep/vertex.glsl'
// 片元着色器
import basicFragmentShader from '../shader/deep/fragment.glsl'

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// 设置相机位置
camera.position.set(0, 0, 5)
scene.add(camera)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./textures/ca.jpeg')
const params = {
    uFrequency: 10,
    uScale: 0.1
}


// 创建球和平面
// const material= new THREE.MeshBasicMaterial({color: '#00ff00'})
const rawShaderMaterial = new THREE.RawShaderMaterial({
    vertexShader:basicVertexShader,
    fragmentShader: basicFragmentShader,
    // wireframe: true,
    side: THREE.DoubleSide,
    uniforms: {
        uTime: {
            value: 0
        },
        uTexture: {
            value: texture
        }
    }
})
const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1,64,64), rawShaderMaterial)
scene.add(floor)


// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
scene.add(dirLight)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({alpha: true});
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
// 将渲染器添加到body中
document.body.appendChild(renderer.domElement)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// 添加坐标辅助器 红x轴 绿y轴 蓝z轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)


const clock = new THREE.Clock()

function render() {
    let time = clock.getElapsedTime()
    rawShaderMaterial.uniforms.uTime.value = time
    renderer.render(scene, camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
})
