varying vec2 vUv;

void main() {
    // gl_FragColor = vec4(vUv.x, vUv.y, 1., 1.);
    gl_FragColor = vec4(vUv.xy, 1., 1.);

}