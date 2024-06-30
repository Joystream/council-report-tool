import { useState, useEffect } from "react";
import ReactJson from "react-json-view";
import moment from "moment";
import { useRpc } from "@/hooks";
import { generateReport2 } from "@/helpers";
import { DailyData } from "@/hooks/types";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import DomToImage from "dom-to-image";
import {
  weeklyReportTemplateWithMediaStatus,
  weeklyReportTempleteWithoutMediaStatus,
  proposalLink,
} from "@/config";
import { uploadImage } from "@/helpers";

function JoyChart({
  data,
  title,
  id,
}: {
  data: DailyData[];
  title: string;
  id: string;
}) {
  if (data.length === 0) return <></>;
  return (
    <div className="p-2">
      <h3>{title}</h3>
      <div id={id}>
        <BarChart id={id} width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={(val: Date) => {
              const date = val.toLocaleDateString("en-US");
              return date.slice(0, date.length - 5);
            }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name={title} />
        </BarChart>
      </div>

      <ReactJson src={{ title, data }} theme="monokai" collapsed />
    </div>
  );
}

export default function Weekly() {
  const { api } = useRpc();
  const baseStartDate = "2023-08-11";
  const baseStartBlockNumber: number = 3531601;
  const blocksPerWeek: number = 100800;
  const [report2, setReport2] = useState({});
  const [videoChart, setVideoChart] = useState<DailyData[]>([]);
  const [channelChart, setChannelChart] = useState<DailyData[]>([]);
  const [storageChart, setStorageChart] = useState<DailyData[]>([]);
  const [nftChart, setNftChart] = useState<DailyData[]>([]);
  const [crtChart, setCrtChart] = useState<DailyData[]>([]);
  const [membershipChart, setMemberShipChart] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [storageFlag, setStorageFlag] = useState(false);
  const [startBlock, setStartBlock] = useState(0);
  const [endBlock, setEndBlock] = useState(0);
  const [activeWeek, setActiveWeek] = useState(-1);
  const [diffweeks, setDiffWeeks] = useState(0);
  const [fileName, setFileName] = useState("");
  const graphTypes = [
    "videosChart",
    "videoNftChart",
    "crtChart",
    "nonEmptyChannelChart",
    "membershipChart",
    "mediaStorageChart",
  ];
  const style = {
    fontWeight: 800,
  };
  let weeklyReport = "";

  const generate = async () => {
    setFileName("");
    if (!api) return;
    if (startBlock * endBlock == 0) return;
    setLoading(true);
    const [report2] = await Promise.all([
      generateReport2(api, storageFlag, startBlock, endBlock),
    ]);
    setFileName(
      "weekly_summary_" +
        moment(report2.general.endBlock.timestamp).format("DD-MMM-YYYY") +
        ".md",
    );
    setReport2(report2);
    setVideoChart([...report2.videos.chartData]);
    if (report2.mediaStorage)
      setStorageChart([...report2.mediaStorage.chartData]);
    setChannelChart([...report2.nonEmptyChannel.chartData]);
    setNftChart([...report2.videoNFTs.chartData]);
    setCrtChart([...report2.crt.chartData]);
    setMemberShipChart([...report2.membership.chartData]);
    setLoading(false);
  };

  const storageFlagHandler = () => {
    setStorageFlag(!storageFlag);
  };

  const writeWeeklyReport = (obj_data: Object, name_alias: string) => {
    type obj_data_key = keyof typeof obj_data;
    Object.keys(obj_data).map((_title) => {
      if (
        typeof obj_data[_title as obj_data_key] != "object" &&
        _title != "proposals" &&
        obj_data[_title as obj_data_key] != undefined
      ) {
        const pattern = name_alias + "_" + _title;
        let value: any = obj_data[_title as obj_data_key];
        if (typeof value == "number")
          value = Number(value).toLocaleString("en-US");
        else value = String(value);
        weeklyReport = weeklyReport.replaceAll(pattern, value);
      } else if (_title == "proposals") {
        const proposals = obj_data[_title as obj_data_key];
        type proposals_type = keyof typeof proposals;
        Object.keys(proposals).map((_status) => {
          let proposal_txt = "";
          const statusOfProposals: Array<{
            id: number;
            title: string;
            status: string;
            createdAt: string;
            councilApprovals: number;
          }> = proposals[_status as proposals_type];
          statusOfProposals.map((status) => {
            proposal_txt +=
              "- [" +
              status.title +
              "](" +
              proposalLink +
              status.id +
              ")" +
              String.fromCharCode(10);
          });
          const pattern = _title + "_" + _status;
          weeklyReport = weeklyReport.replaceAll(pattern, proposal_txt);
        });
      } else {
        if (
          obj_data[_title as obj_data_key] != undefined &&
          _title != "proposals"
        )
          writeWeeklyReport(
            obj_data[_title as obj_data_key],
            name_alias + "_" + _title,
          );
      }
    });
  };

  const onWeekSelectHandler = async (e: any) => {
    if (!api) return;
    const index: number = e.target.value;
    if (index > 0) {
      setActiveWeek(index);
      const endDate = moment(baseStartDate).add((+index + 1) * 7 + 1, "day");
      const diff = moment(endDate).diff(new Date(), "days");
      const startBlock = +baseStartBlockNumber + index * blocksPerWeek + +index;
      if (diff <= 0) {
        const endBlock =
          +baseStartBlockNumber + (+index + 1) * blocksPerWeek + +index;
        setStartBlock(startBlock);
        setEndBlock(endBlock);
      } else {
        const blockHeader = await api.rpc.chain.getHeader();
        const currentBlockNumber = blockHeader.number.toNumber();
        setStartBlock(startBlock);
        setEndBlock(currentBlockNumber);
      }
    }
  };

  const exportWeeklyReport = async () => {
    if (fileName == "") return;
    if (storageFlag) weeklyReport = weeklyReportTemplateWithMediaStatus;
    else weeklyReport = weeklyReportTempleteWithoutMediaStatus;
    writeWeeklyReport(report2, "");
    await exportImage();
  };

  const exportImage = async () => {
    const promise = graphTypes.map(async (_type) => {
      let node = document.getElementById(_type);
      if (node) {
        let options = { quality: 1 };
        const imgData = await DomToImage.toPng(node as Node, options);
        const imgLink = await uploadImage(imgData.split(",")[1]);
        if (imgLink != "") {
          const pattern = "_graph_" + _type;
          weeklyReport = weeklyReport.replaceAll(pattern, imgLink);
        }
      }
    });
    await Promise.all(promise);
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(weeklyReport),
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  useEffect(() => {
    const diff = moment().diff(baseStartDate, "weeks");
    setDiffWeeks(diff);
  }, []);

  return (
    <div className="rounded-sm p-2 mt-4 border-2 border-[#fff]">
      <h3>Weekly Report Data</h3>
      <div className="justify-content-center">
        <div>Weeks </div>
        <select
          onChange={onWeekSelectHandler}
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
          {[...Array(diffweeks).keys()].map((i) =>
            moment(baseStartDate)
              .add((diffweeks - i) * 7 + 1, "day")
              .diff(new Date(), "days") < 0 ? (
              <option
                value={diffweeks - i}
                key={diffweeks - i}
                style={diffweeks - i == activeWeek ? style : {}}
              >
                {moment(baseStartDate)
                  .add((diffweeks - i) * 7 + 1, "day")
                  .format("DD MMMM YYYY")}
                ~
                {moment(baseStartDate)
                  .add((diffweeks - i + 1) * 7 + 1, "day")
                  .diff(new Date(), "days") < 0 ? (
                  moment(baseStartDate)
                    .add((diffweeks - i + 1) * 7 + 1, "day")
                    .format("DD MMMM YYYY")
                ) : (
                  <> Progress </>
                )}
              </option>
            ) : null,
          )}
        </select>
      </div>
      <div className="rounded-sm p-2 border-2 border-[#fff]">
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
        <input
          type="checkbox"
          checked={storageFlag}
          onChange={storageFlagHandler}
        />
        <label>Storage Status</label>
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
          onClick={exportWeeklyReport}
          disabled={!api || loading}
        >
          Export Report
        </button>
      </div>

      <ReactJson src={report2} theme="monokai" collapsed />

      <JoyChart data={videoChart} title="New Videos" id="videosChart" />
      <JoyChart data={nftChart} title="New NFT Minted" id="videoNftChart" />
      <JoyChart
        data={crtChart}
        title="New circulating creator tokens"
        id="crtChart"
      />
      <JoyChart
        data={channelChart}
        title="New Non-empty channels"
        id="nonEmptyChannelChart"
      />
      <JoyChart
        data={membershipChart}
        title="New Membership"
        id="membershipChart"
      />
      {storageFlag ? (
        <JoyChart
          data={storageChart}
          title="New Media Uploads (GB)"
          id="mediaStorageChart"
        />
      ) : null}
    </div>
  );
}
