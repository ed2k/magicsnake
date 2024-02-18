/* TODO, collision detection
experiment at https://jsfiddle.net/ed2k/8r32ftmp/36/
*/
const RAD2 = Math.SQRT2;
const PI   = Math.PI;

let scene = new THREE.Scene();

// Setup camera, renderer, controls
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20;
camera.position.y = 0;
camera.position.x = 6 * RAD2;

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight - 5 );
document.body.appendChild( renderer.domElement );

let controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(6 * RAD2, 0, 0);

// Update the camera when window resizes
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight - 5 );
}, false );

// Add lights
(function setupLights() {
    let lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
    scene.add( lights[ 2 ] );
})();

// Setup audio
var listener = new THREE.AudioListener();
camera.add( listener );

var sound = new THREE.Audio( listener );
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'click.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setVolume( 0.5 );
});

playSound = true;

function buildMesh(shape, material, offset) {
    let extrudeSettings = {
        steps: 2,
        depth: 1,
        bevelEnabled: false,
    };

    let geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(offset, 0, 0);
    scene.add(mesh);
    return mesh;
}

function cloneMesh(mesh, idx, offset) {
    let newMesh = mesh.clone();
    newMesh.position.set(RAD2 * idx + offset, 0, 0);
    scene.add(newMesh);
    return newMesh;    
}

// Build the Snake
function buildBlocks(shape, material, offset) {
    let blocks = [];
    let mesh = buildMesh(shape, material, offset);
    blocks.push(mesh);

    for(let i = 1; i < configs.totalBlocks/2; i++) {
        let newMesh = cloneMesh(mesh, i, offset);
        blocks.push(newMesh);
    }
    return blocks;
}

