import styled from "styled-components";
import { View } from "../nativeView";
import {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { Text } from "../assets/fontStyles";
import { PrevBtn } from "./navigations/BottomPrevNext";
import { EmptyBox } from "../styles";
import { colors } from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { imgSrc } from "../assets/img";
import { jwtApiRequest } from "../apis/jwtApiService";
import Shake from "./animations/Shake";
import { updateCostState } from "../utils/localStorage";
import { setInfomation } from "../store/slices/userState";
import { setModal, setPopup } from "../store/slices/appState";

const Wraper = styled(View)`
  position: absolute;
  flex: 1;
  width: 100%;
  height: ${SCREEN_HEIGHT}px;
  z-index: 10000011111;
  background-color: rgba(0, 0, 0, 0.3);

  align-items: center;
  justify-content: center;
`;

const Box = styled(View)`
  position: absolute;
  top: 13%;
  left: 5%;
  right: 5%;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  min-height: ${150}px;
  border: 0.5px solid rgba(255, 255, 255, 0.7);
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px) contrast(30%);
  -webkit-backdrop-filter: blur(10px) contrast(30%);

  border-radius: 15px;
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
export interface IStorePopupProps {
  _id: string;
  item_name: string;
  item_description: string;
  item_price: number;
  item_img: string;
  visible: boolean;
  name: string;
  setSelectItem?: Dispatch<SetStateAction<IStorePopupProps>>;
  setInventoryList?: Dispatch<
    SetStateAction<{ _id: string; item: ItemProps; cnt: number }[]>
  >;
}

const Input = styled.input`
  background-color: transparent;
  padding: 0px;
  border-color: transparent;
  text-align: start;
  outline: none;
  caret-color: white;
  color: white;
  font-family: "esamanruLight";
  font-size: 16px;
  margin-left: 3px;
  color: ${colors.Accent};
`;

function StorePopup({
  _id,
  visible,
  item_description,
  item_img,
  item_name,
  item_price,
  setSelectItem,
  name,
  setInventoryList,
}: IStorePopupProps) {
  const [cnt, setCnt] = useState("1");
  const [errMsg, setErrMsg] = useState("");
  const boxRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const reqPay = async () => {
    if (Number(cnt) <= 0 || cnt == null || cnt == "") {
      setErrMsg("수량을 입력해주세요.");
      return;
    }
    const at = window.localStorage.getItem("at");
    try {
      const res = await jwtApiRequest("payment", "POST", {
        at,
        data: {
          price: item_price,
          _id,
          cnt: Number(cnt),
          item_name,
        },
      });
      reqinventoryList();
      updateCostState(res.updateSource);
      dispatch(setInfomation(res.updateSource));
      dispatch(
        setModal({
          show: true,
          title: "구매 완료",
          description: `[ ${res.result.item.name} ] 품목 [ ${cnt} ]개를 성공적으로 구입했습니다.`,
          btnText: "완료",
        })
      );
      reset();
    } catch (err: any) {
      console.log(err);
      console.log(err.response.data.message);
      if (err.response.data.message.includes("not enough")) {
        setErrMsg("재화가 부족합니다.");
      }
    }
  };

  const reqinventoryList = async () => {
    try {
      const res = await jwtApiRequest("inventory/my", "GET", {});
      console.log(res, "tlqkf");
      if (setInventoryList) {
        setInventoryList(res);
      }
    } catch (err: any) {
      console.log("씹새야");
      console.log(err);
    }
  };

  const reset = () => {
    if (setSelectItem) {
      setSelectItem((prev) => ({
        item_description: "",
        item_img: "",
        item_name: "",
        item_price: 0,
        _id: "",
        visible: false,
        name: "",
      }));
      setCnt("1");
      setErrMsg("");
    }
  };

  const onChange = (e: any) => {
    let value = e.currentTarget.value;
    if (value[0] === "0" || value === "") {
      value.substring(0, 1);
      value = "";
    }
    setErrMsg("");
    setCnt(value);
  };

  useEffect(() => {
    if (!boxRef.current) return;
  }, []);

  if (!visible) return <></>;
  return (
    <Wraper>
      <Box ref={boxRef}>
        <View style={{ alignItems: "center" }}>
          <Text.Regular_24>{name}</Text.Regular_24>

          <EmptyBox height={5} />

          <img src={item_img} style={{ width: 80, aspectRatio: 1 }} />

          <EmptyBox height={15} />

          <Text.Regular_16>{item_description}</Text.Regular_16>

          <EmptyBox height={25} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text.Light_16>수량 :</Text.Light_16>
            <Input
              pattern="\d*"
              type="number"
              min={1}
              max={15}
              value={cnt}
              onChange={onChange}
            />
          </View>
          <EmptyBox height={15} />
          <EmptyBox height={10} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text.Light_16>가격 :</Text.Light_16>
            <Text.Light_16>(</Text.Light_16>
            <img
              src={imgSrc.atata_stone}
              style={{ width: 20, marginTop: -3, marginLeft: -3 }}
            />
            <Text.Light_16 color={colors.Accent_Red}>x</Text.Light_16>
            <Text.Light_16 color={colors.Accent_Red}>{cnt}</Text.Light_16>
            <Text.Light_16>)</Text.Light_16>
            <Text.Light_16>=</Text.Light_16>
            <Text.Light_16 color={colors.Accent_Red}>
              {item_price * Number(cnt)}
            </Text.Light_16>
            <img
              src={imgSrc.atata_stone}
              style={{ width: 20, marginTop: -3, marginLeft: -3 }}
            />
          </View>

          <EmptyBox height={10} />

          {errMsg.length > 0 && (
            <Shake>
              <Text.Regular_16 color={colors.Accent_Red}>
                {errMsg}
              </Text.Regular_16>
            </Shake>
          )}

          <EmptyBox height={35} />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
          }}
        >
          <>
            <PrevBtn onClick={reset}>
              <Text.Light_16>취소</Text.Light_16>
            </PrevBtn>
            <EmptyBox width={5} />
          </>
          <PrevBtn
            onClick={reqPay}
            style={{ backgroundColor: colors.Main_Button1 }}
          >
            <Text.Light_16>구매</Text.Light_16>
          </PrevBtn>
        </View>
      </Box>
    </Wraper>
  );
}

export default memo(StorePopup);
