// name for modes with filepaths

export const MODELMAPS = {
  "hipbreadthsitting": {
    "0.1": "assets/confidence_models/lightgbm_model_hipbreadthsitting_0.1_1-2-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_hipbreadthsitting_0.5_1-2-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_hipbreadthsitting_0.9_1-2-2024.onnx"
  },
  "bideltoidbreadth": {
    "0.1": "assets/confidence_models/lightgbm_model_bideltoidbreadth_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_bideltoidbreadth_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_bideltoidbreadth_0.9_1-19-2024.onnx"
  },
  "chestbreadth": {
    "0.1": "assets/confidence_models/lightgbm_model_chestbreadth_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_chestbreadth_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_chestbreadth_0.9_1-19-2024.onnx"
  },
  "sittingheight": {
    "0.1": "assets/confidence_models/lightgbm_model_sittingheight_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_sittingheight_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_sittingheight_0.9_1-19-2024.onnx"
  },
  "buttockpopliteallength": {
    "0.1": "assets/confidence_models/lightgbm_model_buttockpopliteallength_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_buttockpopliteallength_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_buttockpopliteallength_0.9_1-19-2024.onnx"
  },
  "thighclearance": {
    "0.1": "assets/confidence_models/lightgbm_model_thighclearance_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_thighclearance_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_thighclearance_0.9_1-19-2024.onnx"
  },
  "tibialheight": {
    "0.1": "assets/confidence_models/lightgbm_model_tibialheight_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_tibialheight_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_tibialheight_0.9_1-19-2024.onnx"
  },
  "buttockkneelength": {
    "0.1": "assets/confidence_models/lightgbm_model_buttockkneelength_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_buttockkneelength_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_buttockkneelength_0.9_1-19-2024.onnx"
  },
  "elbowrestheight": {
    "0.1": "assets/confidence_models/lightgbm_model_elbowrestheight_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_elbowrestheight_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_elbowrestheight_0.9_1-19-2024.onnx"
  },
  "kneeheightsitting": {
    "0.1": "assets/confidence_models/lightgbm_model_kneeheightsitting_0.1_1-19-2024.onnx",
    "0.5": "assets/confidence_models/lightgbm_model_kneeheightsitting_0.5_1-19-2024.onnx",
    "0.9": "assets/confidence_models/lightgbm_model_kneeheightsitting_0.9_1-19-2024.onnx"
  }

}

export class ModelType {
  "0.1": string;
  "0.5": string;
  "0.9": string;
}

export class ModelPrediction {
  "target": string;
  "0.1": number;
  "0.5": number;
  "0.9": number;
  "confidenceSpan": number;
}