let configs = {totalBlocks: 24}
// First, add the lower 'blue' set of triangular blocks
let blueMaterial = new THREE.MeshPhongMaterial( { color: 0x156289,
    emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );

let blueShape = new THREE.Shape();
blueShape.moveTo( 0,0 );
blueShape.lineTo( RAD2, 0);
blueShape.lineTo( RAD2 / 2, RAD2 / 2);
blueShape.lineTo( 0, 0 );
let blues = buildBlocks(blueShape, blueMaterial, 0);

// Second, add the upper 'red' set of triangular blocks
let redMaterial = new THREE.MeshPhongMaterial( { color: 0xFF0000,
    emissive: 0x072534, side: THREE.DoubleSide, flatShading: true } );

let redShape = new THREE.Shape();
redShape.moveTo( 0, RAD2 / 2 );
redShape.lineTo( RAD2, RAD2 / 2);
redShape.lineTo( RAD2 / 2, 0);
redShape.lineTo( 0, RAD2 / 2 );
let reds = buildBlocks(redShape, redMaterial, RAD2 / 2);

// Converts a string into a json object containing numbered angles
function genAngles(s) {
    let totalBlocks = configs.totalBlocks;
    let angles = {};
    for(let i = 1; i < totalBlocks; i++) {
        angles["angle" + i] = parseInt(s[i-1]);
    }
    return angles;
}

// generate variable size default zero
function genAnglesWithSize(size) {
    let totalBlocks = configs.totalBlocks;
    let angles = {};
    for(let i = 1; i < totalBlocks; i++) {
        angles["angle" + i] = 0;
    }
    return angles;
}

function updateAllWorlds() {
    for(const t of blues) {
        t.updateMatrixWorld(true);
    }
    for(const t of reds) {
        t.updateMatrixWorld(true);
    }
}

// Initial position is a line (all angles are 0)
// 0=>0 1=>PI/2 2=>PI 3=>-PI/2
const n2a = {0:0, 1:PI/2, 2:PI, 3:-PI/2}
let currentAngles = genAngles('0'.repeat(configs.totalBlocks - 1));
let prevAngles = Array(configs.totalBlocks).fill(0);
function updateAngles() {
    const delta = configs.totalBlocks - prevAngles.length;
    if (delta === 0) return
    angleBlocks = configs.totalBlocks - 1;
    if (delta > 0) {
        prevAngles = prevAngles.concat(Array(delta).fill(0));
        for (let i = angleBlocks - delta + 1 ; i <= angleBlocks; i+=2 ) {
            console.log(i);
            currentAngles["angle" + i] = 0;
            currentAngles["angle" + (i + 1)] = 0;
            blues.push(cloneMesh(blues[0], i/2, 0));
            reds.push(cloneMesh(reds[0], i/2, RAD2 / 2));
        }
    } else {
        prevAngles = prevAngles.slice(0, configs.totalBlocks);
        for (let i = angleBlocks; i > (angleBlocks - delta); i-=2 ) {
            console.log(i);
            delete currentAngles["angle" + i];
            delete currentAngles["angle" + (i - 1)];
            scene.remove(blues[i/2]);
            blues.splice(i/2, 1);
            scene.remove(reds[i/2]);
            reds.splice(i/2, 1);
        }
    }
    blues = buildBlocks(blueShape, blueMaterial, 0);
    reds = buildBlocks(redShape, redMaterial, RAD2 / 2);
    redrawSnake();
    buildGUI();
}

function redrawSnake() {
    let rotationPoint = new THREE.Vector3(3 * RAD2 / 4, RAD2 / 4, 0.5);
    let totalBlocks = configs.totalBlocks;
    console.log(totalBlocks);

    for(let triCount = 1; triCount < totalBlocks; triCount++) {
        // Without this, the world matrices don't get updated and the rotations are messed up
        updateAllWorlds();
        // If particular angle didn't change, don't rotate
        if(prevAngles[triCount] == currentAngles["angle" + triCount]) {
            continue;
        }

        if(playSound) {
            sound.play();
        }

        let mesh;
        let rotationVector;

        if(triCount % 2 == 1) {
            mesh = blues[Math.floor(triCount / 2)];
            rotationVector = new THREE.Vector3(RAD2 / 2, RAD2 / 2, 0);
        } else {
            mesh = reds[Math.floor(triCount / 2) - 1];
            rotationVector = new THREE.Vector3(RAD2 / 2, -1 * RAD2 / 2, 0);
        }

        let pivotMatrix = mesh.matrixWorld.clone();
        let invPivotMatrix = new THREE.Matrix4().getInverse(pivotMatrix, false);

        // TODO: consider the fundamental approach here.  Essentially we're always looking
        // at changes in the angles from prior values.  Maybe floating point rounding
        // errors could accumulate after a series of movements.
        let rotationAngle = n2a[currentAngles["angle" + triCount]] - n2a[prevAngles[triCount]];
        let rotationMatrix = new THREE.Matrix4().makeRotationAxis(rotationVector, rotationAngle);
        prevAngles[triCount] = currentAngles["angle" + triCount];

        function transformAfter(list, idx) {
            for(; idx < totalBlocks/2; idx++) {
                let block = list[idx];
                block.applyMatrix(invPivotMatrix);
                block.position.sub(rotationPoint);
                block.applyMatrix(rotationMatrix);
                block.position.add(rotationPoint);
                block.applyMatrix(pivotMatrix);
            }
        }

        transformAfter(blues, Math.floor((triCount + 1)/2));
        transformAfter(reds, Math.floor(triCount / 2));
    }
}

function getPresetJSON() {
    return {
        "preset": "Default",
        "closed": false,
        "remembered": {
            "Default": {
                "0": genAnglesWithSize(configs.totalBlocks)
            },
            "Cat": {
                "0": genAngles("02202201022022022000000")
            },
            "Three Peaks": {
                "0": genAngles("10012321211233232123003")
            },
            "ZigZag": {
                "0": genAngles("11111111111111111111111")
            },
            "Triangle": {
                "0": genAngles("30000001300000013000000")
            },
            "Ball": {
                "0": genAngles("13133131131331311313313")
            },
            "Cross": {
                "0": genAngles("20220202202000220002022")
            },
            "Cobra": {
                "0": genAngles("01013211231030000200002")
            },
            "Coronet": {
                "0": genAngles("00110033001100330011003")
            }
        },
        folders: {}
    };
}

// Build GUI controls
let gui = new dat.GUI({load: getPresetJSON(), preset: 'Default'});
let f1, f2 = null;
function buildGUI() {
    gui.remember(currentAngles);

    if (!f1) {
        f1 = gui.addFolder("Basic Controls");

        f1.add(controls, "autoRotate");
        f1.add(window, "clickToAnimate");
        f1.add(window, "playSound");
        f1.add(configs, "totalBlocks", 12, 72).step(2).onChange(updateAngles).listen();
        function colorChange(material, newColor) {
            material.color.setRGB(newColor.r/256, newColor.g/256, newColor.b/256);
        }
    
        let colorHolder = {"color1": {"r": 0x15, "g": 0x62, "b": 0x89},
                           "color2": {"r": 0xFF, "g": 0x00, "b": 0x00}};
        f1.addColor(colorHolder, "color1").onChange(colorChange.bind(null, blueMaterial));
        f1.addColor(colorHolder, "color2").onChange(colorChange.bind(null, redMaterial));
        f1.open();
    }

    let totalBlocks = configs.totalBlocks;
    if (f2) {
        gui.removeFolder(f2);
    }
    f2 = gui.addFolder("Angle Controls");
    for(let i = 1; i < totalBlocks; i++) {
        f2.add(currentAngles, "angle" + i, 0, 3).step(1).onChange(redrawSnake).listen();
    }
}
buildGUI();

// Animate building the current shape step by step from the starting position
let building = false;
function clickToAnimate() {
    if(building) {
        return;
    }
    building = true;
    let animateGoal = Object.assign({}, currentAngles);

    // Reset to a straight line
    let totalBlocks = configs.totalBlocks;
    for(let i = 1; i < totalBlocks; i++) {
        currentAngles["angle" + i] = 0;
    }

    redrawSnake();
    setTimeout(buildHelper.bind(null, animateGoal, 1), 500);
}

function buildHelper(goal, count) {
    let totalBlocks = configs.totalBlocks;
    while(currentAngles["angle" + count] == goal["angle" + count] && count < totalBlocks) {
        count++;
    }
    currentAngles["angle" + count] = goal["angle" + count];

    redrawSnake();
    if(count < (totalBlocks-1)) {
        setTimeout(buildHelper.bind(null, goal, count + 1), 500);
    } else {
        building = false;
    }
}

// Start the three js animation loop
function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
animate();
