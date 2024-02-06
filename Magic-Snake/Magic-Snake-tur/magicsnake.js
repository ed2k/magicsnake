if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var x1 = math.matrix([-0.5,  -0.5, -0.5]);
var x2 = math.matrix([0.5, 0.5, -0.5]);
var x3 = math.matrix([0.5, 0.5, 0.5]);
var x4 = math.matrix([-0.5, -0.5, 0.5]);
var x5 = math.matrix([0.5, -0.5, 0.5]);
var x6 = math.matrix([0.5, -0.5, -0.5]);
var th = [];
var thdog = [1,1,3,0,2,2,0,0,3,1,0,1,1,0,2,2,0,0,1,1,0,1,1,0,0,2,2,0,1,1,0,1,3,0,0,2,2,0,3,1,0,3,1,3,3,1,3,3,0,2,2,0,3,3,1,3,3,3,0,2,2,0,1,1,1,3,1,3,3,1,3,0];
var thlobster=[0,2,2,0,0,2,0,0,1,3,3,2,3,3,2,3,3,3,3,2,1,1,1,1,2,1,1,0,3,1,2,3,3,2,1,1,2,3,1,0,1,1,2,1,3,0,2,2,0,1,3,2,1,1,3,3,2,3,3,2,1,1,3,0,0,2,0,0,2,2,0];
var thracingcar=[3,3,3,3,0,2,2,0,3,1,1,0,3,2,1,2,0,2,2,0,3,0,1,1,3,1,1,1,1,0,1,0,0,3,2,3,1,2,1,3,2,3,0,0,1,2,3,2,1,2,1,2,1,2,1,2,3,2,0,2,2,0,1,0,3,3,3,1,1,1,3,3,3,0,3,1,2,3,3,1,3,1,1,3,1,3,3,3,1,1,3,3,0,3,1,0,3,2,3,1,2,1,1,3,3,1,3,1,1,3,2,0,2,2,0,0,2,0,0,3,1,0,1,2,1,3,0,3,1,0,1,3,2,1,1,3,1,3,3,1,3,1,1,1];
var rotate=0;
var rotaterec=[];
var vcenter = [];
var vin = [];
var vout = [];
var count=0;
var error=0;
var posting;

var canvas, camera;
var scenes = [], renderer;
init();
animate();

// Update the camera when window resizes
window.addEventListener('resize', function () {
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    console.log(window.innerWidth, window.innerHeight)
    renderer.setSize( window.innerWidth, window.innerHeight - 5 );
}, false );

function init() {
    //canvas = document.getElementById( "c" );
       // drawpath(thdog,'dog',0,[0,math.pi/2, math.pi],[0,0,-10]);
        //drawpath(th,'your design',1,[0,0,0],[0,0,0]);
    //renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight - 5 );
    document.body.appendChild( renderer.domElement );
}
function updateSize() {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if ( canvas.width !== width || canvas.height !== height ) {
        renderer.setSize( width, height, false );
    }
}
function animate() {
    render();
    requestAnimationFrame( animate );
}
function render() {
    //updateSize();
    //canvas.style.transform = `translateY(${window.scrollY}px)`;
    renderer.setClearColor( 0xffffff );
    renderer.setScissorTest( false );
    renderer.clear();
    renderer.setClearColor( 0xe0e0e0 );
    renderer.setScissorTest( true );
    scenes.forEach( function( scene ) {
        // so something moves
        //scene.children[ 0 ].rotation.y = Date.now() * 0.001;
        // get the element that is a place holder for where we want to
        // draw the scene
        var element = scene.userData.element;
        // get its position relative to the page's viewport
        var rect = element.getBoundingClientRect();
        // check if it's offscreen. If so skip it
        if ( rect.bottom < 0 || rect.top  > renderer.domElement.clientHeight ||
                rect.right  < 0 || rect.left > renderer.domElement.clientWidth ) {
            return;  // it's off screen
        }
        // set the viewport
        var width  = rect.right - rect.left;
        width = window.innerWidth;
        var height = rect.bottom - rect.top;
        var left   = rect.left;
        var top    = rect.top;
        renderer.setViewport( left, top, width, height );
        renderer.setScissor( left, top, width, height );
        camera = scene.userData.camera;
        //camera.aspect = width / height; // not changing in this example
        //camera.updateProjectionMatrix();
        var controls = scene.userData.controls;
        controls.update();
        renderer.render( scene, camera );
        var stats = scene.userData.stats;
        stats.update();
    } );
}


