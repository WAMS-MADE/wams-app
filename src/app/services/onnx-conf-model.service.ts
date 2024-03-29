import { Injectable } from '@angular/core';
import { InferenceSession, Tensor } from 'onnxruntime-web';
import { env } from 'onnxruntime-web';
import { MODELMAPS, ModelType } from './model_mapping';

env.wasm.wasmPaths = {
  'ort-wasm.wasm': 'assets/onnx-wasm/ort-wasm.wasm',
  'ort-wasm-simd.wasm': 'assets/onnx-wasm/ort-wasm-simd.wasm',
  'ort-wasm-threaded.wasm': 'assets/onnx-wasm/ort-wasm-threaded.wasm',
  // Add other WASM files as needed
};


@Injectable({
  providedIn: 'root'
})
export class OnnxConfModelService {

  session: InferenceSession;

  constructor() {
  }

  async getConfidenceModelURLs(bodyPart: string) {
    const urls = MODELMAPS[bodyPart as keyof typeof MODELMAPS] as ModelType;
    return urls;
  }

  async predictConfidence(url: string, Age: number, Heightin: number, Weightlbs: number, Gender: number) {
    this.session = await InferenceSession.create(url);
    const input = new Tensor(new Float32Array([Heightin, Weightlbs, Age, Gender]) as Tensor.DataTypeMap['float32'], [1, 4]);
    const outputMap = await this.session.run({X: input});
    return outputMap['variable'].data[0]
  }




  async predictBase(Age: number, Heightin: number, Weightlbs: number, Gender: number) {
    const url = "assets/confidence_models/lightgbm_model_1-2-2024_0.5.onnx";
    this.session = await InferenceSession.create(url);

    const input = new Tensor(new Float32Array([Heightin, Weightlbs, Age, Gender]) as Tensor.DataTypeMap['float32'], [1, 4]);
    const outputMap = await this.session.run({X: input});
    return outputMap['variable'].data[0]
  }


  async predict10PercentQuantile(Age: number, Heightin: number, Weightlbs: number, Gender: number) {
    const url = "assets/confidence_models/lightgbm_model_1-2-2024_0.1.onnx";
    this.session = await InferenceSession.create(url);

    const input = new Tensor(new Float32Array([Heightin, Weightlbs, Age, Gender]) as Tensor.DataTypeMap['float32'], [1, 4]);
    const outputMap = await this.session.run({X: input});
    return outputMap['variable'].data[0]
  }

  async predict90PercentQuantile(Age: number, Heightin: number, Weightlbs: number, Gender: number) {
    const url = "assets/confidence_models/lightgbm_model_1-2-2024_0.9.onnx";
    this.session = await InferenceSession.create(url);

    const input = new Tensor(new Float32Array([Heightin, Weightlbs, Age, Gender]) as Tensor.DataTypeMap['float32'], [1, 4]);
    const outputMap = await this.session.run({X: input});
    return outputMap['variable'].data[0]
  }
}
