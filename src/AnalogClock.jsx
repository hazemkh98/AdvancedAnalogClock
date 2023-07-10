import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/AnalogClock.css";

export function AnalogClock(props) {
    return <HelloWorldSample {...props} />;
}
