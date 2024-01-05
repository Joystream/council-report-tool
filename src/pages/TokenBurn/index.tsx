import React, { useState, useEffect } from "react";
import { useRpc } from "@/hooks";
import { getBurnedToken } from "@/api";

const TokenBurn = () => {
  const { api } = useRpc();
  const [currentBlock, setCurrentBlock] = useState(0);
  const [totalBurn, setTotalBurn] = useState(0);

  const getCurrentBlock = async () => {
    if (!api) return;
    const blockHeader = await api.rpc.chain.getHeader();
    const currentBlockNumber = blockHeader.number.toNumber();
    setCurrentBlock(currentBlockNumber);
  };

  const getTotalBurnedToken = async () => {
    const totalBurnedToken = await getBurnedToken();
    setTotalBurn(totalBurnedToken);
  };

  useEffect(() => {
    getCurrentBlock();
    getTotalBurnedToken();
  }, [api]);
  return (
    <div>
      {totalBurn.toLocaleString("en-US")} JOY total burn at block{" "}
      {currentBlock.toLocaleString("en-US")}
    </div>
  );
};
export default TokenBurn;
