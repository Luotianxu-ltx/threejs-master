import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {log, texture} from "three/examples/jsm/nodes/ShaderNode";

// 置换贴图

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

let event = {}
// 单张纹理图的加载
event.onLoad = function () {
    console.log('图片加载完成')
}
event.onProgress = function (url,num,total) {
    console.log(url)
    console.log(num)
    console.log(total)
    console.log('图片加载进度',((num/total) * 100).toFixed(2))
}
event.onError = function (e) {
    console.log(e)
}

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
    event.onLoad,event.onProgress,event.onError
)

// 导入纹理
const textureLoader = new THREE.TextureLoader(loadingManager)
const doorTexture = textureLoader.load('./textures/door/color.jpg',event.onLoad,event.onProgress,event.onError)
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const aoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
// 导入置换贴图
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
// 导入粗糙度贴图
const rounghnessTexture = textureLoader.load('./textures/door/roughness.jpg')
// 导入金属贴图
const metanessTexture = textureLoader.load('./textures/door/metalness.jpg')
// 导入发现贴图
const normalTexture = textureLoader.load('./textures/door/normal.jpg')

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 100, 100, 100)
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    map: doorTexture,
    alphaMap: alphaTexture,
    transparent: true,
    aoMap: aoTexture,
    aoMapIntensity: 1,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    roughness: 0,
    roughnessMap: rounghnessTexture,
    metalness: 1,
    metalnessMap: metanessTexture,
    normalMap: normalTexture
})
material.side = THREE.DoubleSide
const cube = new THREE.Mesh(cubeGeometry, material)
scene.add(cube)

// 环境光
const light = new THREE.AmbientLight(0xffffff)
scene.add(light)
// 直线光源
const directionalLight = new THREE.DirectionalLight(0xffffff,0.5)
directionalLight.position.set(10,10,10)
scene.add(directionalLight)


// 添加平面
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 200, 200)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(2, 0, 0)
scene.add(plane)
planeGeometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array,2))

// 给平面设置第二组uv
cubeGeometry.setAttribute('uv2', new THREE.BufferAttribute(cubeGeometry.attributes.uv.array, 2))

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
