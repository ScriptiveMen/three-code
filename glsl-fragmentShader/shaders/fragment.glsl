varying vec2 vUv;
uniform float uTime;

void main() {

    vec4 colour1 = vec4(0.6078, 0.3294, 0.9255, 1.0);
    vec4 colour2 = vec4(0.1451, 0.3451, 0.7451, 1.0);
    vec4 colour3 = vec4(0.651, 0.4039, 0.9725, 1.0);
    vec4 colour4 = vec4(0.9373, 0.2902, 0.5294, 1.0);

    vec4 colour5 = mix(colour1,colour2,vUv.x*sin(uTime));
    vec4 colour6 = mix(colour3,colour4,vUv.x*sin(uTime));

    vec4 final = mix(colour5, colour6, vUv.y*cos(uTime)*.2);

    gl_FragColor = final;

}