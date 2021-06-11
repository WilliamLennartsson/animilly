<template>
  <div class="stage" ref="canvas"></div>
</template>

<script>

// import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import * as THREE from 'three'
// import TrackballControls from 'three-trackballcontrols'
// import {
//     BloomEffect,
//     EffectComposer,
//     GlitchPass,
//     EffectPass,
//     RenderPass
// } from 'postprocessing'

export default {
    name: 'Attractors',
    data: function() {
        const scene = new THREE.Scene()
        // const composer = new THREE.EffectComposer(new WebGLRenderer())
        // const effectPass = new THREE.EffectPass(camera, new BloomEffect())
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        const renderer = new THREE.WebGLRenderer({ antialias: true })
        const light = new THREE.DirectionalLight('hsl(0, 100%, 100%)')
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshStandardMaterial({
            side: THREE.FrontSide,
            color: 'hsl(0, 100%, 50%)',
            wireframe: false
        })
        const cube = new THREE.Mesh(geometry, material)
        const axes = new THREE.AxesHelper(5)

        return {
            scene: scene,
            camera: camera,
            controls: [],
            renderer: renderer,
            light: light,
            cube: cube,
            axes: axes,
            speed: 0.01
        }
    },
    created: function() {
        this.scene.add(this.camera)
        this.scene.add(this.light)
        this.scene.add(this.cube)
        this.scene.add(this.axes)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.light.position.set(0, 0, 10)
        this.camera.position.z = 5
        this.scene.background = new THREE.Color('hsl(0, 100%, 100%)')
        // this.controls = new TrackballControls(this.camera)
        // this.controls.rotateSpeed = 1.0
        // this.controls.zoomSpeed = 5
        // this.controls.panSpeed = 0.8
        // this.controls.noZoom = false
        // this.controls.noPan = false
        // this.controls.staticMoving = true
        // this.controls.dynamicDampingFactor = 0.3
    },
    mounted: function() {
        this.$refs.canvas.appendChild(this.renderer.domElement)
        this.animate()
    },
    methods: {
        animate: function() {
            requestAnimationFrame(this.animate)
            this.renderer.render(this.scene, this.camera)
            this.cube.rotation.y += this.speed
            // this.controls.update()
        }
    },
    computed: {
        rotate: function() {
            if (this.speed === '') {
                return 0
            } else {
                return this.speed
            }
        }
    }
}
// export default {
//   name: "Attractors",
//   data() {
//     return {
//       app: null,
//       colors: ["75F4F4", "90E0F3", "B8B3E9", "D999B9"],
//       particles: []
//     };
//   },
//   mounted() {

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//     });
//     renderer.outputEncoding = THREE.sRGBEncoding;
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(new THREE.Color(0x222222, 0.5));
//     document.body.appendChild(renderer.domElement);

//     // Camera
//     const fov = 60;
//     const aspect = 1920 / 1080;
//     const near = 1.0;
//     const far = 1000.0;

//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//     camera.position.set(25, 10, 25);
//     // -- Camera --

//     // Events
//     window.addEventListener(
//       "resize",
//       () => {
//         onWindowResize();
//       },
//       false
//     );
//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     // -- Events --

//     // Scene
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color("#333333");
//     // -- Scene --

//     // Lights
//     let light = new THREE.DirectionalLight(0xffffff, 1.0);
//     light.position.set(-100, 100, 100);
//     light.target.position.set(0, 0, 0);
//     light.castShadow = true;
//     light.shadow.bias = -0.001;
//     light.shadow.mapSize.width = 4096;
//     light.shadow.mapSize.height = 4096;
//     light.shadow.camera.near = 0.1;
//     light.shadow.camera.far = 500.0;
//     light.shadow.camera.near = 0.5;
//     light.shadow.camera.far = 500.0;
//     light.shadow.camera.left = 50;
//     light.shadow.camera.right = -50;
//     light.shadow.camera.top = 50;
//     light.shadow.camera.bottom = -50;

//     scene.add(light);

//     light = new THREE.AmbientLight(0xffffff, 0.25);
//     scene.add(light);

    
//     const particles = []
//     new Array(10).fill().map(() => {
//       const particle = new PIXI.Graphics()
      
//       particle.x = 0.01
//       particle.y = 0.02
//       particle.z = 0.05

//       particle.pivot.x = -window.innerWidth / 2
//       particle.pivot.y = -window.innerHeight / 2

//       particle.beginFill('0xB8B3E9');
//       particle.drawCircle(particle.x, particle.y, 10)
//       particle.endFill()

//       particles.push(particle)
//       this.$data.particles.push(particle)
//       this.app.stage.addChild(particle);
//     })
//   },
//   methods: {
//     update(particles) {

//     },
//     transform(val) {
//       const dt = 0.01;
//       const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;
//       const x = val.x, y = val.y, z = val.z;
//       const x1 = (val.z-b)*val.x - d*val.y;
//       const y1 = d * val.x + (val.z - b) * val.y;
//       const z1 = c + a*val.z - (Math.pow(val.z, 3)/3) - (Math.pow(val.x, 2) + Math.pow(val.y, 2)) *
//         (1 + e * val.z) + f * val.z * ( Math.pow(val.x, 3)); 
		
// 		const t = {
//       x: x + dt * x1, 
//       y: y + dt * y1,
//       z:  z + dt * z1
//     }

// 		return t;

// 	}

//     // pop(event) {
//     //   let mouse_x = event.x,
//     //     mouse_y = event.y,
//     //     particles = []
//     //     const arr = new Array(50).fill()
//     //   arr.forEach(() => {
//     //     let particle = new PIXI.Graphics();
//     //     // let rand = anime.random(1, this.colors.length);
//     //     let rand = 1
//     //     particle.beginFill("0x" + this.colors[rand - 1]);
//     //     particle.drawCircle(0, 0, 4);
//     //     particle.endFill();
//     //     particle.x = mouse_x;
//     //     particle.y = mouse_y;
//     //     particles.push(particle);
//     //     this.app.stage.addChild(particle);
//     //   })
//     // }
//   }
// };
</script>
