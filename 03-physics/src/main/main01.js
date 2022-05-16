import * as THREE from "three"
// 导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as CANNON from 'cannon-es'

// 使用cannon引擎

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300)
// 设置相机位置
camera.position.set(0, 0, 18)
scene.add(camera)

const cubeArr = []
// 设置物体材质
const cubeWorldMaterial = new CANNON.Material("sphere")
const cubeMaterial = new THREE.MeshStandardMaterial()
function createCube() {
    // 创建立方体和平面
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    scene.add(cube)

    // 创建物理cube形状
    const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))

    // 创建物理世界的物体
    const cubeBody = new CANNON.Body({
        shape: cubeShape,
        position: new CANNON.Vec3(0, 0, 0),
        // 小球质量
        mass: 1,
        // 物体材质
        material: cubeWorldMaterial
    })
    // 将物体添加至物理世界
    world.addBody(cubeBody)

    // 添加监听碰撞事件
    function HitEvent(e) {
        const impactStrength = e.contact.getImpactVelocityAlongNormal()
        console.log(impactStrength)
    }

    cubeBody.addEventListener('collide', HitEvent)
    cubeArr.push({
        mesh: cube,
        body: cubeBody
    })
}

window.addEventListener('click', createCube)

const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(20, 20), new THREE.MeshStandardMaterial())
floor.position.set(0, -5, 0)
floor.rotation.x = -Math.PI / 2
floor.receiveShadow = true
scene.add(floor)

// 创建物理世界
const world = new CANNON.World()
world.gravity.set(0, -9.8, 0)

// 物理世界创建地面
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
const floorMaterial = new CANNON.Material("floor")
// 质量为0时，可以使物体保持不动
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.position.set(0, -5, 0)
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
world.addBody(floorBody)

// 设置两种材质碰撞的参数
const defaultContactMaterial = new CANNON.ContactMaterial(
    cubeWorldMaterial,
    floorMaterial,
    {
        // 摩擦力
        friction: 0.1,
        // 弹性
        restitution: 0.7
    }
)
// 将材料的关联设置添加到物理世界
world.addContactMaterial(defaultContactMaterial)

// 设置世界碰撞的默认材料,如果材料没有设置,都用这个
world.defaultContactMaterial = defaultContactMaterial

// 添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5)
dirLight.castShadow = true
scene.add(dirLight)

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({alpha: true});
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
// 将渲染器添加到body中
document.body.appendChild(renderer.domElement)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
// 添加坐标辅助器 红x轴 绿y轴 蓝z轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)


const clock = new THREE.Clock()

function render() {
    let time = clock.getDelta()
    world.step(1 / 120, time)
    // cube.position.copy(cubeBody.position)
    cubeArr.forEach((item) => {
        item.mesh.position.copy(item.body.position)
        // 设置渲染的物体跟随图例的物体旋转
        item.mesh.quaternion.copy(item.body.quaternion)
    })
    renderer.render(scene, camera)
    // 渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render)
}

render()

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
})
