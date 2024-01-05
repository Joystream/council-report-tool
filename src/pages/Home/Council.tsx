import React, { useState } from "react";
import ReactJson from "react-json-view";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import moment from "moment";
import DomToImage from "dom-to-image";
import { useRpc } from "@/hooks";
import { generateReport4, decimalAdjust } from "@/helpers";
import { useElectedCouncils } from "@/hooks";
import {
  spendigBudgetBarType,
  WGspedingType,
  spendingBudgetPieType,
  OverallType,
} from "@/hooks/types";

import { uploadImage } from "@/helpers";
import {
  councilReportWithMediaStatus,
  councilReportWithOutMediaStatus,
} from "@/config";

function SpendingBarChart({
  data,
  title,
  id,
  type,
}: {
  data: spendigBudgetBarType[];
  title: string;
  id: string;
  type: boolean;
}) {
  if (data.length === 0) return <></>;
  return (
    <div className="p-2">
      <div id={type ? id + "-joy" : id + "-usdt"}>
        <BarChart id={id} width={900} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          {type ? (
            <>
              <Bar
                dataKey="prevSpendingOfJoy"
                fill="#8884d8"
                name={title + " (prev term ), JOY"}
              />
              <Bar
                dataKey="currentSpendingOfJoy"
                fill="#ff6600"
                name={title + " (current term), JOY"}
              />
            </>
          ) : (
            <>
              <Bar
                dataKey="prevSpendingOfUsd"
                fill="#8884d8"
                name={title + " (prev term ), USDT"}
              />
              <Bar
                dataKey="currentSpendingOfUsd"
                fill="#ff6600"
                name={title + " (current term ), USDT"}
              />
            </>
          )}
        </BarChart>
      </div>
    </div>
  );
}

