import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { useRpc } from "@/hooks";
import { getBurnedToken } from "@/api";
import { generateReport1 } from "@/helpers";

export default function Report1() {
  const { api } = useRpc();
  const [report1, setReport1] = useState({});

  const [loading, setLoading] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<number | undefined>(
    undefined,
  );
  const [totalBurn, setTotalBurn] = useState<number | undefined>(undefined);
  const [block, setBlock] = useState(0);
  const [storage, setStorage] = useState(false);

  useEffect(() => {
    (async () => {
      if (!api) return;
      const blockHeader = await api.rpc.chain.getHeader();
      const burnedToken = await getBurnedToken();
      const currentBlockNumber = blockHeader.number.toNumber();
      setCurrentBlock(currentBlockNumber);
      setTotalBurn(burnedToken);
      setBlock(currentBlockNumber);
    })();
  }, [api]);

  const generate = async () => {
    if (!api) return;
    setLoading(true);
    const [report1] = await Promise.all([generateReport1(api, block, storage)]);
    setReport1(report1);
    setLoading(false);
  };

  const storageHandler = () => {
    setStorage(!storage);
  };

  return (
    <div className="prose max-w-3xl m-auto mt-4 rounded-sm p-2 border-2 border-[#fff]">
      <h3>Given Block Stats</h3>
      <div className="rounded-sm p-2 mt-4 border-2 border-[#fff]">
        <div>
          Current block number: {currentBlock ? currentBlock : "Loading..."}
        </div>
        <div>
          Total burn :{" "}
          {totalBurn ? totalBurn.toLocaleString("en-US") + " JOY" : "Loading"}
        </div>
        <div>
          <label>Block:</label>
          <input
            type="number"
            value={block}
            onChange={(e) => setBlock(parseInt(e.target.value, 10))}
          />
          <input
            type="checkbox"
            className="pr-3"
            checked={storage}
            onChange={storageHandler}
          />
          <label>Storage Status</label>

          <button
            className="btn mr-0 my-5 mx-4"
            onClick={generate}
            disabled={!api || loading}
          >
            {loading ? "Generating..." : "Generate report"}
          </button>
        </div>
      </div>

      <ReactJson src={report1} theme="monokai" collapsed />
    </div>
  );
}
