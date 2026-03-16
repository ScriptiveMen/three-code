varying vec2 vUv;
uniform float uTime;
varying float noise;

void main() {

    vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    color.rgb+=noise;
    gl_FragColor = color;

}