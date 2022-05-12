import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// 三角形

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
// 创建几何体
for (let i = 0; i < 50; i++) {
    // 每个三角形需要三个顶点，每个顶点需要三个值
    const geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(9)
    for (let j = 0; j < 9; j++) {
        positionArray[j] = Math.random() * 10 - 5

    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))
    let color = new THREE.Color(Math.random(), Math.random(), Math.random())
    const material = new THREE.MeshBasicMaterial({color: color,transparent: true, opacity: 0.5})
    const mesh = new THREE.Mesh(geometry,material)
    scene.add(mesh)
}

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
