import * as React from "react";

type AppProps = {
  greeting: string;
}
const HelloWorld = ({ greeting }: AppProps) => (
  <div>Rendered via TSX: {greeting}</div>
)

export default HelloWorld