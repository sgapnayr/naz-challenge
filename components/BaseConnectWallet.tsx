"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";

function BaseConnectWallet() {
  return <ConnectWallet theme={"dark"} modalSize={"wide"} />;
}

export default BaseConnectWallet;
