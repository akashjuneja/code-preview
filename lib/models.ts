export type LLMModel = {
    id: string;
    name: string;
    provider: string;
    providerId: string;
  };

  export type LLMModelConfig={
    model?:string;
    apiKey?:string;
    baseUrl?:string;
    temperature?:number;
    topP?:number;
    topK?:number;
    frequencyPenalty?:number;
    presensePenalty?:number;
    maxTokens?:number;
  }