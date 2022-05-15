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
camera.position.set(0, 0, 40)
scene.add(camera)


function createPoints(url,size=0.5) {

    const particlesGeometry = new THREE.BufferGeometry()
    const count = 5000
    // 设置缓冲区数据
    const positions = new Float32Array(count * 3)
        // 设置粒子顶点颜色
    const colors = new Float32Array(count * 3)

    // 设置顶点
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100
        colors[i] = Math.random()
    }
    particlesGeometry.setAttribute('position',new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color',new THREE.BufferAttribute(colors, 3))

    const pointMaterial = new THREE.PointsMaterial()
    pointMaterial.size = 0.5
    pointMaterial.color.set(0xfff000)
    pointMaterial.sizeAttenuation = true

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(`./textures/particles/${url}.png`)
    pointMaterial.map = texture
    pointMaterial.alphaMap = texture
    pointMaterial.transparent = true
    pointMaterial.depthWrite = true
    pointMaterial.blending = THREE.AdditiveBlending
// 启用顶点颜色
    pointMaterial.vertexColors = true
    const points = new THREE.Points(particlesGeometry,pointMaterial)
    scene.add(points)
    return points
}


const points = createPoints('1')

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
    points.rotation.x = time * 0.3
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
