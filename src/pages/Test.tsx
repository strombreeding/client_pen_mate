import styled from "styled-components";
import { Pressable, View } from "../nativeView";
import { useEffect, useRef, useState } from "react";
import { gameImg } from "../assets/gameImg";
import { Text } from "../assets/fontStyles";
import { Socket, io } from "socket.io-client";

interface ICharProps {
  imgSrc: string;
  width: number;
  height: number;
  cols: number;
  rows: number;
}
const Char = styled.div<{ data: ICharProps }>`
  position: absolute;
  top: 200px;
  left: 100px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.height}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.height * props.data.rows}px;
`;
const Char2 = styled.div<{ data: ICharProps }>`
  position: absolute;
  top: 200px;
  right: 100px;
  background-image: url(${(props) => props.data.imgSrc});
  width: ${(props) => props.data.width}px;
  height: ${(props) => props.data.height}px;
  background-size: ${(props) => props.data.width * props.data.cols}px
    ${(props) => props.data.height * props.data.rows}px;
`;

function Test() {
  const [obj, setObj] = useState<ICharProps>({
    imgSrc: gameImg.bounti_stand_right,
    width: 128,
    height: 80,
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

  const xRef = useRef(100);
  const yRef = useRef(200);
  const jump = () => {
    const now = new Date().getTime();
    if (!divRef.current) return;
    if (action === "miss") {
      xRef.current = xRef.current + 1;
      yRef.current = yRef.current + 1.5;
      divRef.current.style.left = xRef.current + "px";
      divRef.current.style.top = yRef.current + "px";
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
      timerRef.current = new Date().getTime() + 80;
      //   timerRef.current = new Date().getTime() + 80;
      divRef.current.style.backgroundPosition = bgPosition;
      if (current >= 8) {
        // divRef.current.style.backgroundImage = `url(${gameImg.right_cowboy})`;
        setObj((prev) => ({
          ...prev,
          width: 128,
          cols: 1,
          rows: 1,
          imgSrc: gameImg.bounti_stand_right,
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
        width: 128,
        cols: 8,
        rows: 1,
        imgSrc: gameImg.bounti_jump_right_1x8,
      }));
      animationRef.current = requestAnimationFrame(jump);
    } else if (action === "atk") {
      setObj((prev) => ({
        ...prev,
        width: 128,
        cols: 2,
        rows: 3,
        imgSrc: gameImg.bounti_atk_right_3x2,
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
    <View>
      <Char ref={divRef} data={obj}></Char>
      {/* <Char2
        ref={divRef}
        data={{ ...obj, imgSrc: gameImg.left_cowboy }}
      ></Char2> */}
      <Pressable
        style={{ backgroundColor: "red" }}
        onClick={() => {
          console.log("눌리긴해?");
          setAction("miss");
        }}
      >
        <Text.Regular_36>점프!</Text.Regular_36>
      </Pressable>
      <Pressable
        style={{ backgroundColor: "red" }}
        onClick={() => {
          console.log("눌리긴해?");
          setAction("walk");
        }}
      >
        <Text.Regular_36>걷기</Text.Regular_36>
      </Pressable>
      <Pressable
        style={{ backgroundColor: "red" }}
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
