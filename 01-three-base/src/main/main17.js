import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {log, texture} from "three/examples/jsm/nodes/ShaderNode";
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'

// 置换贴图

const rgbeLoder = new RGBELoader()
rgbeLoder.loadAsync('textures/hdr/002.hdr').then((texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
})

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 设置cube纹理加载器
const cubeTextureLoader = new THREE.CubeTextureLoader()
const envMapTexture = cubeTextureLoader.load([
    'textures/environmentMaps/1/px.jpg',
    'textures/environmentMaps/1/nx.jpg',
    'textures/environmentMaps/1/py.jpg',
    'textures/environmentMaps/1/ny.jpg',
    'textures/environmentMaps/1/pz.jpg',
    'textures/environmentMaps/1/nz.jpg',
])

// 添加物体
const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20)
const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.1
})
const sphere = new THREE.Mesh(sphereGeometry,material)
scene.add(sphere)

// 给场景添加背景
scene.background = envMapTexture
// 给场景所有的物体添加默认的环境贴图
scene.environment = envMapTexture

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
const directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
directionalLight.position.set(10,10,10)
scene.add(directionalLight)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到body中
document.body.appendChild(renderer.domElement)

//=================================================================================//

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 添加坐标辅助器 红x轴 绿y轴 蓝z轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

function render() {
    renderer.render(scene, camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()
