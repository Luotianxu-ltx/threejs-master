import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {texture} from "three/examples/jsm/nodes/ShaderNode";

// 环境遮挡贴图

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 导入纹理
const textureLoader = new THREE.TextureLoader()
const doorTexture = textureLoader.load('./textures/door/color.jpg')
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const aoTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    map: doorTexture,
    alphaMap: alphaTexture,
    transparent: true,
    aoMap: aoTexture
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
const planeGeometry = new THREE.PlaneBufferGeometry(1, 1)
const plane = new THREE.Mesh(planeGeometry, material)
plane.position.set(3, 0, 0)
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
