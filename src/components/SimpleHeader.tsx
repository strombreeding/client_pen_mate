import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import ArrowLetf26 from "./designs/26px/ArrowLeft_26";
import { EmptyBox } from "../styles";
import { NavigateFunction } from "react-router-dom";
import { Text } from "../assets/fontStyles";

const RowView = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  position: relative;
  top: 0px;
  justify-content: space-between;
  padding: 0px 30px 0px 30px;
  align-items: center;
  z-index: 100;
`;

const SimpleHeader: React.FC<{
  title?: string;
  goBack?: NavigateFunction;
}> = ({ title, goBack }) => {
  useEffect(() => {
    window.addEventListener("beforeunload", () => alert("나갈꺼냐?"));
  }, []);
  return (
    <RowView>
      <ArrowLetf26
        onClick={() => {
          if (goBack) {
            goBack(-1);
          }
        }}
      />
      <Text.Esa_Bold_16>{title}</Text.Esa_Bold_16>
      <EmptyBox width={26} />
    </RowView>
  );
};

export default React.memo(SimpleHeader);
