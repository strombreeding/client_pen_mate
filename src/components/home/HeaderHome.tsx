import styled from "styled-components";
import { EmptyBox } from "../../styles";
import { imgSrc } from "../../assets/img";
import { Fragment, memo } from "react";
import { Text } from "../../assets/fontStyles";
import { View } from "../../nativeView";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px 0px 20px;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  width: 100%;
`;
export const RowView = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderHome = () => {
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  console.log(infomation);
  const point = 1004;
  return (
    <Header>
      <View style={{ paddingTop: 5 }}>
        <Text.Regular_16>{infomation.nickname}</Text.Regular_16>
        <EmptyBox height={4} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <img
              src={imgSrc.atata_point}
              style={{ width: 20, height: 20, marginTop: -3 }}
            />
            <Text.Spo_Medium_16>{infomation.atataPoint}</Text.Spo_Medium_16>
          </View>
          <EmptyBox width={5} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <img
              src={imgSrc.energy}
              style={{ width: 20, height: 20, marginTop: 0 }}
            />
            <Text.Spo_Medium_16>{infomation.energy}</Text.Spo_Medium_16>
          </View>
        </View>
      </View>
      <RowView>
        <EmptyBox width={20} />
      </RowView>
    </Header>
  );
};

export default memo(HeaderHome);
