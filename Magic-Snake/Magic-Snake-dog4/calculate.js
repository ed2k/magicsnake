/*
function rot3 performs a rotation of a point in 3D space around a specified axis.
arguments: 
  x (the point to be rotated), 
  origin (the point of rotation), 
  direction (the axis of rotation), 
  theta (the angle of rotation in radians).

The first line inside the function normalizes the direction vector by dividing it by its norm (length). This ensures that the direction vector has a length of 1, which is a requirement for it to represent an axis of rotation.

The next three lines extract the individual components of the direction vector (i.e., its x, y, and z coordinates) and store them in d1, d2, and d3 respectively.

The variable w is then defined as a skew-symmetric matrix derived from the direction vector. This matrix is used in the computation of the rotation matrix.

The rotmatr variable is the rotation matrix. It's computed using the Rodrigues' rotation formula, which is a method for rotating a vector in three-dimensional space. The formula combines the identity matrix, the skew-symmetric matrix w, and the square of w, all scaled by various functions of the rotation angle theta.

Finally, the function returns the rotated point. This is calculated by subtracting the origin from the point x, multiplying the result by the transpose of the rotation matrix, and then adding the origin back. The subtraction and addition of the origin are done to perform the rotation around the origin point, rather than around the coordinate system's origin (0,0,0).
*/
function rot3(x, origin, direction, theta) {
    direction = math.divide(direction,math.norm(direction));
    var d1 = direction.subset(math.index(0));
    var d2 = direction.subset(math.index(1));
    var d3 = direction.subset(math.index(2));
    var w = math.matrix([[0, -d3, d2],[d3, 0, -d1],[-d2, d1, 0]]);
    var rotmatr = math.add(math.add( math.identity(3) , math.multiply(math.sin(theta),w) ), math.multiply(2*math.sin(theta/2)*math.sin(theta/2),math.multiply(w,w)));
    return math.add(math.multiply(math.subtract(x,origin),math.transpose(rotmatr)) , origin)
}

/*
function nextposition that calculates the next positions of six points in 3D space after a rotation. The function takes seven arguments: x1 to x6 (the current positions of the six points) and th (the angle of rotation).

The first six lines inside the function calculate the next positions of the six points without considering the rotation. The new positions x1n to x6n are calculated based on the current positions of the points.

The variables ax1 and ax2 are then defined as the averages of certain pairs of points. These variables represent the axes around which the points will be rotated.

The variable dir is defined as the difference between x5 and x4. This variable represents the direction of the rotation.

The next six lines calculate the final positions of the six points after the rotation. This is done by calling the rot3 function, which performs a rotation of a point in 3D space around a specified axis. The rot3 function takes four arguments: the point to be rotated, the point of rotation (the axis), the direction of rotation, and the angle of rotation.

Finally, the function returns an array containing the final positions of the six points. The rot3 function is assumed to return a point in 3D space, so the returned array is an array of points.
*/
function nextposition(x1,x2,x3,x4,x5,x6,th) {
    var x1n = x5;
    var x2n = math.subtract(math.add(x3,x5),x4);
    var x3n = math.subtract(math.add(x2,x6),x1);
    var x4n = x6;
    var x5n = x2;
    var x6n = x3;
    var ax1 = math.divide(math.add(x2,x5),2);
    var ax2 = math.subtract(math.add(ax1,x5),x4);
    var dir = math.subtract(x5,x4);
    x1nn = rot3(x1n,ax1,dir,th);
    x4nn = rot3(x4n,ax1,dir,th);
    x5nn = rot3(x5n,ax1,dir,th);
    x6nn = rot3(x6n,ax1,dir,th);
    x2nn = rot3(x2n,ax2,dir,th);
    x3nn = rot3(x3n,ax2,dir,th);
    return [x1nn, x2nn, x3nn, x4nn, x5nn, x6nn];
}

