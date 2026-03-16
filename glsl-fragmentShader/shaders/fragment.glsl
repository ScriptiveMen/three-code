varying vec2 vUv;
uniform float uTime;

void main() {


    vec4 c1 = vec4(0.1686, 0.251, 0.8863, 1.0);
    vec4 c2 = vec4(0.8941, 0.8706, 0.1843, 1.0);

    float num = step(.5, vUv.y);

    vec4 final = mix(c1, c2, num);

    gl_FragColor = final;

}