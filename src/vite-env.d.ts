/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// Adicione exatamente isso aqui:
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}