function drawpath(th, j, c, rot, shi) {
    var x1 = math.matrix([-0.5,  -0.5, -0.5]);
    var x2 = math.matrix([0.5, 0.5, -0.5]);
    var x3 = math.matrix([0.5, 0.5, 0.5]);
    var x4 = math.matrix([-0.5, -0.5, 0.5]);
    var x5 = math.matrix([0.5, -0.5, 0.5]);
    var x6 = math.matrix([0.5, -0.5, -0.5]);
    //var rot = [0,math.pi/2, math.pi];
    //var shi = [0,0,10];
    x1 = rotshi(x1, rot, shi);
    x2 = rotshi(x2, rot, shi);
    x3 = rotshi(x3, rot, shi);
    x4 = rotshi(x4, rot, shi);
    x5 = rotshi(x5, rot, shi);
    x6 = rotshi(x6, rot, shi);
    
    var count=0
    var template = document.getElementById( "template" ).text;
    var content = document.getElementById( "content" );
    
    var scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x000000 );
        // make a list item
    
        var element = document.createElement( "div" );
        element.className = "list-item";
        element.innerHTML = template.replace( '$',j );
        // Look up the element that represents the area
        // we want to render the scene
        scene.userData.element = element.querySelector( ".scene" );
        //content.appendChild( element );
        content.insertBefore( element,content.childNodes[0] );
    
        scene.add( new THREE.AmbientLight( 0xffffff ) );
        
        var camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000 );
        camera.position.set( 15, 10, 10 );
        //camera.position.z = 5;
        scene.userData.camera = camera;
        var light = new THREE.PointLight( 0xffffff, 1 );
        camera.add( light );
        var controls = new THREE.TrackballControls( scene.userData.camera, scene.userData.element );
        //var controls = new THREE.TrackballControls( scene.userData.camera );
            controls.rotateSpeed = 4.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [ 65, 83, 68 ];
            //controls.addEventListener( 'change', render );
            

        scene.userData.controls = controls;
        // add one random mesh to each scene
        var group = new THREE.Group();
        scene.add( group );
        
    var vertices = [];
        vertices.push(
            new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
            new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
            new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
            new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
            new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
            new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
        );

        var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
    
    if (c==0 && count%2==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    } else if (c==0 && count%2!=0) {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );                  
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    } else if (c!=0 && count%2!=0) {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );                  
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    } else {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    }
        
    if (th.length>0){
     for ( var i = 0; i < th.length; i ++ ) {
        var vertices = [];
        var next = nextposition(x1,x2,x3,x4,x5,x6,th[i]*math.pi/2);
        x1 = next[0];
        x2 = next[1];
        x3 = next[2];
        x4 = next[3];
        x5 = next[4];
        x6 = next[5];
        vertices.push(
        new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
        new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
        new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
        new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
        new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
        new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
        );

        
        var count=i+1;
 var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
        if (c==0 && count%2==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    } else if (c==0 && count%2!=0) {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );                  
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    } else if (c!=0 && count%2!=0) {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );                  
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    } else {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    }
    
    // convex hull
    
    }
    
    }

    var stats = new Stats();
    scene.userData.stats = stats;
    //window.addEventListener( 'resize', onWindowResize, false );
        scenes.push( scene );
}


