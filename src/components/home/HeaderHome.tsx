import styled from "styled-components";
import { EmptyBox, Text } from "../../styles";
import { imgSrc } from "../../assets/img";
import Bell26 from "../designs/26px/Bell_26";
import Dm_26 from "../designs/26px/Dm_26";
import { Fragment } from "react";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 30px 15px 30px;
  justify-content: space-between;
  align-items: center;
  min-height: 64px;
  position: fixed;
  width: 100%;
`;
export const RowView = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderHome = () => {
  return (
    <Fragment>
      <Header>
        <Text.Title1>홈</Text.Title1>
        <RowView>
          <Bell26 />
          <EmptyBox width={20} />
          <Dm_26 />
        </RowView>
      </Header>
      <EmptyBox height={64} />
    </Fragment>
  );
};

export default HeaderHome;
