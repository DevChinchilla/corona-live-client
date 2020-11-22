import styled from "styled-components";
import React, { useCallback, useState } from "react";

import Icon from "@components/Icon";
import { Absolute, Row } from "@components/Layout";
import Report from "@components/Home/ReportModal";
import Underline from "@components/Underline";
import Button from "@components/Button";

import { useTheme } from "@hooks/useTheme";
import { useHistory, Link } from "react-router-dom";

const Wrapper = styled(Row)`
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
`;

const Gnb = styled(Absolute)`
  top: -999px;
  visibility: hidden;
`;

interface Props {
  theme: string;
  setTheme: any;
  title?: string;
}

const Header: React.FC<Props> = ({ theme: currentTheme, setTheme, title }) => {
  const history = useHistory();

  const [showReport, setShowReport] = useState(false);
  const theme = useTheme();

  const closeReportModal = () => setShowReport(false);
  const openReportModal = () => setShowReport(true);

  const goBack = useCallback(() => history.push({ pathname: "/", state: "live" }), []);
  const toggleTheme = useCallback(() => setTheme(currentTheme == "light" ? "dark" : "light"), [
    currentTheme,
  ]);

  return (
    <>
      <Gnb className="gnb">
        <Link to="/live">실시간</Link>
        <Link to="/daily">일별</Link>
        <Link to="/rates">확진율</Link>
        <Link to="/world">세계</Link>
        <Link to="/city/0">서울</Link>
        <Link to="/city/8">경기</Link>
        <Link to="/city/1">부산</Link>
      </Gnb>

      {showReport && <Report show={showReport} onClose={closeReportModal}></Report>}

      <Wrapper fadeInUp>
        {title ? (
          <>
            <Button transparent icon onClick={goBack}>
              <Icon name="ChevronLeft" stroke={theme("darkGreyText")} size={28}></Icon>
            </Button>
            <Underline fontSize="18px " fontWeight={900}>
              {title}
            </Underline>
          </>
        ) : (
          <>
            <Button transparent icon onClick={toggleTheme}>
              <Icon name="Light" size={26} fill={theme("darkGreyText")}></Icon>
            </Button>
            <Icon
              transform="translate(2px,-4px)"
              name="Logo"
              height="26px"
              width="110px"
              fill={theme("blackText")}
            ></Icon>
          </>
        )}

        <Button transparent icon onClick={openReportModal}>
          <Icon name="SendMessage" size={20} fill={theme("darkGreyText")}></Icon>
        </Button>
      </Wrapper>
    </>
  );
};

const MemoHeader = React.memo(Header, (prev, next) => prev.theme === next.theme);

export default MemoHeader;