/*

$("#addblock").click(function(){
    scenes.pop(0);
    th.push(0);
    drawpath(th,0);
    var content = document.getElementById( "content" );
    content.removeChild(content.childNodes[1]);
    rotate=0;
    rotaterec.push(0);
});

$("#rotateblock").click(function(){
    scenes.pop(0);
    rotaterec.pop(-1);
    rotate=rotate+1;
    rotate=rotate%4;
    th.pop(-1);
    th.push(rotate);
    drawpath(th,0);
    var content = document.getElementById( "content" );
    content.removeChild(content.childNodes[1]);
    rotaterec.push(rotate);
});

$("#removeblock").click(function(){
    scenes.pop(0);
    rotaterec.pop(-1);
    rotate=rotaterec[rotaterec.length-1];
    th.pop(-1);
    drawpath(th,0);
    var content = document.getElementById( "content" );
    content.removeChild(content.childNodes[1]);
});

*/

var ti,l=0,si=1, timeout=50;

function addtime() {

    ti = setInterval(movedog,10);

}
 

function drawcube(){
    var x1 = math.matrix([-0.5,  -0.5, -0.5]);
    var x2 = math.matrix([0.5, 0.5, -0.5]);
    var x3 = math.matrix([0.5, 0.5, 0.5]);
    var x4 = math.matrix([-0.5, -0.5, 0.5]);
    var x5 = math.matrix([0.5, -0.5, 0.5]);
    var x6 = math.matrix([0.5, -0.5, -0.5]);

    var template = document.getElementById( "template" ).text;
    var content = document.getElementById( "content" );
    
    var scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x000000 );
        // make a list item
    
        var element = document.createElement( "div" );
        element.className = "list-item";
        element.innerHTML = template.replace( '$','cube' );
        // Look up the element that represents the area
        // we want to render the scene
        scene.userData.element = element.querySelector( ".scene" );
        //content.appendChild( element );
        content.insertBefore( element,content.childNodes[0] );
    
        scene.add( new THREE.AmbientLight( 0xffffff ) );
        
        var camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000 );
        camera.position.set( 15, 10, 10 );
        //camera.position.z = 5;
        scene.userData.camera = camera;
        var light = new THREE.PointLight( 0xffffff, 1 );
        camera.add( light );
        var controls = new THREE.TrackballControls( scene.userData.camera, scene.userData.element );
        //var controls = new THREE.TrackballControls( scene.userData.camera );
            controls.rotateSpeed = 4.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [ 65, 83, 68 ];
            //controls.addEventListener( 'change', render );
            

        scene.userData.controls = controls;
        // add one random mesh to each scene
        var group = new THREE.Group();
        scene.add( group );
        
    var vertices = [];
        vertices.push(
            new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
            new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
            new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
            new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
            new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
            new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
        );

        var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
    

    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
     
    var rot = [math.pi,math.pi, 0];
    var shi = [0,0,0];
    x1 = rotshi(x1, rot, shi);
    x2 = rotshi(x2, rot, shi);
    x3 = rotshi(x3, rot, shi);
    x4 = rotshi(x4, rot, shi);
    x5 = rotshi(x5, rot, shi);
    x6 = rotshi(x6, rot, shi);

        var vertices = [];
        vertices.push(
            new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
            new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
            new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
            new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
            new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
            new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
        );

        var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
    

    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    
    var stats = new Stats();
    scene.userData.stats = stats;
    //window.addEventListener( 'resize', onWindowResize, false );
        scenes.push( scene );
} 
 
 

