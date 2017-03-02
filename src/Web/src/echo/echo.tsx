import * as React from "react";

import EchoDialogue from "./echoDialog";

import { globalConfig } from "../config/env";

const Echo = (props) => (
    <EchoDialogue
            hub="echoHub"
            url={globalConfig.baseChatApiUrl}
            logging={true}
            clientmethods={["echoMessage"]}/>
);

export default Echo;


