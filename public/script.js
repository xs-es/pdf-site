import * as THREE from 'three';
import * as pdfjsLib from 'pdfjs-dist';


document.getElementById("upload-button").addEventListener("click", () => {
    document.getElementById("file-upload").click();
});

document.getElementById("file-upload").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("pdf", file);
        fetch("/upload", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            loadPdf(`/uploads/${file.name}`);
        })
        .catch((err) => console.error("Upload error:", err));
    }
});

async function loadPdf(filePath) {
    const pdf = await pdfjsLib.getDocument(filePath).promise;
    const page = await pdf.getPage(1);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = document.getElementById("pdf-canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
        canvasContext: context,
        viewport: viewport,
    };
    await page.render(renderContext).promise;
}

// Three.js for Holographic Effect
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("flipbook").appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