function drawmobius(){

    var template = document.getElementById( "template" ).text;
    var content = document.getElementById( "content" );
    
    var scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x000000 );
        // make a list item
    
        var element = document.createElement( "div" );
        element.className = "list-item";
        element.innerHTML = template.replace( '$','Möbius' );
        // Look up the element that represents the area
        // we want to render the scene
        scene.userData.element = element.querySelector( ".scene" );
        //content.appendChild( element );
        content.insertBefore( element,content.childNodes[0] );
    
        scene.add( new THREE.AmbientLight( 0xffffff ) );
        
        var camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000 );
        camera.position.set( 15, 10, 10 );
        //camera.position.z = 5;
        scene.userData.camera = camera;
        var light = new THREE.PointLight( 0xffffff, 1 );
        camera.add( light );
        var controls = new THREE.TrackballControls( scene.userData.camera, scene.userData.element );
        //var controls = new THREE.TrackballControls( scene.userData.camera );
            controls.rotateSpeed = 4.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [ 65, 83, 68 ];
            //controls.addEventListener( 'change', render );
            

        scene.userData.controls = controls;
        // add one random mesh to each scene
        var map = new THREE.TextureLoader().load( '../../javascripts/three.js-master/examples/textures/UV_Grid_Sm.jpg' );
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;
				var material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );
        var geometry, object;
            geometry = new THREE.ParametricBufferGeometry( THREE.ParametricGeometries.mobius, 10, 20 );
            object = new THREE.Mesh( geometry, material );
            object.position.set( 0, 0, 0 );
            object.scale.multiplyScalar( 3 );
            scene.add( object );
        

    
    var stats = new Stats();
    scene.userData.stats = stats;
    //window.addEventListener( 'resize', onWindowResize, false );
        scenes.push( scene );
} 

function drawthmobius(th, fc){
    var x1 = math.matrix([-0.5,  -0.5, -0.5]);
    var x2 = math.matrix([0.5, 0.5, -0.5]);
    var x3 = math.matrix([0.5, 0.5, 0.5]);
    var x4 = math.matrix([-0.5, -0.5, 0.5]);
    var x5 = math.matrix([0.5, -0.5, 0.5]);
    var x6 = math.matrix([0.5, -0.5, -0.5]);
    count=0;
    colorside = [];

    var template = document.getElementById( "template" ).text;
    var content = document.getElementById( "content" );
    
    var scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x000000 );
        // make a list item
    
        var element = document.createElement( "div" );
        element.className = "list-item";
        element.innerHTML = template.replace( '$','Möbius' );
        // Look up the element that represents the area
        // we want to render the scene
        scene.userData.element = element.querySelector( ".scene" );
        //content.appendChild( element );
        content.insertBefore( element,content.childNodes[0] );
    
        scene.add( new THREE.AmbientLight( 0xffffff ) );
        
        var camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000 );
        camera.position.set( 15, 10, 10 );
        //camera.position.z = 5;
        scene.userData.camera = camera;
        var light = new THREE.PointLight( 0xffffff, 1 );
        camera.add( light );
        var controls = new THREE.TrackballControls( scene.userData.camera, scene.userData.element );
        //var controls = new THREE.TrackballControls( scene.userData.camera );
            controls.rotateSpeed = 4.0;
            controls.zoomSpeed = 1.2;
            controls.panSpeed = 0.8;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
            controls.keys = [ 65, 83, 68 ];
            //controls.addEventListener( 'change', render );
            

        scene.userData.controls = controls;
        // add one random mesh to each scene
        var group = new THREE.Group();
        scene.add( group );
        
        var vertices = [];
        vertices.push(
            new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
            new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
            new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
            new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
            new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
            new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
        );

        var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
    if (fc==0) {
    var meshMaterial = new THREE.MeshLambertMaterial( {
    //color: 0xffffff,
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( -0.5,  -0.5, -0.5 ),
    new THREE.Vector3( 0.5, 0.5, -0.5 ),
    new THREE.Vector3(0.5, -0.5, -0.5)
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(0);
    } else if (fc==1) {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(1);
    } else if (fc==2) {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(2);
    }
    for ( var i = 0; i < th.length; i ++ ) {
        var vertices = [];
        var next = nextposition(x1,x2,x3,x4,x5,x6,th[i]*math.pi/2);
        x1 = next[0];
        x2 = next[1];
        x3 = next[2];
        x4 = next[3];
        x5 = next[4];
        x6 = next[5];
        vertices.push(
        new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
        new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
        new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
        new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
        new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
        new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) ),
        );
        
        var count=i+1;

    // convex hull
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
    rotate=th[i];
    
    if (colorside[colorside.length-1]==0 && rotate%4==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(1);

    } else if (colorside[colorside.length-1]==0 && rotate%4==1){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(2);
    } else if (colorside[colorside.length-1]==0 && rotate%4==2){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(0);
    } else if (colorside[colorside.length-1]==0 && rotate%4==3){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(3);
    } else if (colorside[colorside.length-1]==1 && rotate%4==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(0);
    } else if (colorside[colorside.length-1]==1 && rotate%4==1){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(3);
    } else if (colorside[colorside.length-1]==1 && rotate%4==2){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(1);

    } else if (colorside[colorside.length-1]==1 && rotate%4==3){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(2);
    } else if (colorside[colorside.length-1]==2 && rotate%4==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(3);
    } else if (colorside[colorside.length-1]==2 && rotate%4==1){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(1);

    } else if (colorside[colorside.length-1]==2 && rotate%4==2){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(2);
    } else if (colorside[colorside.length-1]==2 && rotate%4==3){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(0);
    } else if (colorside[colorside.length-1]==3 && rotate%4==2){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(3);
    } else if (colorside[colorside.length-1]==3 && rotate%4==3){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(1);

    } else if (colorside[colorside.length-1]==3 && rotate%4==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(2);
    } else if (colorside[colorside.length-1]==3 && rotate%4==1){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(        
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    group.add( mesh );
    colorside.push(0);
    } 
    
    
    }
    
    var stats = new Stats();
    scene.userData.stats = stats;
    //window.addEventListener( 'resize', onWindowResize, false );
        scenes.push( scene );
} 



