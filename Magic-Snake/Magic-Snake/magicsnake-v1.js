if ( ! Detector.webgl ) Detector.addGetWebGLMessage()

var rankstatus=0;
var score = 0;
var highscore = 0;
var posting;
var username;                
var x1 = math.matrix([-0.5,  -0.5, -0.5]);
var x2 = math.matrix([0.5, 0.5, -0.5]);
var x3 = math.matrix([0.5, 0.5, 0.5]);
var x4 = math.matrix([-0.5, -0.5, 0.5]);
var x5 = math.matrix([0.5, -0.5, 0.5]);
var x6 = math.matrix([0.5, -0.5, -0.5]);
var sphereradius = 5;
var error=0;
var th = [];
var vcenter = [];
var vin = [];
var vout = [];
var count=0;
var rotate=0;
var life=10;

var lines;
            
var group, camera, scene, renderer;
//readrecord();
init();
animate();

function init() {
    changerank();
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    // camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 15, 20, 30 );
    scene.add( camera );
    // controls
                
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.enableKeys;
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI ;

    scene.add( new THREE.AmbientLight( 0x222222 ) );
    // light
    var light = new THREE.PointLight( 0xffffff, 1 );
    camera.add( light );
    // helper
    //scene.add( new THREE.AxesHelper( 20 ) );
    // textures
    var loader = new THREE.TextureLoader();
    group = new THREE.Group();
    group2 = new THREE.Group();
    scene.add( group );
    scene.add(group2);
    // points
    var vertices = [];
    vertices.push(
    new THREE.Vector3( -0.5,  -0.5, -0.5 ),
    new THREE.Vector3( 0.5, 0.5, -0.5 ),
    new THREE.Vector3(  0.5, 0.5, 0.5 ),
    new THREE.Vector3(-0.5, -0.5, 0.5),
    new THREE.Vector3( 0.5, -0.5, 0.5),
    new THREE.Vector3(0.5, -0.5, -0.5)
    );
    vcenter.push(math.divide(math.add(x1,x3),2));
    vin.push(math.subtract(x3,x5));
    vout.push(math.subtract(x5,x4));
    
    var spheregeometry = new THREE.SphereBufferGeometry(sphereradius, 48, 24);
    
    /*
    var material = new THREE.MeshStandardMaterial();
    material.roughness = 0.5 * Math.random() + 0.25;
    material.metalness = 0;
    material.color.setHSL( Math.random(), 1.0, 0.3 );
    material.transparent = true;
    */
    
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
       // color: 0x0080ff,
        opacity: 0.5,
        transparent: true
    } );
    
    var mesh = new THREE.Mesh( spheregeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group2.add( mesh );
    
    //var vertices = new THREE.DodecahedronGeometry( 10 ).vertices;
    for ( var i = 0; i < vertices.length; i ++ ) {
    //vertices[ i ].add( randomPoint().multiplyScalar( 2 ) ); // wiggle the points
    }
    var pointsMaterial = new THREE.PointsMaterial( {
        color: 0x0080ff,
        size: 0,
        alphaTest: 0.5
    } );
    var pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );
    var points = new THREE.Points( pointsGeometry, pointsMaterial );
    group.add( points );
    // convex hull
    var meshMaterial = new THREE.MeshLambertMaterial( {
    //color: 0xffffff,
        color: 0x0080ff,
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
    //
    rotate=0;
    //document.getElementById("restart").style.visibility="hidden";
    window.addEventListener( 'resize', onWindowResize, false );
    }
function randomPoint() {
    return new THREE.Vector3( THREE.Math.randFloat( - 1, 1 ), THREE.Math.randFloat( - 1, 1 ), THREE.Math.randFloat( - 1, 1 ) );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    //group.rotation.y += 0.005;
    render();
}
function render() {
    renderer.render( scene, camera );
}

 

$("#addblock").click(function(){
    if (error>0){
        alert('Need to solve the collision first,\n'+ 'life -1');
        if (life>1) {
        life=life-1;
        //document.getElementById("p3").innerHTML = "Life Remains : "+life.toString();
        } else {
            alert('Game Over\n'+'Your final score is : '+highscore.toString());
            window.location.href = "leaderboard.html"

        }
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

    var pointsMaterial = new THREE.PointsMaterial( {
        color: 0x0080ff,
        size: 0,
        alphaTest: 0.5
    } );

    var pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );
    var points = new THREE.Points( pointsGeometry, pointsMaterial );
    group.add( points );
    // convex hull
    if (count%2==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {

        //color: 0xffffff,
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
        } );
    } else {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
        } );                    
    }
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
    for (i=0;i<6;i++) {
        if ((next[i].subset(math.index(0)))*(next[i].subset(math.index(0)))+(next[i].subset(math.index(1)))*(next[i].subset(math.index(1)))+(next[i].subset(math.index(2)))*(next[i].subset(math.index(2))) > (sphereradius)*(sphereradius)) {
            alert("Out of boundary!");
            error=1;
            break;
        }
    }
    error = collision(math.divide(math.add(x1,x3),2),math.subtract(x3,x5),math.subtract(x5,x4),vcenter,vin,vout) + error;
    if (error==0){
    document.getElementById("p1").innerHTML = "No Collision, good to go!";
    document.getElementById("p1").style.color = "green";
    //
    //document.getElementById("p2").innerHTML = "Current Length : "+ count.toString();
    score=score+1000;
    } else {
    document.getElementById("p1").innerHTML = "Warning!! Collision happens!!";
    document.getElementById("p1").style.color = "red";
    }
    vcenter.push(math.divide(math.add(x1,x3),2));
    vin.push(math.subtract(x3,x5));
    vout.push(math.subtract(x5,x4));
    th.push(0);
    rotate=0;
    }
    document.getElementById("ps").innerHTML = "Current score : "+ score.toString() + " / Life Remains : "+life.toString();
    changerank();
}); 

