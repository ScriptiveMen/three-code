uniform float uTime;

void main() {
    vec3 pos = position;
    pos.x = 5. * sin(pos.y*0.4+uTime);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
