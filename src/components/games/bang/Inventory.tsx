import styled from "styled-components";
import { Pressable, ScrollView, View } from "../../../nativeView";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../configs/device";
import { Text } from "../../../assets/fontStyles";
import { EmptyBox } from "../../../styles";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Ablilty,
  IMessageProps,
  IStatusProps,
  ItemProps,
  TerminelProps,
} from "../../../pages/Bang";
import { gameImg } from "../../../assets/gameImg";
import { imgSrc } from "../../../assets/img";
import SoundPressable from "../../designs/SoundPressable";
import axiosInstance from "../../../apis/axiosInstance";
import { jwtApiRequest } from "../../../apis/jwtApiService";
import { IRewardProps } from "../../../pages/Reward";
import { getDecryptedCookie } from "../../../utils/cookies";

const InitModal = styled(View)`
  z-index: 2;
  position: absolute;
  top: ${SCREEN_HEIGHT / 7}px;
  padding: 20px;
  width: 90%;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px) contrast(90%);
  -webkit-backdrop-filter: blur(2px) contrast(90%);
  border-radius: 20px;
`;

const GridItemView = styled(View)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
const ItemImg = styled.img`
  width: ${SCREEN_WIDTH * 0.137777777777778}px;
  height: ${SCREEN_WIDTH * 0.137777777777778}px;
`;
const ItemSlot = styled(Pressable)`
  margin: 3px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
`;