$("#removeblock").click(function(){
if (count > 0 ) {
    count=count-1;
    group.remove(group.children[group.children.length-1]);
    group.remove(group.children[group.children.length-1]);
    group.remove(group.children[group.children.length-1]);
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
    document.getElementById("p1").innerHTML = "No Collision, good to go!";
    document.getElementById("p1").style.color = "green";
    //document.getElementById("p2").innerHTML = "Current Length : "+ count.toString();
    error=0;
    score = score-1000;
} else {
    alert ('No more block to remove');
}
    document.getElementById("ps").innerHTML = "Current score : "+ score.toString() + " / Life Remains : "+life.toString();
    changerank();
}); 


$("#rotateblock").click(function(){
if (count > 0 ) {
    group.remove(group.children[group.children.length-1]);
    group.remove(group.children[group.children.length-1]);
    group.remove(group.children[group.children.length-1]);
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
    for (i=0;i<6;i++) {
        if ((next[i].subset(math.index(0)))*(next[i].subset(math.index(0)))+(next[i].subset(math.index(1)))*(next[i].subset(math.index(1)))+(next[i].subset(math.index(2)))*(next[i].subset(math.index(2))) > (sphereradius)*(sphereradius)) {
            //alert("Out of boundary!");
            error=1;
            break;
        } else {
            error=0;
        }
    }
    error = collision(math.divide(math.add(x1,x3),2),math.subtract(x3,x5),math.subtract(x5,x4),vcenter,vin,vout) + error;
    if (error==0){
    document.getElementById("p1").innerHTML = "No Collision, good to go!";
    document.getElementById("p1").style.color = "green";
    } else {
    document.getElementById("p1").innerHTML = "Warning!! Collision happens!!";
    document.getElementById("p1").style.color = "red";
    }
    vcenter.push(math.divide(math.add(x1,x3),2));
    vin.push(math.subtract(x3,x5));
    vout.push(math.subtract(x5,x4));
    th.push(rotate%4);

    var pointsMaterial = new THREE.PointsMaterial( {
        color: 0x0080ff,
        size: 0,
        alphaTest: 0.5
    } );

    var pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );
    var points = new THREE.Points( pointsGeometry, pointsMaterial );
    group.add( points );
    // convex hull
    if (count%2==0){
    var meshMaterial = new THREE.MeshLambertMaterial( {
        //color: 0xffffff,
        color: 0x0080ff,
        opacity: 0.5,
        transparent: false
    } );
    } else {
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xff0000,
        opacity: 0.5,
        transparent: false
    } );                    
    }
    var meshGeometry = new THREE.ConvexBufferGeometry( vertices );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group.add( mesh );
    var mesh = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
    mesh.material.side = THREE.FrontSide; // front faces
    mesh.renderOrder = 1;
    group.add( mesh );
    score=score-50;
} else {
    alert ('Initial block doesn\'t rotate');
}
    document.getElementById("ps").innerHTML = "Current score : "+ score.toString() + " / Life Remains : "+life.toString();
    changerank();
}); 

