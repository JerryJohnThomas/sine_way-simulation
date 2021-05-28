import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import "./Sine1.css"
import { CubicBezierCurve } from 'three'
function Sine1() {
    useEffect(()=>{
     
// Debug
const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')
gui.closed=true;
// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
const material=new THREE.MeshStandardMaterial( { wireframe: false });
material.color.setRGB(0,220,0);
let A=new THREE.Mesh(geometry,material);

A.material.color.setHex(0x00ff00);
// A.color="red";
// material.color="red";
// scene.add(A);

let pointLight = new THREE.PointLight(0xffffff, 0.4)
pointLight.position.set(0,10,10);
scene.add(pointLight);

let pointLight2 = new THREE.PointLight(0xffffff, 0.1)
pointLight2.position.set(10,0,0);
scene.add(pointLight2);


const ambientLight=new THREE.AmbientLight(0xffffff,0.6);
scene.add(ambientLight);

const directionalLight= new THREE.DirectionalLight(0xffffff,1.6);
// directionalLight.position.set(100,-300,400);
directionalLight.position.set(1000,1000,1000);
// scene.add(directionalLight);
gui.add(directionalLight.position,"x",-300,1000);
gui.add(directionalLight.position,"y",-300,1000);
gui.add(directionalLight.position,"z",-300,1000);

const axesHelper = new THREE.AxesHelper( 50 );
// scene.add( axesHelper );


let box_fact=3;
let boxw=0.1*box_fact;
let boxh=0.1*box_fact;
let boxd=1.8*box_fact;

const geometry2 = new THREE.BoxGeometry( boxw, boxh, boxd );
const material2 = new THREE.MeshLambertMaterial( {color: 0x00ff00} );
const material33 = new THREE.MeshLambertMaterial( {color: 0x00fff0} );
const cube = new THREE.Mesh( geometry2, material2 );
// scene.add( cube );

// let cubeset=[[],[]];
// let cubeset=[[],[]];
let count_width=21;
let offset_width=boxw*1.2;

let count_height=count_width;
let offset_height=offset_width;
console.log("started");

let ta=[...Array(count_height)].map(x=>Array(count_width).fill(0));
console.log(ta);
ta[1][2]=cube;
console.log(ta[1]);
console.log(ta[1][2]);
let cubeset=ta;
let cf=4;
for(let i=0;i<count_height;i++)
{
    for(let j=0;j<count_width;j++)
    {
        // cubeset[i][j]=i+j;
        // ta[i][j]=9;
        // const color = new THREE.Color(`hsl(${30 +360 }, 100%, 50%)`);
        // const color = new THREE.Color(`hsl(${30  }, 100%, 50%)`);
        const color = new THREE.Color(`hsl(${120 + (count_height/2-i) * cf+(count_width/2-j)*cf}, 100%, 50%)`);
        const material_in = new THREE.MeshLambertMaterial({ color });

        cubeset[i][j]=new THREE.Mesh( geometry2, material_in );
        cubeset[i][j].position.x=(offset_width*(j-count_width/2));
        cubeset[i][j].position.y=(offset_height*(i-count_height/2));
        scene.add(cubeset[i][j]);
        console.log("added"+i+j);
    }
}
console.log(ta[2][2]);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const camera_width=window.innerWidth>600?28:15;
const aspect_ratio=window.innerWidth/window.innerHeight;
const camera_height=camera_width/aspect_ratio;

const camera = new THREE.OrthographicCamera(
    camera_width/-2,        //left
    camera_width/2,         //right
    camera_height/2,        //top
    camera_height/-2,       //bottom
    0,                      //near plane
    1000                    //further plane
)
camera.up.set(0,0,1);
let camera_offset=10;
camera.position.set( camera_offset, camera_offset, camera_offset ); // all components equal
camera.lookAt( cube.position ); // or the origin
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */



const windowX=window.innerWidth/2;
const windowY= window.innerHeight/2;

// onDocumentMouseMove = (event) =>{
//     mouseX=(event.clientX-windowX);
//     mouseY=(event.clientY-windowY);
// }


const clock = new THREE.Clock()

// const controls = new OrbitControls( camera, renderer.domElement );
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    let time_offset=0;
    let time_oi=0.41

    // for(let i=0;i<count_width;i++)
    // {
    //     let angle=elapsedTime+time_offset;
    //     if(i>count_width/2)
    //     time_offset-=time_oi;
    //     else
    //     time_offset+=time_oi;
    //     let vv=Math.abs(Math.sin(angle));
    //     cubeset[i].scale.z=vv;
    //     // console.log("loopiong"+i);
    // }


    for(let i=0;i<count_height;i++)
    {
        for(let j=0;j<count_width;j++)
        {
            let d1=((count_height-1)/2)-(i);
            let d2=((count_width-1)/2 -1)-(j);
            let dd=Math.sqrt(d1*d1+d2*d2);
            time_offset=dd*time_oi;
            let angle=elapsedTime*1.1+time_offset;
            // let vv=Math.abs(Math.sin(angle))+1*boxw;
            let vv=Math.abs(Math.sin(angle))+1*boxw;
            cubeset[i][j].scale.z=vv;
            if(i==0&&j==count_width-1)
            console.log(dd+"  first");
            if(i==count_height-1&&j==count_width-1)
            console.log(dd+" second");
            
        }
    }
    


    // cube.scale.z=vv;
    // console.log(vv);
    // console.log(cube.geometry.width);
    
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)
    // controls.update();
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
    },[])
    return (
        <div className="">
        <canvas class="webgl"></canvas>
        <div class="">
          
            
        </div>
        </div>
    )
}

export default Sine1
