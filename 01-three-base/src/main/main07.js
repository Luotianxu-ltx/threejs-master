import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 导入动画
import gsap from "gsap";
// 导入dat.gui
import * as dat from 'dat.gui'

// dat.gui

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

// 修改物体位置
// cube.position.set(5,0,0)
// cube.position.x = 3

//缩放
// cube.scale.set(3,2,1)
// cube.scale.x = 5

// 旋转
cube.rotation.set(Math.PI / 4, 0, 0)

// 将几何体添加到场景中
scene.add(cube)

// 设置gui
const gui = new dat.GUI()
gui.add(cube.position, 'x').min(0).max(5).step(0.1).name('移动x轴坐标').onChange((value) => {
    console.log(value)
}).onFinishChange(((value) => {
    console.log('结束' + value)
}))

const params = {
    color: '#ffff00',
    fn: () => {
        gsap.to(cube.position, {x: 5, duration: 2, yoyo: true, repeat: -1})
    }
}
gui.addColor(params, 'color').onChange((value) => {
    cube.material.color.set(value)
})
gui.add(cube, 'visible').name('是否显示')
// 设置选项框
gui.add(params,'fn').name('立方体运动')
const folder = gui.addFolder('设置立方体')
folder.add(cube.material,'wireframe')


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
// 将渲染器添加到body中
document.body.appendChild(renderer.domElement)

//=================================================================================//

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true

// 添加坐标辅助器 红x轴 绿y轴 蓝z轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

window.addEventListener("dblclick", () => {
    const fullScreenElement = document.fullscreenElement
    if (!fullScreenElement) {
        renderer.domElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

function render() {
    controls.update()
    renderer.render(scene, camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()

// 监听画面变化
window.addEventListener('resize', () => {
    // 更新摄像机
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置渲染器像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})
