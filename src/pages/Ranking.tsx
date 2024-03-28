import styled from "styled-components";
import { Container, EmptyBox } from "../styles";
import { Pressable, ScrollView, View } from "../nativeView";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { Text } from "../assets/fontStyles";
import { imgSrc } from "../assets/img";
import axios, { all } from "axios";
import axiosInstance from "../apis/axiosInstance";
import { SERVER_URI } from "../configs/server";
import { useEffect, useRef, useState } from "react";
import { jwtApiRequest } from "../apis/jwtApiService";
import StorePopup, { IStorePopupProps } from "../components/StorePopup";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addK } from "../utils/randomCnt";

const InitModal = styled(View)`
  z-index: 2;
  position: relative;
  padding: 15px;
  border-radius: 5px;
  width: 100%;
  align-items: center;
  width: 95%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15px) contrast(60%);
  -webkit-backdrop-filter: blur(15px) contrast(60%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* border-radius: 20px 20px 0px 0px; */
  flex: 1;
`;

const GridItemView = styled(View)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const ItemImg = styled.img`
  width: ${SCREEN_WIDTH * 0.1}px;
  /* height: ${SCREEN_WIDTH * 0.1}px; */
  position: relative;
  top: 0px;
`;
const ItemSlot = styled(Pressable)`
  border: 1px solid rgba(255, 255, 255, 0.7);
  flex-direction: row;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);

  width: 100%;
  /* height: ${SCREEN_WIDTH * 0.137777777777778}px; */
`;
const FilterTab = styled(Pressable)`
  display: flex;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 5px;
`;

type ItemProps = {
  cost: number;
  get_at: Date;
  item_description: string;
  item_img: string;
  item_name: string;
  name: string;
  price: number;
  skil: string;
  type: string;
  usage: string;
  _id: string;
};

type RankingProps = {
  rank: number;
  nickname: string;
  _id: string;
  atata_point: number;
};
function Ranking() {
  // 게임 리스트
  const [myRecord, setMyRecord] = useState({} as RankingProps);
  const [rankingList, setRankingList] = useState([] as RankingProps[]);
  const reqRanking = async () => {
    try {
      const res = await jwtApiRequest("inventory", "GET", {});
      const { myRank, allUserRankings } = res;
      setRankingList(allUserRankings);
      setMyRecord(myRank);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    reqRanking();
  }, []);
  const infomation = useSelector(
    (state: RootState) => state.userState.infomation
  );
  const [scrollDivHeight, setScrollDivHeight] = useState(0);
  // 필터가 바뀌면 해당 필터로 리스트를 새로 만듦
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (scrollRef.current) {
      // const height = scrollRef.current.getBoundingClientRect().height;
      const height = scrollRef.current.clientHeight - 10;
      setScrollDivHeight(height);
    }
  }, []);

  console.log(scrollDivHeight);
  return (
    <Container style={{ flex: 1 }}>
      <EmptyBox height={15} />

      <InitModal>
        <Text.Light_20>랭킹</Text.Light_20>
        <EmptyBox height={10} />
        <View style={{ width: "100%" }}>
          <Text.Light_12>내 랭킹</Text.Light_12>
          <EmptyBox height={5} />
          <ItemSlot>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text.Light_12>{infomation.nickname}</Text.Light_12>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text.Light_12>{myRecord.rank} 위</Text.Light_12>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text.Light_12>{addK(infomation.atata_point)}</Text.Light_12>
              <img
                src={imgSrc.atata_point}
                style={{ width: 16, marginTop: -3 }}
              />
            </View>
          </ItemSlot>
        </View>
        <EmptyBox height={10} />
        <View style={{ borderTop: "solid 1px white", width: "100%" }} />
        <EmptyBox height={10} />
        {/*  */}
        <View ref={scrollRef} style={{ flex: 1, width: "100%" }}>
          <ScrollView
            style={{
              width: "100%",
              maxHeight: scrollDivHeight,
            }}
          >
            {rankingList.map((item) => {
              return (
                <ItemSlot>
                  <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <Text.Light_12>{item.nickname}</Text.Light_12>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text.Light_12>{item.rank} 위</Text.Light_12>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text.Light_12>{addK(item.atata_point)}</Text.Light_12>
                    <img
                      src={imgSrc.atata_point}
                      style={{ width: 16, marginTop: -3 }}
                    />
                  </View>
                </ItemSlot>
              );
            })}
          </ScrollView>
        </View>

        <EmptyBox height={10} />
      </InitModal>

      <EmptyBox height={30} />
    </Container>
  );
}

export default Ranking;

export interface IGroupbyProps {
  group: string;
  list: any[];
}
export const getGroupBy = (group: string, list: any[]): IGroupbyProps[] => {
  const groupByReduce = list.reduce((acc, item) => {
    // 해당 usage가 이미 accumulator에 존재하는지 확인합니다.
    if (!acc[item[group]]) {
      acc[item[group]] = []; // 해당 usage 키로 빈 배열을 생성합니다.
    }
    acc[item[group]].push(item); // 해당 usage 배열에 현재 아이템을 추가합니다.
    return acc;
  }, {});

  const resultList = Object.keys(groupByReduce).map((key) => ({
    group: key,
    list: groupByReduce[key],
  }));

  return resultList;
};
