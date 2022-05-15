import * as THREE from "three"
// 导入动画
import gsap from "gsap";


// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 300)
// 设置相机位置
camera.position.set(0, 0, 18)
scene.add(camera)

const cubeGeometry = new THREE.BoxBufferGeometry(2,2,2)
const material = new THREE.MeshBasicMaterial({
    wireframe: true
})
const redMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
})

// 1000个立方体
const cubeArr = []
let cubeGroup = new THREE.Group()
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        for (let k = 0; k < 5; k++) {
            const cube = new THREE.Mesh(cubeGeometry,material)
            cube.position.set(i * 2 - 4,j * 2 - 4,k * 2 - 4)
            cubeGroup.add(cube)
            cubeArr.push(cube)
        }
    }
}
scene.add(cubeGroup)

// 创建三角形
let sjxGroup = new THREE.Group()
for (let i = 0; i < 50; i++) {
    // 每个三角形需要三个顶点，每个顶点需要三个值
    const geometry = new THREE.BufferGeometry()
    const positionArray = new Float32Array(9)
    for (let j = 0; j < 9; j++) {
        if (j % 3 === 1) {
            positionArray[j] = Math.random() * 10 - 5
        } else {
            positionArray[j] = Math.random() * 10 - 5
        }
    }
    geometry.setAttribute('position',new THREE.BufferAttribute(positionArray,3))
    let color = new THREE.Color(Math.random(), Math.random(), Math.random())
    const material = new THREE.MeshBasicMaterial({color: color,transparent: true, opacity: 0.5, side: THREE.DoubleSide})
    let sjxMesh = new THREE.Mesh(geometry,material)
    sjxGroup.add(sjxMesh)
}
sjxGroup.position.set(0,-30,0)
scene.add(sjxGroup)
let arrGroup = [cubeGroup,sjxGroup]

// 鼠标的位置对象
const mouse = new THREE.Vector2()
// 创建投射光线对象
const raycaster = new THREE.Raycaster()
// 监听鼠标位置
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX/window.innerWidth) * 2 - 1
    mouse.y = -((event.clientY/window.innerHeight) * 2 - 1)
    raycaster.setFromCamera(mouse,camera)
    let result = raycaster.intersectObjects(cubeArr)
    result.forEach(item => {
        item.object.material = redMaterial
    })
})

// 设置当前页
let currentPage = 0
// 监听滚动事件
window.addEventListener('scroll', () => {
    const newPage = Math.round(window.scrollY / window.innerHeight)
    if(newPage !== currentPage) {
        currentPage = newPage
        gsap.to(arrGroup[currentPage].rotation, {
            z: '+=' + Math.PI,
            duration: 1
        })
        // gsap.to(`.page${currentPage} h1`, {
        //     rotate: '+=' + 360,
        //     duration: 1
        // })
        gsap.fromTo(`.page${currentPage} h1`, {
            x: -300
        },{
            x: 0,
            rotate: '+=360',
            duration: 1
        })
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX/window.innerWidth - 0.5
    mouse.y = event.clientY/window.innerHeight - 0.5
})

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({alpha: true});
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.physicallyCorrectLights = true
// 将渲染器添加到body中
document.body.appendChild(renderer.domElement)



// 添加坐标辅助器 红x轴 绿y轴 蓝z轴
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const clock = new THREE.Clock()

gsap.to(cubeGroup.rotation,{
    x: '+=' + Math.PI,
    y: '+=' + Math.PI,
    duration: 5,
    repeat: -1,
    ease: 'power2.inout'
})
gsap.to(sjxGroup.rotation,{
    x: '+=' + Math.PI,
    z: '+=' + Math.PI,
    duration: 5,
    repeat: -1,
    ease: 'power2.inout'
})
function render() {
    let time = clock.getDelta()
    // cubeGroup.rotation.x = time * 0.5
    // cubeGroup.rotation.y = time * 0.5
    // sjxGroup.rotation.x = time * 0.4
    // sjxGroup.rotation.z = time * 0.3
    // 根据滚动的scrollY 设置相机位置
    camera.position.y = -(window.scrollY/window.innerHeight) * 30
    camera.position.x += (mouse.x * 10 - camera.position.x) * time * 5
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