function movedog(){
    if(timeout>0){
    timeout=timeout-1;
    l=(l+1)%20;
    if (l==0){si=-si;}
    var rot = [0,si*math.pi/2, math.pi];
    var shi = [0,0,si*(l-10)];
    drawpath(thdog,'dog',0,rot,shi);
    content.removeChild(content.childNodes[1]);
    } else {
        clearInterval(ti);

    }
}


$("#addblock").click(function(){
    if (error>0){
        alert('Need to solve the collision first');
    } else {
    count=count+1;

    var vertices = [];
    var next = nextposition(x1,x2,x3,x4,x5,x6,0);
    x1 = next[0];
    x2 = next[1];
    x3 = next[2];
    x4 = next[3];
    x5 = next[4];
    x6 = next[5];
    vertices.push(
        new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
        new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
        new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
        new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
        new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
        new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) ),
    );

    // convex hull
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    scenes[1].children[1].children.push( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
    
    if (count%2==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
    } else {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );                  
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
    }
    
    error = collision(math.divide(math.add(x1,x3),2),math.subtract(x3,x5),math.subtract(x5,x4),vcenter,vin,vout);
    /*
    if (error==0){
    document.getElementById("p1").innerHTML = "No Collision, good to go!";
    document.getElementById("p1").style.color = "green";
    //
    score=score+1000;
    } else {
    document.getElementById("p1").innerHTML = "Warning!! Collision happens!!";
    document.getElementById("p1").style.color = "red";
    }
    */
    vcenter.push(math.divide(math.add(x1,x3),2));
    vin.push(math.subtract(x3,x5));
    vout.push(math.subtract(x5,x4));
    th.push(0);
    rotate=0;
    }
    //document.getElementById("ps").innerHTML = "Current score : "+ score.toString() + " / Life Remains : "+life.toString();
    //changerank();
    render();
}); 