function SpendingPieChart({
  title,
  id,
  data,
  color,
}: {
  title: string;
  id: string;
  data: Array<spendingBudgetPieType>;
  color: Array<string>;
}) {
  if (data.length === 0) return <></>;
  return (
    <div id={id}>
      <div style={{ display: "flex" }}>
        <PieChart width={350} height={350}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#82ca9d"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
          </Pie>
        </PieChart>
        <div
          className="mr-3 mt-4"
          style={{
            columnCount: id == "overallPieChart" ? 1 : 2,
            columnGap: "40px",
          }}
        >
          {data.map((a, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <div
                className="mr-1"
                style={{ height: 10, width: 10, backgroundColor: color[index] }}
              />
              <p>
                {" "}
                <span style={{ fontWeight: 300 }}>{a.name} </span>{" "}
                {a.value + " %"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Council() {
  const { api } = useRpc();
  const { data } = useElectedCouncils({});
  const [report4, setReport4] = useState({});
  const [loading, setLoading] = useState(false);
  const [storageFlag, setStorageFlag] = useState(false);
  const [activeCouncil, setActiveCouncil] = useState(-1);
  const [startBlock, setStartBlock] = useState(0);
  const [endBlock, setEndBlock] = useState(0);
  const [prevEMA, setPrevEMA] = useState(0);
  const [curEMA, setCurEMA] = useState(0);
  const [overallBar, setOverallBar] = useState<spendigBudgetBarType[]>([]);
  const [overallPie, setOverallPie] = useState<spendingBudgetPieType[]>([]);
  const [wgBar, setWGBar] = useState<spendigBudgetBarType[]>([]);
  const [wgPie, setWGPie] = useState<spendingBudgetPieType[]>([]);
  const [fileName, setFileName] = useState("");
  const overallPieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const wgPieColors = [
    "#ff4000",
    "#ff8000",
    "#ffff00",
    "#ff0080",
    "#00ff00",
    "#00ffbf",
    "#00bfff",
    "#0040ff",
    "#4000ff",
  ];
  const graphTypes = [
    "overallPieChart",
    "wgPieChart",
    "overallBudget-joy",
    "overallBudget-usdt",
    "wgBudget-joy",
    "wgBudget-usdt",
  ];
  let councilReport = "";
  const style = {
    fontWeight: 800,
  };

  const getCurrentBlockNumber = async () => {
    if (!api) return;
    const blockHeader = await api.rpc.chain.getHeader();
    const currentBlockNumber = blockHeader.number.toNumber();
    setEndBlock(currentBlockNumber);
  };

  const generate = async () => {
    if (!api) return;
    if (!data) return;
    setFileName("");
    if (startBlock * endBlock == 0) return;
    setLoading(true);
    const [report4] = await Promise.all([
      generateReport4(
        api,
        data[activeCouncil - 1].id,
        startBlock,
        endBlock,
        prevEMA,
        curEMA,
        storageFlag,
      ),
    ]);
    generateWGBudgetBarChartData(report4.wgSpending);
    generateWGBudgetPieChartData(report4.wgSpending);
    generateOverallBudgetBarChartData(report4.overallBudget);
    generateOverallBudgetPieChartData(report4.overallBudget);
    setReport4(report4);
    setFileName(
      "Council_Report_" +
        moment(report4.general.startBlock.timeStamp).format("DD-MMM-YYYY") +
        ".md",
    );
    setLoading(false);
  };

  const generateWGBudgetBarChartData = (wgSpending: WGspedingType) => {
    type wgSpendingKeys = keyof typeof wgSpending;
    const chartData: Array<spendigBudgetBarType> = [];
    Object.keys(wgSpending).map((_group) => {
      chartData.push(wgSpending[_group as wgSpendingKeys]);
    });
    setWGBar(chartData);
  };

  const generateOverallBudgetBarChartData = (overallBudget: OverallType) => {
    type overallTypes = keyof typeof overallBudget;
    const chartData: Array<spendigBudgetBarType> = [];
    Object.keys(overallBudget).map((_type) => {
      if (_type != "grandTotal" && _type != "fees") {
        chartData.push(overallBudget[_type as overallTypes]);
      }
    });
    setOverallBar(chartData);
  };

  const generateWGBudgetPieChartData = (wgSpending: WGspedingType) => {
    const pieChartData: Array<spendingBudgetPieType> = [];
    type wgSpendingKeys = keyof typeof wgSpending;
    const total = Object.keys(wgSpending).reduce(
      (a, b) => a + wgSpending[b as wgSpendingKeys].currentSpendingOfJoy,
      0,
    );
    Object.keys(wgSpending).map((_type) => {
      let tmp = {
        name: _type,
        value: decimalAdjust(
          (100 * wgSpending[_type as wgSpendingKeys].currentSpendingOfJoy) /
            total,
        ),
      };
      pieChartData.push(tmp);
    });
    setWGPie(pieChartData);
  };

  const generateOverallBudgetPieChartData = (overallBudget: OverallType) => {
    type overallTypes = keyof typeof overallBudget;
    const chartData: Array<spendingBudgetPieType> = [];
    let total = 0;
    Object.keys(overallBudget).map((_type) => {
      if (
        _type != "grandTotal" &&
        _type != "fees" &&
        _type != "fundingProposal"
      ) {
        total += overallBudget[_type as overallTypes].currentSpendingOfJoy;
      }
    });
    Object.keys(overallBudget).map((_type) => {
      if (
        _type != "grandTotal" &&
        _type != "fees" &&
        _type != "fundingProposal"
      ) {
        let tmp = {
          name: overallBudget[_type as overallTypes].id,
          value: decimalAdjust(
            (100 * overallBudget[_type as overallTypes].currentSpendingOfJoy) /
              total,
          ),
        };
        chartData.push(tmp);
      }
    });
    setOverallPie(chartData);
  };

  const storageFlagHandler = () => {
    setStorageFlag(!storageFlag);
  };

  const onCouncilChangeHandler = (e: any) => {
    if (!data) return;
    const index = e.target.value;
    if (index > 0) {
      setActiveCouncil(index);
      const electedAt = data[index - 1].electedAt;
      const endAt = data[index - 1].endedAt;
      setStartBlock(electedAt.number);
      if (endAt) setEndBlock(endAt.number);
      else getCurrentBlockNumber();
    }
  };

  const writeCouncilReport = (councilReportData: Object, alias: string) => {
    type reportKeys = keyof typeof councilReportData;
    Object.keys(councilReportData).map((_type) => {
      if (
        typeof councilReportData[_type as reportKeys] != "object" &&
        _type != "projectInflations" &&
        councilReportData[_type as reportKeys] != undefined &&
        _type != "composition"
      ) {
        const pattern = alias + "_" + _type;
        let value: any = councilReportData[_type as reportKeys];
        if (typeof value == "number")
          value = Number(value).toLocaleString("en-US");
        else value = String(value);
        councilReport = councilReport.replaceAll(pattern, value);
      } else if (_type == "projectInflations") {
        let _project_inflation = "";
        let totalMinted = 0;
        let totalInflation = 0;
        const projectInflations = councilReportData[_type as reportKeys];
        type inflationType = keyof typeof projectInflations;
        Object.keys(projectInflations).map((_infaltion) => {
          const tmp_inflation = projectInflations[
            _infaltion as inflationType
          ] as {
            term: number;
            mintedToken: number;
            inflation: number;
          };
          totalMinted += tmp_inflation.mintedToken;
          totalInflation += tmp_inflation.inflation;
          _project_inflation +=
            "| " +
            tmp_inflation.term +
            " | " +
            tmp_inflation.mintedToken +
            " | " +
            tmp_inflation.inflation +
            " % |" +
            String.fromCharCode(10);
        });
        _project_inflation +=
          "| Total" +
          " | " +
          totalMinted +
          " | " +
          decimalAdjust(totalInflation) +
          " % |" +
          String.fromCharCode(10);
        const pattern = "_project_inflation";
        councilReport = councilReport.replace(pattern, _project_inflation);
      } else if (_type == "composition") {
        let _composition = "";
        const pattern = "_composition";
        const candidates = councilReportData[_type as reportKeys];
        type candidate_type = keyof typeof candidates;
        Object.keys(candidates).map((_cand_type) => {
          const tmp_candidate = candidates[_cand_type as candidate_type] as {
            member: string;
            pct: number;
          };
          _composition +=
            "- **" +
            tmp_candidate.member +
            "**, " +
            tmp_candidate.pct +
            "%" +
            String.fromCharCode(10);
        });
        councilReport = councilReport.replaceAll(pattern, _composition);
      } else {
        if (
          councilReportData[_type as reportKeys] != undefined &&
          _type != "projectInflations" &&
          _type != "composition"
        ) {
          writeCouncilReport(
            councilReportData[_type as reportKeys],
            alias + "_" + _type,
          );
        }
      }
    });
  };

  const exportGraphImage = async () => {
    const promise = graphTypes.map(async (_type) => {
      let node = document.getElementById(_type);
      if (node) {
        let options = { quality: 1 };
        const imgData = await DomToImage.toPng(node as Node, options);
        const imgLink = await uploadImage(imgData.split(",")[1]);
        if (imgLink != "") {
          const pattern = "_graph_" + _type;
          councilReport = councilReport.replaceAll(pattern, imgLink);
        }
      }
    });
    await Promise.all(promise);
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(councilReport),
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportCouncilReport = async () => {
    if (fileName == "") return;
    if (storageFlag) councilReport = councilReportWithMediaStatus;
    else councilReport = councilReportWithOutMediaStatus;
    writeCouncilReport(report4, "");
    await exportGraphImage();
  };

  return (
    <div className="prose max-w-3xl m-auto mt-4">
      <div className="rounded-sm p-2 mt-4 border-2 border-[#fff]">
        <h3>Council Report Data</h3>
        <div className="rounded-sm p-2 border-2 border-[#fff]">
          {data ? (
            <select
              onChange={onCouncilChangeHandler}
              style={{
                width: "100%",
                borderColor: "grey",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "6px",
                padding: "8px",
              }}
            >
              <option value={0}>Select ...</option>
              {data.map((e, key) => (
                <option
                  value={key + 1}
                  key={key}
                  style={key + 1 == activeCouncil ? style : {}}
                >
                  {moment(e.electedAt.timestamp).format("DD MMMM YYYY")}~
                  {e.endedAt ? (
                    moment(e.endedAt.timestamp).format("DD MMMM YYYY")
                  ) : (
                    <>( Progress ) </>
                  )}
                </option>
              ))}
            </select>
          ) : (
            <div>Loading...</div>
          )}
          <label>Start block:</label>
          <input
            type="number"
            value={startBlock}
            onChange={(e) => setStartBlock(parseInt(e.target.value, 10))}
          />
          <label>End block:</label>
          <input
            type="number"
            value={endBlock}
            onChange={(e) => setEndBlock(parseInt(e.target.value, 10))}
          />
          '
          <input
            type="checkbox"
            checked={storageFlag}
            onChange={storageFlagHandler}
          />
          <label>Storage Status</label>
          <div className="d-flex">
            <label>Prev Term EMA30:</label>
            <input
              type="number"
              step={0.001}
              value={prevEMA}
              onChange={(e) => setPrevEMA(parseFloat(e.target.value))}
            />
            <label>Current Term EMA30:</label>
            <input
              type="number"
              step={0.001}
              value={curEMA}
              onChange={(e) => setCurEMA(parseFloat(e.target.value))}
            />
          </div>
          <div className="d-flex">
            <button
              className="btn mr-0 my-5 mx-4"
              onClick={generate}
              disabled={!api || loading}
            >
              {loading ? "Generating..." : "Generate report"}
            </button>
            <button
              className="btn mr-0 my-5 mx-4"
              onClick={exportCouncilReport}
              disabled={!api || loading}
            >
              Export Report
            </button>
          </div>
        </div>

        <ReactJson src={report4} theme="monokai" collapsed />
        <div className="mt-4" />
        <SpendingPieChart
          title="Total Spending"
          data={overallPie}
          id="overallPieChart"
          color={overallPieColors}
        />
        <SpendingPieChart
          title="Total Spending"
          data={wgPie}
          id="wgPieChart"
          color={wgPieColors}
        />
        <SpendingBarChart
          title="Total Spending"
          data={overallBar}
          id="overallBudget"
          type={true}
        />
        <SpendingBarChart
          title="Total Spending"
          data={overallBar}
          id="overallBudget"
          type={false}
        />
        <SpendingBarChart
          title="Total Spending"
          data={wgBar}
          id="wgBudget"
          type={true}
        />
        <SpendingBarChart
          title="Total Spending"
          data={wgBar}
          id="wgBudget"
          type={false}
        />
      </div>
    </div>
  );
}