/*
function collision that checks for collisions between objects in a 3D space. The function takes six arguments: xcenter, xin, xout, vcenter, vin, vout. These arguments represent the center, incoming direction, and outgoing direction of two objects, respectively.

The function initializes two variables, k and err, to 0. k is used to count the number of times the center of the first object matches the center of any object in the vcenter array. err is used to count the number of errors, which occur when the incoming and outgoing directions of the first object do not match the outgoing and incoming directions of the other object, respectively.

The function then enters a loop that iterates over the vcenter array. For each object in the array, it checks if the rounded coordinates of its center match the rounded coordinates of the center of the first object. If they do, it increments k by 1.

Next, it checks if the rounded coordinates of the incoming and outgoing directions of the first object match the rounded coordinates of the outgoing and incoming directions of the other object, respectively. If they do, it continues to the next iteration of the loop. If they don't, it checks if the rounded coordinates of the incoming and outgoing directions of the first object are the negatives of the rounded coordinates of the incoming and outgoing directions of the other object, respectively. If they are, it continues to the next iteration of the loop. If they aren't, it increments err by 1 and breaks out of the loop.

After the loop, if k is greater than 1, it increments err by 1. This is because if the center of the first object matches the center of more than one object in the vcenter array, it's considered an error.

Finally, the function returns the number of errors. This can be used to determine if a collision has occurred. If err is 0, no collision has occurred. If err is greater than 0, a collision has occurred.
*/
function collision(xcenter,xin,xout,vcenter,vin,vout) {
    var k=0;
    var err=0;
    for (i=0; i<vcenter.length; i++) {
        if (Math.round(xcenter.subset(math.index(0)))==Math.round(vcenter[i].subset(math.index(0))) && Math.round(xcenter.subset(math.index(1)))==Math.round(vcenter[i].subset(math.index(1))) && Math.round(xcenter.subset(math.index(2)))==Math.round(vcenter[i].subset(math.index(2)))) {
            k=k+1;
            if (Math.round(xin.subset(math.index(0)))==Math.round(vout[i].subset(math.index(0))) && Math.round(xin.subset(math.index(1)))==Math.round(vout[i].subset(math.index(1))) && Math.round(xin.subset(math.index(2)))==Math.round(vout[i].subset(math.index(2))) && Math.round(xout.subset(math.index(0)))==Math.round(vin[i].subset(math.index(0))) && Math.round(xout.subset(math.index(1)))==Math.round(vin[i].subset(math.index(1))) && Math.round(xout.subset(math.index(2)))==Math.round(vin[i].subset(math.index(2)))) {
                continue;
            } else if (Math.round(xin.subset(math.index(0)))==-Math.round(vin[i].subset(math.index(0))) && Math.round(xin.subset(math.index(1)))==-Math.round(vin[i].subset(math.index(1))) && Math.round(xin.subset(math.index(2)))==-Math.round(vin[i].subset(math.index(2))) && Math.round(xout.subset(math.index(0)))==-Math.round(vout[i].subset(math.index(0))) && Math.round(xout.subset(math.index(1)))==-Math.round(vout[i].subset(math.index(1))) && Math.round(xout.subset(math.index(2)))==-Math.round(vout[i].subset(math.index(2)))) {
                continue;
            } else {
                err = err+1;
                break;
            }
        }
    }
    if (k>1) {
        err = err+1;
    }
    
    return err;
}

/*
function rotshi that performs a rotation and shift (translation) of a point in 3D space. The function takes three arguments: x (the point to be rotated and shifted), rot (the rotation angles around the x, y, and z axes), and shi (the shift along the x, y, and z axes).

The first six lines inside the function extract the individual components of the rot and shi arrays. alpha, beta, and gamma are the rotation angles around the x, y, and z axes respectively, and tx, ty, and tz are the shifts along the x, y, and z axes respectively.

The variables Rx, Ry, and Rz are 4x4 rotation matrices around the x, y, and z axes respectively. These matrices are used to rotate the point x around the three axes.

The variable t is a 4x4 translation matrix that is used to shift the point x along the three axes.

The variable xtmp is a 4x1 matrix that represents the point x in homogeneous coordinates, which is a way of representing 3D points in a 4D space to allow for translations to be represented as matrix multiplications, just like rotations.

The variable xresult is the result of applying the rotation and translation to the point x. This is done by multiplying the matrices t, Rx, Ry, Rz, and xtmp in that order. The multiplication is done from right to left, which means that the rotations are applied first, and then the translation.

Finally, the function returns the rotated and shifted point as a 3x1 matrix. The _data property of the xresult matrix is accessed to extract the x, y, and z coordinates of the point.
*/
function rotshi(x, rot, shi) {
    var alpha = rot[0];
    var beta = rot[1];
    var gamma = rot[2];
    var tx = shi[0];
    var ty = shi[1];
    var tz = shi[2];
    
    var Rx = math.matrix([[1,0,0,0],[0, math.cos(alpha), -math.sin(alpha), 0],[0, math.sin(alpha), math.cos(alpha), 0],[0, 0, 0, 1]]);
    var Ry = math.matrix([[math.cos(beta), 0 ,math.sin(beta), 0],[0, 1, 0, 0],[-math.sin(beta), 0, math.cos(beta), 0],[0, 0, 0, 1]]);
    var Rz = math.matrix([[math.cos(gamma), -math.sin(gamma), 0, 0],[math.sin(gamma), math.cos(gamma), 0, 0],[0, 0, 1, 0],[0, 0, 0, 1]]);
    
    var t = ([[1, 0, 0, tx],[0, 1, 0, ty],[0, 0, 1, tz],[0, 0, 0, 1]]);
    
    var xtmp = math.matrix([[x.subset(math.index(0))],[x.subset(math.index(1))],[x.subset(math.index(2))],[1]]);
    var xresult=math.transpose(math.multiply(math.multiply(math.multiply(math.multiply(t,Rx),Ry),Rz),xtmp));
    
    return math.matrix([xresult._data[0][0],xresult._data[0][1],xresult._data[0][2]])
    
}
