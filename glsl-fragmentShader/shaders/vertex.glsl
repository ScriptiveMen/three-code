uniform float uTime;
varying vec2 vUv;

void main() {
    vUv=uv;
    vec4 modelPosition=modelMatrix*vec4(position,1.);

    modelPosition.z +=0.5+ sin(modelPosition.x * 4.3 + modelPosition.y *3.8 + uTime) * 0.1;

    vec4 viewPosition=viewMatrix*modelPosition;
    vec4 projectedPosition=projectionMatrix*viewPosition;

    gl_Position=projectedPosition;
}
