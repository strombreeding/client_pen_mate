import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ArrowLetf26 from "./designs/ArrowLeft_26";
import { EmptyBox, Text } from "../styles";
import { NavigateFunction } from "react-router-dom";

const RowView = styled.div`
  display: flex;
  width: 100%;
  position: sticky;
  top: 0;
  justify-content: space-between;
  padding: 0px 30px 0px 30px;
  height: 60px;
  align-items: center;
  background-color: white;
`;

const SimpleHeader: React.FC<{
  title?: string;
  nowPage: number;
  goBack?: NavigateFunction;
  setScreen?: Dispatch<SetStateAction<number>>;
}> = ({ title, goBack, nowPage, setScreen }) => {
  return (
    <RowView>
      <ArrowLetf26
        onClick={() => {
          if (goBack) {
            goBack(-1);
          }
          if (setScreen) {
            setScreen(nowPage - 1);
          }
        }}
      />
      <Text.Body>{title}</Text.Body>
      <EmptyBox width={26} />
    </RowView>
  );
};

export default React.memo(SimpleHeader);
