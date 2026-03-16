varying vec2 vUv;
varying float vNoise;
uniform float uTime;
uniform sampler2D uTexture;



void main() {

    vec4 color = texture2D(uTexture,vUv);
    color.rgb+=vNoise*.3;
    gl_FragColor = color;
}