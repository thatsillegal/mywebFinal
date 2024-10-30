// src/utils/threeHelper.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// 初始化函数，接收 DOM 元素和模型路径
export function initThreeScene(container, modelPath) {
    console.log(container + " " + modelPath)

    // 创建场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('0xFFFF00');

    // 创建相机
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
    camera.position.z = 5;


    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xFFFF00, 1);
    container.appendChild(renderer.domElement);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xBBFFEE, 2);
    scene.add(ambientLight);

    // 加载模型
    loadModel(scene, modelPath);

    console.log(scene)

    //测试
    // const tmpgeometry = new THREE.BoxGeometry(1, 1, 1);
    // const tmpmaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(tmpgeometry, tmpmaterial);
    // scene.add(cube);

    // 渲染和动画函数
    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.x += 0.01; // 旋转模型
        renderer.render(scene, camera);
    }

    animate(); // 启动动画循环

    // 处理窗口调整
    window.addEventListener("resize", () => onWindowResize(container, camera, renderer), false);

    console.log(scene)
    console.log(camera)
    console.log(renderer)

    return { scene, camera, renderer }; // 返回场景对象等以便后续使用
}

// 根据文件扩展名加载模型
function loadModel(scene, modelPath) {
    const extension = modelPath.split('.').pop().toLowerCase();

    let loader;
    if (extension === 'gltf' || extension === 'glb') {
        loader = new GLTFLoader();
        loader.load(
            modelPath,
            (gltf) => {
                scene.add(gltf.scene);
            },
            undefined,
            (error) => {
                console.error("Error loading GLTF/GLB model:", error);
            }
        );
    } else if (extension === 'stl') {
        loader = new STLLoader();
        loader.load(
            modelPath,
            (geometry) => {
                const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                 // 创建边缘线条
                const edges = new THREE.EdgesGeometry(geometry);
                const lineMaterial = new THREE.LineBasicMaterial({ color: 0x666666 }); // 线条颜色
                const line = new THREE.LineSegments(edges, lineMaterial);

                // 将线条叠加到模型上
                scene.add(line);
            },
            undefined,
            (error) => {
                console.error("Error loading STL model:", error);
            }
        );
    } else if (extension === 'obj') {
        loader = new OBJLoader();
        loader.load(
            modelPath,
            (obj) => {
                scene.add(obj);
            },
            undefined,
            (error) => {
                console.error("Error loading OBJ model:", error);
            }
        );
    } else {
        console.error("Unsupported model format.");
    }
}

// 处理窗口大小调整
function onWindowResize(container, camera, renderer) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}
