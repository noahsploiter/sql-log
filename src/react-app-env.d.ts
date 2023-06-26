declare module '*.wav' {
    const value: number;
    export default value;
  }
  
  declare function webpackContext(req: string): number;
  declare namespace webpackContext {
    function keys(): string[];
    function resolve(req: string): number;
    const id: number;
  }
  
  export = webpackContext;
  