interface InventoryProps {
  bag: IInvetoryProps[];
  ability: Ablilty;
  setBag: Dispatch<SetStateAction<IInvetoryProps[]>>;
  setAbility: Dispatch<SetStateAction<Ablilty>>;
  setStatus: Dispatch<SetStateAction<IStatusProps>>;
  setTerminel: Dispatch<SetStateAction<TerminelProps>>;
  sendData: (data: IMessageProps) => () => void;
  setGameDatas: Dispatch<SetStateAction<IRewardProps>>;
}
type UpdateItemProps = {
  price: number;
  _id: string;
  cnt: number;
  item_name: string;
};
export interface IInvetoryProps {
  cnt?: number;
  item?: {
    cost: number;
    item_description: string;
    item_img: string;
    name: string;
    item_name: string;
    type: string;
    skil: string;
  };
}
function Inventory({
  ability,
  bag,
  setBag,
  setAbility,
  sendData,
  setStatus,
  setTerminel,
  setGameDatas,
}: InventoryProps) {
  const [cnt, setCnt] = useState(16);
  const [checkItem, setCheckItem] = useState<number[]>([]);
  const [inventory, setInventory] = useState<IInvetoryProps[]>(
    [] as IInvetoryProps[]
  );
  const clearItem = (item: IInvetoryProps, index: number) => () => {
    if (!item.item) return;
    const newBag = [...bag];
    newBag.splice(index, 1);
    newBag.push({});
    setBag([...newBag]);
    const newCheckItem = [...checkItem];
    newCheckItem.splice(index, 1);
    const newAbility = { ...ability };
    if (item.item.type === "atk") {
      newAbility.atk = newAbility.atk - item.item.cost!;
    } else if (item.item.type === "util") {
      newAbility.subHealth = newAbility.subHealth - item.item.cost!;
    }
    if (item.item.skil != "") {
      const skilIdx = ability.skil.indexOf(item.item.skil);
      newAbility.skil.splice(skilIdx, 1);
      console.log(item.item.skil, skilIdx);
    }
    console.log(item.item.skil);
    console.log(item);

    setAbility({ ...newAbility });
    setCheckItem([...newCheckItem]);
  };
  const itemUse = (item: IInvetoryProps, index: number) => () => {
    if (!item.item || !item.cnt) return;
    if (checkItem.includes(index)) return;
    if (bag[2].item?.item_img != undefined) return;
    const current = bag.filter((item, a) => Object.values(item).length > 1);
    console.log(current.length);
    const newBag = [...bag];
    const newIdx = current.length;
    newBag[newIdx] = {
      cnt: item.cnt,
      item: {
        item_name: item.item.item_name,
        name: item.item.name,
        cost: item.item.cost,
        item_description: item.item.item_description,
        item_img: item.item.item_img,
        type: item.item.type,
        skil: item.item.skil,
      },
    };
    const newAbility = { ...ability };
    if (item.item.type === "atk") {
      newAbility.atk = newAbility.atk + item.item.cost!;
    } else if (item.item.type === "util") {
      newAbility.subHealth = newAbility.subHealth + item.item.cost!;
    }
    if (item.item.skil) {
      newAbility.skil.push(item.item.skil!);
    }
    console.log(item.item.skil);
    setAbility({ ...newAbility });
    setCheckItem([...checkItem, index]);
    setBag([...newBag]);
  };
  const initDone = async () => {
    const cookies = getDecryptedCookie("bang");

    const dataObj = {
      ...ability,
    };
    const costObjList: { type: string; cost: number }[] = [];
    const consumItemList = bag
      .filter((item) => item.item && item.item.item_name)
      .map((item) => {
        if (!item.item || !item.cnt) return;
        costObjList.push({ type: item.item.item_name, cost: 1 });
        return { cnt: item.cnt - 1, item_name: item.item.item_name };
      });
    console.log(consumItemList);
    console.log(costObjList);

    // return;
    const res = await jwtApiRequest("inventory", "POST", {
      data: consumItemList,
    });
    console.log(res);
    // 바운티라면 공격력 1.5배
    // dataObj.atk = cookies.meBounti
    //   ? Math.floor(dataObj.atk * 1.5)
    //   : dataObj.atk;
    sendData({ type: "상대능력", data: dataObj })();
    setGameDatas((prev) => ({
      ...prev,
      cost_obj: [...prev.cost_obj, ...costObjList],
    }));
    setStatus((prev) => ({
      ...prev,
      me: {
        ...prev.me,
        health: dataObj.health,
        subHealth: dataObj.subHealth,
      },
    }));
    setTerminel((prev) => ({ ...prev, me: "initDone" }));
  };

  useEffect(() => {
    if (cnt !== 0) {
      const timeout = setTimeout(() => {
        setCnt(cnt - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (cnt === 0) {
      initDone();
    }
  }, [cnt]);

  const reqMyInventory = async () => {
    try {
      const res = await jwtApiRequest("inventory/my?" + "type=bang", "GET", {});
      console.log(res);
      let skulCnt = 0;
      const removeSkul = res.filter((item: any) => {
        if (item.item.item_name === "skul") {
          console.log(item);
          skulCnt = item.cnt;
        }
        return item.item.item_name !== "skul";
      });
      setGameDatas((prev) => ({ ...prev, skul: skulCnt }));
      sendData({ type: "skulCnt", data: skulCnt })();
      console.log(removeSkul);
      setInventory(removeSkul);
    } catch (err) {
      console.log(err, "zz");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      reqMyInventory();
    }, 1000);
  }, []);
  return (
    <InitModal>
      <Text.SemiBold_32>{cnt}</Text.SemiBold_32>
      <Text.Light_32>장착</Text.Light_32>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {bag.map((item, index) => {
          if (!item.item) return <></>;
          return (
            <ItemSlot>
              {item.item.item_img == null ? (
                <EmptyBox
                  width={SCREEN_WIDTH * 0.137777777777778}
                  height={SCREEN_WIDTH * 0.137777777777778}
                />
              ) : (
                <>
                  <Pressable
                    onClick={clearItem(item, index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <img src={imgSrc.close} width={20} />
                  </Pressable>
                  <ItemImg src={item.item.item_img} />
                </>
              )}
            </ItemSlot>
          );
        })}
      </View>
      <EmptyBox height={10} />
      <Text.Light_32>인벤토리</Text.Light_32>
      <ScrollView style={{ height: SCREEN_HEIGHT / 5 }}>
        <GridItemView>
          {inventory.map((item, index) => {
            if (!item.item) return <></>;
            return (
              <ItemSlot
                style={checkItem.includes(index) ? { opacity: 0.3 } : {}}
                onClick={itemUse(item, index)}
              >
                <ItemImg src={item.item.item_img} />
                <Text.Light_12
                  style={{ position: "absolute", bottom: 2, right: 5 }}
                >
                  {item.cnt}
                </Text.Light_12>
              </ItemSlot>
            );
          })}
        </GridItemView>
      </ScrollView>
      <EmptyBox height={10} />

      <View style={{ width: "100%", alignItems: "center" }}>
        <Text.Light_32>능력치</Text.Light_32>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>공격력</Text.Light_16>
          <Text.Light_16>{ability.atk}</Text.Light_16>
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>체력</Text.Light_16>
          <Text.Light_16>{ability.health}</Text.Light_16>
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>방어구</Text.Light_16>
          <Text.Light_16>{ability.subHealth}</Text.Light_16>
        </View>
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text.Light_16>특수능력</Text.Light_16>
          <Text.Light_16>{[...ability.skil]}</Text.Light_16>
        </View>
      </View>
      <EmptyBox height={20} />
      <SoundPressable onClick={initDone}>
        <Text.Light_24>정비 완료</Text.Light_24>
      </SoundPressable>
    </InitModal>
  );
}

export default Inventory;
