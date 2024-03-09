import styled from "styled-components";
import { Pressable, View } from "../nativeView";
import { useEffect, useRef, useState } from "react";
import { gameImg } from "../assets/gameImg";
import { Text } from "../assets/fontStyles";
import { Socket, io } from "socket.io-client";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../configs/device";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setCanPopstateEvent, setCanScroll } from "../store/slices/appState";

interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}

const DEFAULT_IMAGE_SIZE = {};
const emptyVal = (width: number) => -((width - width * 0.625) / 2);

const Char = styled.div<{ data: ICharProps }>`
  position: fixed;
  top: 200px;
  left: ${(prop) => emptyVal(prop.data.width)}px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  background-color: red;
`;
const RightChar = styled.div<{ data: ICharProps }>`
  position: absolute;
  /* top: 300px; */
  bottom: 10px;
  right: ${(prop) =>
    emptyVal(prop.data.width) + -emptyVal(prop.data.width) / 3}px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.width * 0.625}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.width * 0.625 * props.data.rows}px;
  background-color: red;
`;

function Test() {
  const [aState, setAState] = useState();
  const [bState, setBState] = useState();
  const [obj, setObj] = useState<ICharProps>({
    imgSrc: gameImg.bounti_stand_left,
    width: SCREEN_WIDTH * 0.2222,
    height: 0,
    cols: 1,
    rows: 1,
  });
  const [current, setCurrent] = useState(0);
  const [action, setAction] = useState<"miss" | "atk" | "stand" | "walk">(
    "stand"
  );
  const [socket, setSocket] = useState<Socket>();
  const timerRef = useRef(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef(-1);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(setCanScroll(false));
    return () => {
      dispatch(setCanScroll(true));
    };
  }, []);

  const xRef = useRef(emptyVal(obj.width));
  const yRef = useRef(10);
  const yLimitRef = useRef(0);
  const jump = () => {
    const now = new Date().getTime();
    if (!divRef.current) return;
    if (action === "miss") {
      if (current > 4) {
        yRef.current = yRef.current - 4;
      } else {
        yRef.current = yRef.current + 4;
      }
      console.log(xRef.current);
      xRef.current = xRef.current + 1;
      divRef.current.style.right = xRef.current + "px";
      // divRef.current.style.left = xRef.current + "px";
      divRef.current.style.bottom = yRef.current + "px";
    }

    const currentCol = current % obj.cols;
    const currentRow = Math.floor(current / obj.cols);
    const bgPosition = `${-obj.width * currentCol}px ${
      -obj.height * currentRow
    }px`;
    timerRef.current++;

    if (timerRef.current - now <= 0) {
      console.log(bgPosition);
      //   console.log("움직임");
      timerRef.current = new Date().getTime() + 60;
      //   timerRef.current = new Date().getTime() + 80;
      divRef.current.style.backgroundPosition = bgPosition;
      if (current >= 8) {
        // divRef.current.style.backgroundImage = `url(${gameImg.right_cowboy})`;
        setObj((prev) => ({
          ...prev,
          width: 256,
          cols: 1,
          rows: 1,
          imgSrc: gameImg.bounti_stand_left,
        }));
        setAction("stand");
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    } else {
    }
    animationRef.current = requestAnimationFrame(jump);
  };

  useEffect(() => {
    if (action === "miss") {
      setObj((prev) => ({
        ...prev,
        width: 256,
        cols: 8,
        rows: 1,
        imgSrc: gameImg.bounti_jump_left_1x8,
      }));
      animationRef.current = requestAnimationFrame(jump);
    } else if (action === "atk") {
      setObj((prev) => ({
        ...prev,
        width: 256,
        cols: 2,
        rows: 3,
        imgSrc: gameImg.bounti_atk_left_3x2,
      }));
      animationRef.current = requestAnimationFrame(jump);
    } else if (action === "walk") {
      setObj((prev) => ({
        ...prev,
        width: 128,
        cols: 4,
        rows: 1,
        imgSrc: gameImg.bounti_walk_right_1x4,
      }));
      animationRef.current = requestAnimationFrame(jump);
    }
    return () => {
      if (animationRef.current) {
        // console.log("언마운트");
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [current, action]);

  //   useEffect(() => {
  //     const socket = io(`${"http://192.168.55.72:8000"}`, {
  //       transports: ["websocket"],
  //     });
  //     // 연결 성공시
  //     socket.on("connect", () => {
  //       console.log("당신은 소켓에 연결되었다.");
  //     });

  //     // return () => {
  //     //   socket.disconnect();
  //     // };
  //   }, []);
  //   requestAnimationFrame(jump);

  //   console.log(gameImg.sprite_cow_left_jump);
  return (
    <View
      style={{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
      }}
    >
      <RightChar ref={divRef} data={obj}></RightChar>
      <RightChar
        ref={divRef}
        data={obj}
        style={{
          right:
            emptyVal(obj.width) +
            -emptyVal(obj.width) / 3 +
            obj.width * 0.75 * 1,
          backgroundColor: "pink",
        }}
      ></RightChar>
      <RightChar
        ref={divRef}
        data={obj}
        style={{
          right:
            emptyVal(obj.width) +
            -emptyVal(obj.width) / 3 +
            obj.width * 0.75 * 2,
          backgroundColor: "blue",
        }}
      ></RightChar>
      <RightChar
        ref={divRef}
        data={obj}
        style={{
          right:
            emptyVal(obj.width) +
            -emptyVal(obj.width) / 3 +
            obj.width * 0.75 * 3,
          backgroundColor: "green",
        }}
      ></RightChar>
      <RightChar
        ref={divRef}
        data={obj}
        style={{
          right:
            emptyVal(obj.width) +
            -emptyVal(obj.width) / 3 +
            obj.width * 0.75 * 4,
          backgroundColor: "yellow",
        }}
      ></RightChar>
      <RightChar
        ref={divRef}
        data={obj}
        style={{
          right:
            emptyVal(obj.width) +
            -emptyVal(obj.width) / 3 +
            obj.width * 0.75 * 5,
          backgroundColor: "purple",
        }}
      ></RightChar>
      {/* <Char2
        ref={divRef}
        data={{ ...obj, imgSrc: gameImg.left_cowboy }}
      ></Char2> */}
      <Pressable
        onClick={() => {
          console.log("눌리긴해?");
          setAction("miss");
        }}
      >
        <Text.Regular_36>점프!</Text.Regular_36>
      </Pressable>
      <Pressable
        onClick={() => {
          console.log("눌리긴해?");
          setAction("walk");
        }}
      >
        <Text.Regular_36>걷기</Text.Regular_36>
      </Pressable>
      <Pressable
        onClick={() => {
          console.log("눌리긴해?");
          setAction("atk");
        }}
      >
        <Text.Regular_36>공격!</Text.Regular_36>
      </Pressable>

      <Pressable
        onClick={() => {
          //   socket;
          setSocket(
            io(`${"http://192.168.55.72:8000"}`, {
              transports: ["websocket"],
            })
          );
        }}
      >
        <Text.Regular_20>소켓룸 입장</Text.Regular_20>
      </Pressable>
    </View>
  );
}

export default Test;