$("#removeblock").click(function(){
if (count > 0 ) {
    count=count-1;
    scenes[1].children[1].children.pop( -1 );
    scenes[1].children[1].children.pop( -1 );
    scenes[1].children[1].children.pop( -1 );
    scenes[1].children[1].children.pop( -1 );
    vcenter.pop(-1);
    vin.pop(-1);
    vout.pop(-1);
    th.pop(-1);
    x1 = math.matrix([-0.5,  -0.5, -0.5]);
    x2 = math.matrix([0.5, 0.5, -0.5]);
    x3 = math.matrix([0.5, 0.5, 0.5]);
    x4 = math.matrix([-0.5, -0.5, 0.5]);
    x5 = math.matrix([0.5, -0.5, 0.5]);
    x6 = math.matrix([0.5, -0.5, -0.5]);
    for ( var i = 0; i < th.length; i ++ ) {
        var next = nextposition(x1,x2,x3,x4,x5,x6,th[i]*math.pi/2);
        x1 = next[0];
        x2 = next[1];
        x3 = next[2];
        x4 = next[3];
        x5 = next[4];
        x6 = next[5];
    }
    //document.getElementById("p1").innerHTML = "No Collision, good to go!";
    //document.getElementById("p1").style.color = "green";
    //document.getElementById("p2").innerHTML = "Current Length : "+ count.toString();
    error=0;
    //score = score-1000;
} else {
    alert ('No more block to remove');
}
    //document.getElementById("ps").innerHTML = "Current score : "+ score.toString() + " / Life Remains : "+life.toString();
    //changerank();
    render();
}); 


$("#rotateblock").click(function(){
if (count > 0 ) {
    scenes[1].children[1].children.pop( -1 );
    scenes[1].children[1].children.pop( -1 );
    scenes[1].children[1].children.pop( -1 );
    scenes[1].children[1].children.pop( -1 );
    vcenter.pop(-1);
    vin.pop(-1);
    vout.pop(-1);
    th.pop(-1);
    x1 = math.matrix([-0.5,  -0.5, -0.5]);
    x2 = math.matrix([0.5, 0.5, -0.5]);
    x3 = math.matrix([0.5, 0.5, 0.5]);
    x4 = math.matrix([-0.5, -0.5, 0.5]);
    x5 = math.matrix([0.5, -0.5, 0.5]);
    x6 = math.matrix([0.5, -0.5, -0.5]);
    for ( var i = 0; i < th.length; i ++ ) {
        var next = nextposition(x1,x2,x3,x4,x5,x6,th[i]*math.pi/2);
        x1 = next[0];
        x2 = next[1];
        x3 = next[2];
        x4 = next[3];
        x5 = next[4];
        x6 = next[5];
    }
    
    rotate = rotate+1;
    var vertices = [];
    next = nextposition(x1,x2,x3,x4,x5,x6,(rotate%4)*math.pi/2);
    x1 = next[0];
    x2 = next[1];
    x3 = next[2];
    x4 = next[3];
    x5 = next[4];
    x6 = next[5];

    vertices.push(
        new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
        new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2)) ),
        new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
        new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
        new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) ),
        new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) ),
    );

    error = collision(math.divide(math.add(x1,x3),2),math.subtract(x3,x5),math.subtract(x5,x4),vcenter,vin,vout);
    /*
    if (error==0){
    document.getElementById("p1").innerHTML = "No Collision, good to go!";
    document.getElementById("p1").style.color = "green";
    } else {
    document.getElementById("p1").innerHTML = "Warning!! Collision happens!!";
    document.getElementById("p1").style.color = "red";
    }
    */
    vcenter.push(math.divide(math.add(x1,x3),2));
    vin.push(math.subtract(x3,x5));
    vout.push(math.subtract(x5,x4));
    th.push(rotate%4);

    // convex hull
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
        opacity: 0.5,
        transparent: false
    } );
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    scenes[1].children[1].children.push( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
    
    if (count%2==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2))),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2))),
    new THREE.Vector3( x6.subset(math.index(0)), x6.subset(math.index(1)), x6.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)) ),
    new THREE.Vector3( x5.subset(math.index(0)), x5.subset(math.index(1)), x5.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
    } else {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );                  
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x2.subset(math.index(0)), x2.subset(math.index(1)), x2.subset(math.index(2))),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) )
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
                
    var meshGeometry = new THREE.Geometry();
    meshGeometry.vertices.push(                
    new THREE.Vector3( x1.subset(math.index(0)), x1.subset(math.index(1)), x1.subset(math.index(2)) ),
    new THREE.Vector3( x3.subset(math.index(0)), x3.subset(math.index(1)), x3.subset(math.index(2)) ),
    new THREE.Vector3( x4.subset(math.index(0)), x4.subset(math.index(1)), x4.subset(math.index(2)))
    );
    meshGeometry.faces.push( new THREE.Face3( 2, 1, 0 ) );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    //mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 1;
    scenes[1].children[1].children.push( mesh );
    }
    //score=score-50;
} else {
    alert ('Initial block doesn\'t rotate');
}
    //document.getElementById("ps").innerHTML = "Current score : "+ score.toString() + " / Life Remains : "+life.toString();
    //changerank();
    render();
}); 

