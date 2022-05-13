import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 导入dat.gui
import * as dat from 'dat.gui'

// 阴影贴图

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

const sphereGeometry = new THREE.SphereBufferGeometry(1,20,20)
const material = new THREE.MeshStandardMaterial()
const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.castShadow = true
scene.add(sphere)

const planeGeometry = new THREE.PlaneBufferGeometry(50,50)
const plane = new THREE.Mesh(planeGeometry,material)
plane.position.set(0,-1,0)
plane.rotation.x = -Math.PI/2
plane.receiveShadow = true
scene.add(plane)

// 环境光
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)
const spotLight = new THREE.SpotLight(0xffffff,0.5)
spotLight.position.set(5,5,5)
spotLight.castShadow = true
spotLight.intensity = 2

// 设置阴影贴图的模糊度
spotLight.shadow.radius = 20
// 设置阴影贴图的分辨率
spotLight.shadow.mapSize.set(4096,4096)

spotLight.target = sphere
spotLight.angle = Math.PI/6
spotLight.distance = 0
spotLight.penumbra = 0
spotLight.decay = 0

scene.add(spotLight)

// 设置gui
const gui = new dat.GUI()
gui.add(sphere.position,'x').min(-5).max(5).step(0.1)
gui.add(spotLight,'angle').min(0).max(Math.PI/2).step(0.01)
gui.add(spotLight,'distance').min(0).max(10).step(0.01)
gui.add(spotLight,'penumbra').min(0).max(1).step(0.01)
gui.add(spotLight,'decay').min(0).max(5).step(0.01)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
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
