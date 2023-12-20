import { Injectable } from '@angular/core';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { env } from 'onnxruntime-web';

env.wasm.wasmPaths = {
  'ort-wasm.wasm': '/assets/onnx-wasm/ort-wasm.wasm',
  'ort-wasm-simd.wasm': '/assets/onnx-wasm/ort-wasm-simd.wasm',
  'ort-wasm-threaded.wasm': '/assets/onnx-wasm/ort-wasm-threaded.wasm',
  // Add other WASM files as needed
};


@Injectable({
  providedIn: 'root'
})
export class OnnxModelService {

  session: InferenceSession;

  constructor() {

  }

  async predict(Age: number, Heightin: number, Weightlbs: number, Gender: number) {
    const url = "assets/onnx_models/wams-hip-1.onnx";
    this.session = await InferenceSession.create(url);


     // feed inputs and run

    // use the following in an async method
    const input = new Tensor(new Float32Array([Age, Heightin, Weightlbs, Gender]) as Tensor.DataTypeMap['float32'], [1, 4]);
    const outputMap = await this.session.run({X: input});
    return outputMap['variable'].data[0]
    // const outputTensor = outputMap.values().next().value;
    // const predictions = outputTensor.data;
    // console.log(predictions);
  }
}
