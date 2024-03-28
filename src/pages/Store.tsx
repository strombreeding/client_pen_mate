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
import { addK } from "../utils/randomCnt";

const InitModal = styled(View)`
  z-index: 2;
  position: relative;
  padding: 15px;
  border-radius: 5px 5px 5px 5px;
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
  margin: 3px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  align-items: center;
  justify-content: flex-start;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  width: ${SCREEN_WIDTH * 0.137777777777778}px;
  height: ${SCREEN_WIDTH * 0.137777777777778}px;
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
type GroupProps = {
  _id: string;
  items: ItemProps[];
};
function Store() {
  const [allStoreItems, setAllStoreItems] = useState([] as GroupProps[]);
  const [filterd, setFilterd] = useState("");
  const [filterList, setFilterList] = useState([] as string[]);
  const [storeList, setStoreList] = useState([] as ItemProps[]);
  const [inventoryList, setInventoryList] = useState(
    [] as { _id: string; item: ItemProps; cnt: number }[]
  );
  const [selectItem, setSelectItem] = useState({
    item_description: "",
    item_img: "",
    item_name: "",
    name: "",
    item_price: 0,
    visible: false,
    _id: "",
  } as IStorePopupProps);
  // 인벤토리 가져와야함

  console.log(inventoryList, "####################");
  const reqItemList = async () => {
    const res = await axios.get(SERVER_URI + "item");
    const filterNameList = res.data.map((item: GroupProps) => {
      return item._id;
    });
    setAllStoreItems(res.data);
    setFilterList(filterNameList);
    setFilterd("stuff");
  };

  const reqinventoryList = async () => {
    try {
      const res = await jwtApiRequest("inventory/my", "GET", {});
      console.log(res);
      setInventoryList(res);
    } catch (err: any) {
      console.log(err);
    }
  };

  const clickItem = (item: ItemProps) => () => {
    setSelectItem((prev) => ({
      item_description: item.item_description,
      item_img: item.item_img,
      item_name: item.item_name,
      item_price: item.price,
      visible: true,
      _id: item._id,
      name: item.name,
    }));
  };

  useEffect(() => {
    reqItemList();
    reqinventoryList();
  }, []);

  // 필터가 바뀌면 해당 필터로 리스트를 새로 만듦
  useEffect(() => {
    if (filterd === "") return;
    const storeIdx = allStoreItems.findIndex((item) => item._id === filterd);
    // const inventoryIdx = inventoryList.findIndex(
    //   (item) => item._id === filterd
    // );
    setStoreList(allStoreItems[storeIdx].items);
  }, [filterd]);

  return (
    <Container style={{ flex: 1 }}>
      <StorePopup
        item_name={selectItem.item_name}
        item_description={selectItem.item_description}
        item_price={selectItem.item_price}
        item_img={selectItem.item_img}
        visible={selectItem.visible}
        setSelectItem={setSelectItem}
        _id={selectItem._id}
        name={selectItem.name}
        setInventoryList={setInventoryList}
      />
      <EmptyBox height={15} />

      <InitModal>
        <Text.Light_20>스토어</Text.Light_20>

        {/* 필터 */}
        <ScrollView
          style={{
            justifyContent: "flex-start",
            minWidth: "100%",
            maxWidth: "100%",
          }}
          horizontal={true}
        >
          {filterList.map((item, index) => {
            return (
              <FilterTab
                key={index}
                onClick={() => {
                  setFilterd(item);
                }}
                style={{ opacity: item === filterd ? 0.2 : 1 }}
              >
                <Text.Light_12>{item}</Text.Light_12>
              </FilterTab>
            );
          })}
        </ScrollView>

        {/* 아이템리스트 */}
        <ScrollView
          style={{
            height: SCREEN_HEIGHT / 5,
            width: "100%",
          }}
        >
          <GridItemView>
            {storeList.map((item, i) => {
              return (
                <ItemSlot
                  style={{ opacity: item.name === filterd ? 0.2 : 1 }}
                  key={i}
                  onClick={clickItem(item)}
                >
                  <ItemImg src={item.item_img} />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      paddingTop: 3,
                      width: "98%",
                      backgroundColor: "rgba(0,0,0,0.7)",
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text.Light_12>{addK(item.price)}</Text.Light_12>
                      <img
                        src={imgSrc.atata_stone}
                        style={{
                          width: 16,
                          marginTop: -3,
                          marginRight: -2,
                        }}
                        alt=""
                      />
                    </View>
                  </View>
                </ItemSlot>
              );
            })}
          </GridItemView>
        </ScrollView>
        <EmptyBox height={10} />
      </InitModal>

      {/*  인벤토리 */}
      <InitModal>
        <Text.Light_20>인벤토리</Text.Light_20>
        <ScrollView
          style={{
            // height: SCREEN_HEIGHT / 5,
            flex: 1,
            width: "100%",
          }}
        >
          <GridItemView>
            {inventoryList.map((inventoryItem, i) => {
              return (
                <ItemSlot key={i}>
                  <ItemImg src={inventoryItem.item.item_img} />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      paddingTop: 3,
                      width: "98%",
                      backgroundColor: "rgba(0,0,0,0.7)",
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text.Light_12>{addK(inventoryItem.cnt)}</Text.Light_12>
                  </View>
                </ItemSlot>
              );
            })}
          </GridItemView>
        </ScrollView>
        <EmptyBox height={10} />
      </InitModal>
      <EmptyBox height={30} />
    </Container>
  );
}

export default Store;

export interface IGroupbyProps {
  group: string;
  list: any[];
}
