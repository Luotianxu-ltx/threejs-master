import * as THREE from "three"

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
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
// 将几何体添加到场景中
scene.add(cube)

// 初始化渲染器
const render = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小
render.setSize(window.innerWidth,window.innerHeight)
// 将渲染器添加到body中
document.body.appendChild(render.domElement)

// 使用渲染器通过相机将场景渲染进来
render.render(scene, camera)
