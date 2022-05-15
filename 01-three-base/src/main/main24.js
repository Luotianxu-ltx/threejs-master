import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// 导入dat.gui
import * as dat from 'dat.gui'

// 设置雪花

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 40)
// 设置相机位置
camera.position.set(0, 0, 20)
scene.add(camera)

const cubeGeometry = new THREE.BoxBufferGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({
    wireframe: true
})
const redMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
})

// 1000个立方体
const cubeArr = []
for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
        for (let k = -5; k < 5; k++) {
            const cube = new THREE.Mesh(cubeGeometry,material)
            cube.position.set(i,j,k)
            scene.add(cube)
            cubeArr.push(cube)
        }
    }
}

// 鼠标的位置对象
const mouse = new THREE.Vector2()
// 创建投射光线对象
const raycaster = new THREE.Raycaster()
// 监听鼠标位置
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX/window.innerWidth) * 2 - 1
    mouse.y = -((event.clientY/window.innerHeight) * 2 - 1)
    raycaster.setFromCamera(mouse,camera)
    let result = raycaster.intersectObjects(cubeArr)
    console.log(result)
    result.forEach(item => {
        item.object.material = redMaterial
    })
})

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

const clock = new THREE.Clock()
function render() {
    let time = clock.getElapsedTime()
    controls.update()
    renderer.render(scene, camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
})