function changeradius() {
    //document.getElementById("sradius").value=$("#sradius").val();
    x1 = math.matrix([-0.5,  -0.5, -0.5]);
    x2 = math.matrix([0.5, 0.5, -0.5]);
    x3 = math.matrix([0.5, 0.5, 0.5]);
    x4 = math.matrix([-0.5, -0.5, 0.5]);
    x5 = math.matrix([0.5, -0.5, 0.5]);
    x6 = math.matrix([0.5, -0.5, -0.5]);
    //sphereradius = Number($("#sradius").val());
    error=0;
    th = [];
    vcenter = [];
    vin = [];
    vout = [];
    count=0;
    rotate=0;
    vcenter.push(math.divide(math.add(x1,x3),2));
    vin.push(math.subtract(x3,x5));
    vout.push(math.subtract(x5,x4));
    //document.getElementById("p2").innerHTML = "Current Length : "+ count.toString();
    var spheregeometry = new THREE.SphereBufferGeometry(sphereradius, 48, 24);
    
    var meshMaterial = new THREE.MeshLambertMaterial( {
        color: 0xffffff,
       // color: 0x0080ff,
        opacity: 0.5,
        transparent: true
    } );
    
    var mesh = new THREE.Mesh( spheregeometry, meshMaterial );
    mesh.material.side = THREE.BackSide; // back faces
    mesh.renderOrder = 0;
    group2.add( mesh );
    group2.remove(group2.children[0]);
    while (group.children.length>3){
        group.remove(group.children[group.children.length-1]);
    }
}

function playername() {
    var txt;
    var person = prompt("Please tell us your name:", "Player");
    if (person == null || person == "") {
        txt = "Hello ! Let's play Magic Snake!";
        person = "Player";
    } else {
        txt = "Hello " + person + "! Let's play Magic Snake!";
    }
    username = person;
    document.getElementById("p1").innerHTML = txt;
}


function keeprecord() {
    posting = $.post("record.php", {records: lines}, "json");
	
	posting.done(function(data){
        console.log(username);
	})
}

var allText;

function readrecord()
{
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "tmp/record.txt", true);
txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
    if (txtFile.status === 200) {  // Makes sure it's found the file.
        allText = txtFile.responseText;
        lines = txtFile.responseText.split("\n"); // Will separate each line into an array
        lines = [lines[0],Number(lines[1]),lines[2],Number(lines[3]),lines[4],Number(lines[5])];
        document.getElementById("pr1").innerHTML = "1 : "+ lines[0] + "  " + lines[1];
        document.getElementById("pr2").innerHTML = "2 : "+ lines[2] + "  " + lines[3];
        document.getElementById("pr3").innerHTML = "3 : "+ lines[4] + "  " + lines[5];   
    }
    }
    }
   
    txtFile.send(null);
   
}


