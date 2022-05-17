attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;
varying float vElevation;

// 获取事件
uniform float uTime;

precision lowp float;

void main() {
    vUv = uv;
    vec4 modelPostition = modelMatrix *  vec4(position,1);
//    modelPostition.x += 1.0;
//    modelPostition.z += 1.0;

//    modelPostition.z += modelPostition.x;

    modelPostition.z = sin((modelPostition.x+uTime) * 10.0) * 0.05;
    modelPostition.z += sin((modelPostition.y+uTime) * 10.0) * 0.05;

    vElevation = modelPostition.z;
    gl_Position = projectionMatrix * viewMatrix * modelPostition;
}
