import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import { ThemeContext } from "styled-components";
import { geoPath, geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import useSWR from "swr";
import { json } from "d3-fetch";
import * as topojson from "topojson";
import styled from "styled-components";
import { StatsType } from "@types";
import { numberWithCommas } from "@utils";
import Icon from "@components/Icon";
import { theme, ThemeType } from "@styles/themes";
import { Col, Row } from "@components/Layout";
import ToggleButtons from "@components/ToggleButtons";
import { MAP_POINTS } from "@consts";
import { useHistory } from "react-router-dom";

const [width, height] = [432, 488];
const D3_TRANSITION_DURATION = 3000;
interface Props {
  stats: StatsType;
}

const Wrapper = styled(Col)`
  margin-bottom: -50px;
  margin-top: -10px;
  display: block;
  overflow: hidden;
  position: relative;
  width: 360px;
  svg {
    align-self: center;
    height: 100%;
    width: 100%;
    z-index: 10;
    text {
      font-size: 10px;
      font-weight: 600;
      text-align: right;
      text-anchor: middle;
    }
  }
`;

const FloatingToggle = styled(Row)`
  position: absolute;
  bottom: 70px;
  right: 40px;
`;

const SLabel = styled.div<{ color: ThemeType }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${theme("mapLabel")};
  border-radius: 4px;
  padding: 4px 10px;
  box-shadow: 0 0 6px #00000025;
  line-height: 18px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  .name {
    font-size: 12px;
    margin-bottom: 1px;
    opacity: 0.8;
  }
  .cases {
    font-size: 13px;
    font-weight: bold;
  }
  .delta {
    font-size: 11px;
    flex-direction: row;
    display: flex;
    align-items: center;
    color: ${(props) => theme(props.color)};
    background: ${(props) => theme(props.color)}15;
    border-radius: 4px;
    padding-left: 4px;
    padding-right: 4px;
    svg {
      stroke: ${(props) => theme(props.color)};
      height: 12px;
    }
  }
`;

const Label = ({ pos, name, stats, cityId }) => {
  const history = useHistory();
  const [left, top] = pos;
  const cases = numberWithCommas(stats[cityId].cases[0]);
  const delta = stats[cityId].cases[1] || 0;
  const deltaColor = delta == 0 ? "greyText" : delta > 0 ? "red" : "blue";
  const onClick = () => {
    if (name != "대구" && name != "검역") {
      history.push(`./city/${cityId}`);
    }
  };

  return (
    <SLabel
      color={deltaColor as ThemeType}
      onClick={onClick}
      style={{ left, top, opacity: cases == 0 ? 0.5 : 1 }}
    >
      <div className="name">{name}</div>
      <div className="cases">{cases}</div>
      {!!delta && (
        <div className="delta">
          {delta ? <Icon name={delta > 0 ? "ArrowUp" : "ArrowDown"} size={12}></Icon> : <></>}
          <span>{Math.abs(delta) || "-"}</span>
          {!!delta && <Row width="2px"></Row>}
        </div>
      )}
    </SLabel>
  );
};

const MapExplorer: React.FC<Props> = ({ stats }) => {
  const currentTheme = useContext(ThemeContext);
  const svgRef = useRef(null);
  const [statType, setStatType] = useState("current");

  const { data: geoData } = useSWR(
    "/maps/korea.json",
    async (file) => {
      return await json(file);
    },
    { suspense: false, revalidateOnFocus: false }
  );

  const path = useMemo(() => {
    if (!geoData) return null;
    const projection = geoMercator().fitSize(
      [width, height],
      topojson.feature(geoData, geoData.objects.regions)
    );

    return geoPath().projection(projection);
  }, [geoData]);

  const features = useMemo(() => {
    if (!geoData) return null;
    return topojson.feature(geoData, geoData.objects.regions).features;
  }, [geoData]);

  useEffect(() => {
    if (!geoData) return;
    const svg = select(svgRef.current);
    const T = transition().duration(D3_TRANSITION_DURATION);

    const maxCases = Math.max(...Object.keys(stats.overall).map((a) => stats.overall[a].cases[0]));

    svg
      .select(".regions")
      .selectAll("path")
      .data(features)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("d", path)
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.5)
            .attr("stroke", currentTheme["mapBorder"])
            .style("cursor", "pointer")
            .attr("fill", (d) => {
              return `rgb(86, 115, 235,${
                0.1 + Math.max(stats.overall[d.properties.code].cases[0] / maxCases - 0.1, 0)
              })`;
            }),
        (update) => update.attr("stroke", currentTheme["mapBorder"]),
        (exit) => exit.transition(T).attr("stroke", "#fff0").attr("fill", "#fff0").remove()
      );

    select(".container")
      .selectAll("div")
      .data(features)
      .enter()
      .append("div")
      .attr("class", "label")
      .html((d) => {
        console.log(d);
        return `<div >${d.properties.name}</div>`;
      });
  }, [geoData, features, path, currentTheme]);

  return (
    <>
      <Wrapper fadeInUp className="container">
        {features &&
          features.map((f, i) => {
            let { name, code } = f.properties;
            let pos = MAP_POINTS[name].map((a) => a + "px");
            return <Label pos={pos} name={name} cityId={code} stats={stats[statType]}></Label>;
          })}
        {statType == "overall" && (
          <Label pos={MAP_POINTS["검역"]} name={"검역"} cityId={17} stats={stats[statType]}></Label>
        )}
        <svg
          viewBox={`50 0 ${width - 150} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          id="chart"
          ref={svgRef}
        >
          <div className="html"></div>
          <g className="regions" />
          <g className="labels" />
          <g className="state-borders" />
          <g className="district-borders" />
        </svg>
        <FloatingToggle>
          <ToggleButtons
            noBg
            options={[
              { name: "총 확진자", value: "overall", visible: true },
              { name: "오늘", value: "current", visible: true },
            ]}
            activeOption={statType}
            setOption={setStatType}
          ></ToggleButtons>
        </FloatingToggle>
      </Wrapper>
    </>
  );
};

export default MapExplorer;
