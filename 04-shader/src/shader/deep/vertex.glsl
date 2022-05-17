attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

precision lowp float;

void main() {
    vec4 modelPostition = modelMatrix *  vec4(position,1);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelPostition;
}