function changerank() {
    if (score>highscore) {
        highscore = score;
    }
    posting = $.post("readrec.php",{test:"test"},"json");
    posting.done(function(data){
        lines = data.split("\n");
        lines.pop(-1);
    var s1 = Number(lines[1]);
    var s2 = Number(lines[3]);
    var s3 = Number(lines[5]);
    var u1 = lines[0].replace(/(\r\n\t|\n|\r\t)/gm,"");
    var u2 = lines[2].replace(/(\r\n\t|\n|\r\t)/gm,"");
    var u3 = lines[4].replace(/(\r\n\t|\n|\r\t)/gm,"");
    
    
    if (highscore>s1 && (rankstatus==0 || rankstatus==3)) {
        lines = [username,highscore,u1,s1,u2,s2];
        rankstatus=1;
        keeprecord();
    } else if (highscore>=s2 && highscore<=s1 && (rankstatus==0 || rankstatus==3)) {
        lines = [u1,s1,username,highscore,u2,s2];
        rankstatus=2;
        keeprecord();
    } else if (highscore>s3 && highscore<s2) {
        lines = [u1,s1,u2,s2,username,highscore];
        rankstatus=3;
        keeprecord();
    } else if (highscore>=s1 && rankstatus==1) {
        lines = [username,highscore,u2,s2,u3,s3];
        keeprecord();
    } else if (highscore>=s2 && highscore<=s1 && rankstatus==2) {
        lines = [u1,s1,username,highscore,u3,s3];
        keeprecord();
    } else if (highscore>s1 && rankstatus==2) {
        lines = [username,highscore,u1,s1,u3,s3];
        rankstatus=1;
        keeprecord();
    } else if (highscore>=s2 && highscore<s1 && rankstatus==1) {
        lines = [u1,s1,username,highscore,u2,s2];
        rankstatus=2;
        keeprecord();
    }
    //console.log(lines);
    //document.getElementById("pr1").innerHTML = "1 : "+ lines[0] + "  " + lines[1].toString();
    //document.getElementById("pr2").innerHTML = "2 : "+ lines[2] + "  " + lines[3].toString();
    //document.getElementById("pr3").innerHTML = "3 : "+ lines[4] + "  " + lines[5].toString();
    })
}

function showrank() {
    posting = $.post("readrec.php",{test:"test"},"json");
    posting.done(function(data){
        lines = data.split("\n");
        lines.pop(-1);
        document.getElementById("p1").innerHTML = "All Time Leader";
        document.getElementById("p1").style.color = "red";
        document.getElementById("ps").innerHTML = "1 : "+ lines[0] + "  " + lines[1];
        document.getElementById("ps").style.color = "green";
        document.getElementById("p2").innerHTML = "2 : "+ lines[2] + "  " + lines[3];
        document.getElementById("p2").style.color = "green";
        document.getElementById("p3").innerHTML = "3 : "+ lines[4] + "  " + lines[5];
        document.getElementById("p3").style.color = "green";
    })
}

$("#restart").click(function(){
    rankstatus=0;
    score = 0;
    highscore = 0;             
    x1 = math.matrix([-0.5,  -0.5, -0.5]);
    x2 = math.matrix([0.5, 0.5, -0.5]);
    x3 = math.matrix([0.5, 0.5, 0.5]);
    x4 = math.matrix([-0.5, -0.5, 0.5]);
    x5 = math.matrix([0.5, -0.5, 0.5]);
    x6 = math.matrix([0.5, -0.5, -0.5]);
    error=0;
    th = [];
    vcenter = [];
    vin = [];
    vout = [];
    count=0;
    rotate=0;
    life=10;
    while (group.children.length>3) {
         group.remove(group.children[group.children.length-1]);
    }
    document.getElementById("addblock").style.visibility="visible";
    document.getElementById("removeblock").style.visibility="visible";
    document.getElementById("rotateblock").style.visibility="visible";
    document.getElementById("restart").style.visibility="hidden";
    document.getElementById("p1").innerHTML = "Hello " + username + "! Let's play Magic Snake!";
    document.getElementById("p1").style.color = "yellow";
    document.getElementById("ps").innerHTML = "Current score : "+ score.toString();
    document.getElementById("ps").style.color = "white";
    document.getElementById("p2").innerHTML = "Current Length : "+ count.toString();
    document.getElementById("p2").style.color = "white";
    document.getElementById("p3").innerHTML = "Life Remains : "+life.toString();
    document.getElementById("p3").style.color = "white";
}); 