var arraynum=0;
$("#next").click(function(){
    var array = ["Magic Snake consists of basic blocks.", 
                "A basic block is half a cube", 
                 "Normally, a Magic snake toy is like a straight ruler.",
                 "You can rotate between blocks to form different shapes",
                 "Some random shapes",
                 "A lobster",
                 "A racing car",
                 "Or a little dog",
                 "Sometimes, you can build a loop by connecting the first and the last cube.",
                 "Like this",
                 "Or this",
                 "A Möbius strip is a surface with only one side and only one boundary.",
                "Why do I mention a Möbius strip",
                "Assuming an ant is marching on one of the surface of Magic Snake like this",
                 "Or this",
                 "What if a Magic Snake forms a loop?",
                 "Sometimes, the ant will go back to the first block with same surface.",
                 "Sometimes, it won't",
                 "Then it forms a Möbius strip",
                 "Now it's time for you to build a happy dog",
                 "Can you make it?"
                 
                 
                 
    ]
    document.getElementById("p1").innerHTML = array[arraynum];
    arraynum=arraynum+1;
    if (arraynum==1){
        drawpath([],'basic block',0,[0,0,0],[0,0,0])
    }else if (arraynum==2){
        drawcube();
    }else if (arraynum==3){
        drawpath([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],'ruler',0,[0,0,0],[0,0,0]);
        content.removeChild(content.childNodes[1]);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==5){
        drawpath([0,0,0,0,0,1,0,0,0,0,2,0,0,0,0],'shape',0,[0,0,0],[0,0,0]);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==6){
        drawpath(thlobster,'lobster',0,[math.pi/2,math.pi, math.pi/2],[0,0,0]);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==7){
        drawpath(thracingcar,'racing car',0,[math.pi/2,math.pi, math.pi/2],[0,0,0]);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==8){
        drawpath(thdog,'dog',0,[0,math.pi/2, math.pi],[0,0,0]);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==10){
        drawpath([2,2,2],'loop',0,[0,0, 0],[0,0,0]);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==11){
        drawpath([2,0,0,2,0,0,2,0,0,2,0],'loop',0,[0,0, 0],[0,0,0]);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==12){
        drawmobius();
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==14){
        drawthmobius([0,0,0,0,0,0],1);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==15){
        drawthmobius([0,0,0,0,0,0],2);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==17){
        drawthmobius([2,0,0,2,0,0,2,0,0,2,0],2);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==18){
        drawthmobius([0,1,3,1,2,0,2,1,3],2);
        content.removeChild(content.childNodes[1]);
    }else if (arraynum==20){
        addtime();
    }else if (arraynum==21){
        clearInterval(ti);
        window.location.href='../Magic-Snake-dog4/index.html';
    }

}); 
