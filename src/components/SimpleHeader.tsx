import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ArrowLetf26 from "./designs/ArrowLeft_26";
import { EmptyBox, Text } from "../styles";
import { NavigateFunction } from "react-router-dom";

const RowView = styled.div`
  display: flex;
  width: 100%;
  height: 56px;
  position: sticky;
  top: 0px;
  justify-content: space-between;
  padding: 0px 30px 0px 30px;
  /* height: 60px; */
  background-color: white;
  align-items: center;
`;

const SimpleHeader: React.FC<{
  title?: string;
  goBack?: NavigateFunction;
}> = ({ title, goBack }) => {
  return (
    <RowView>
      <ArrowLetf26
        onClick={() => {
          if (goBack) {
            goBack(-1);
          }
        }}
      />
      <Text.Body>{title}</Text.Body>
      <EmptyBox width={26} />
    </RowView>
  );
};

export default React.memo(SimpleHeader);
