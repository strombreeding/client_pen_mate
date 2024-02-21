import { Fragment, useEffect, useRef, useState } from "react";
import { Text } from "../assets/fontStyles";
import { ScrollView, View } from "../nativeView";
import { Container, EmptyBox } from "../styles";
import GameCard from "../components/designs/Card";
import { imgSrc } from "../assets/img";
import { SCREEN_WIDTH } from "../configs/device";

const initOffsetX = SCREEN_WIDTH - SCREEN_WIDTH * 0.2 * 2;
const caculMoveValue = SCREEN_WIDTH * 0.736111111;

const SelectGames = () => {
  const [games, setGames] = useState([
    { title: "테트리스", regDate: "그저께", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "사천성+", regDate: "오늘", img: imgSrc.apple },
    { title: "테트리스", regDate: "그저께", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const selectIdx = 2;

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 초기 스크롤 위치를 설정합니다.
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = initOffsetX + caculMoveValue;
    }
  }, []);

  const infinityArr = (direction: "R" | "L") => {
    const currentGame = { ...games[selectIdx] };
    const newArr = [...games];
    if (direction === "L") {
      newArr.unshift(currentGame);
    } else if (direction === "R") {
      newArr.push(currentGame);
    }
    setGames([...newArr]);
  };

  // const [dragRef.current, setdragRef.current] = useState(0);
  // const [dragging, setDragging] = useState(false);
  const dragRef = useRef(0);
  const draggingRef = useRef(false);
  const directionRef = useRef<"R" | "L" | "Init">("Init");

  return (
    <Container>
      <ScrollView
        onTouchStart={(e) => {
          console.log("스크롤 시작 ! ", scrollRef.current!.scrollLeft);
          // setdragRef.current(scrollRef.current!.scrollLeft);
          dragRef.current = scrollRef.current!.scrollLeft;
          draggingRef.current = true;
        }}
        onTouchMove={(e) => {
          if (!draggingRef.current) return;

          const currentX = scrollRef.current!.scrollLeft;
          // const min = dragRef.current - caculMoveValue + caculMoveValue - 40;
          // const max = dragRef.current + caculMoveValue - caculMoveValue - 40;
          console.log("이동한 값", dragRef.current - currentX);
          if (dragRef.current - currentX >= 1) {
            directionRef.current = "L";
            // setSelectIdx(selectIdx - 1);
            draggingRef.current = false;
            return;
          } else if ((dragRef.current - currentX) * -1 >= 1) {
            directionRef.current = "R";
            // setSelectIdx(selectIdx + 1);
            draggingRef.current = false;
            return;
          } else {
            directionRef.current = "Init";
            // setSelectIdx(selectIdx);
            // draggingRef.current = false;
            return;
          }

          // if (currentX <= min) {
          //   return;
          // } else if (currentX >= max) {
          //   return;
          // }
          // console.log(`최소 ${min} 최대 ${max}`, "현재", currentX);
        }}
        onTouchEnd={(e) => {
          const isRef = scrollRef.current;
          console.log(selectIdx);
          if (!isRef) return;
          if (directionRef.current === "R") {
            isRef.scrollLeft = initOffsetX + caculMoveValue;
          } else if (directionRef.current === "L") {
            isRef.scrollLeft = initOffsetX + caculMoveValue;
          } else {
            isRef.scrollLeft = initOffsetX + caculMoveValue;
          }
          dragRef.current = 0;
          draggingRef.current = false;
        }}
        ref={scrollRef}
        horizontal
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
        }}
      >
        {games.map((gameProp, index) => {
          return (
            <GameCard img={gameProp.img} title={gameProp.title} key={index} />
          );
        })}
      </ScrollView>
    </Container>
  );
};

export default SelectGames;
