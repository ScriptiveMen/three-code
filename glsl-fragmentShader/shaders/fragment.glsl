varying vec2 vUv;
uniform float uTime;

void main() {


  float val= clamp(-1.,1.,vUv.x);

    gl_FragColor = vec4(val,val,val,1.);

}