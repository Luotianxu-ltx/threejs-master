import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 导入dat.gui
import * as dat from 'dat.gui'

// 点光源

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

const sphereGeometry = new THREE.SphereBufferGeometry(3,30,30)
// const material = new THREE.MeshBasicMaterial({color: 0xff0000,wireframe: true})
// const mesh = new THREE.Mesh(sphereGeometry,material)
// scene.add(mesh)

const pointMaterial = new THREE.PointsMaterial()
pointMaterial.size = 0.05
pointMaterial.color.set(0xfff000)
pointMaterial.sizeAttenuation = true

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./textures/particles/2.png')
pointMaterial.map = texture
pointMaterial.alphaMap = texture
pointMaterial.transparent = true
pointMaterial.depthWrite = true
pointMaterial.blending = THREE.AdditiveBlending
const points = new THREE.Points(sphereGeometry,pointMaterial)
scene.add(points)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到body中
document.body.appendChild(renderer.domElement)


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
