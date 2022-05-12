import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {texture} from "three/examples/jsm/nodes/ShaderNode";

// 纹理属性

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 导入纹理
const textureLoader = new THREE.TextureLoader()
const doorTexture = textureLoader.load('./textures/minecraft.png')

// 偏移
// doorTexture.offset.x = 0.5
// doorTexture.offset.y = 0.5
// doorTexture.offset.set(0.5, 0.5)

// 旋转
// doorTexture.rotation = Math.PI / 4
// doorTexture.center.set(0.5,0.5)

doorTexture.minFilter = THREE.NearestFilter
doorTexture.magFilter = THREE.NearestFilter
// doorTexture.minFilter = THREE.LinearFilter
// doorTexture.magFilter = THREE.LinearFilter

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, map: doorTexture})
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 将几何体添加到场景中
scene.add(cube)

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
