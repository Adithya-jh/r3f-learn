import { Effect } from "postprocessing";

import { Uniform } from "three";

const fragmentShader = /*glsl*/ `
    uniform float frequency;
    uniform float amplitude;
    uniform float offset;


    void mainUv(inout vec2 uv){
        uv.y += sin(uv.x*frequency+ offset) * amplitude;
    }

    void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){
        vec4 color = inputColor; 
        color.rgb *= vec3(1.0,1.0,1.0);
        outputColor=color;
        // outputColor=vec4(uv,1.0,1.0);

    }
`;

export default class extends Effect {
  constructor({ frequeny, amplitude }) {
    super("DrunkEffect", fragmentShader, {
      uniforms: new Map([
        ["frequency", { value: frequeny }],
        ["amplitude", { value: amplitude }],
        ["offset", new Uniform(0)],
      ]),
    }); //calling parent class constructor
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get("offset").value += deltaTime;
  }
}
