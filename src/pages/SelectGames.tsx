import { Fragment, useEffect, useRef, useState } from "react";
import { Text } from "../assets/fontStyles";
import { ScrollView, View } from "../nativeView";
import { Container, EmptyBox } from "../styles";
import GameCard from "../components/designs/Card";
import { imgSrc } from "../assets/img";
import { SCREEN_WIDTH } from "../configs/device";

const caculMoveValue = SCREEN_WIDTH * 0.736111111;

const SelectGames = () => {
  const games = [
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "사천성", regDate: "오늘", img: imgSrc.apple },
    { title: "테트리스", regDate: "그저께", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
  ];
  const initOffsetX = SCREEN_WIDTH - SCREEN_WIDTH * 0.2 * 2;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 초기 스크롤 위치를 설정합니다.
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = initOffsetX;
    }
  }, []);

  const [direction, setDirection] = useState<"init" | "R" | "L">("init");
  const [startX, setStartX] = useState(0);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {}, []);
  useEffect(() => {
    console.log("시작 또는 종료");
    if (dragging) {
    }
  }, [dragging]);
  const dragRef = useRef(0);

  const draging = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const currentX = e.touches[0].clientX;
    const prevX = scrollRef.current.scrollLeft;
    // if (currentX > startX) {
    //   //크면 좌측 left 로 가야하니까 --
    //   setX(prevX - 6);
    // } else {
    //   //우측  ++
    //   setX(prevX + 6);
    // }
    console.log(scrollRef.current.scrollLeft);
  };
  // useEffect(() => {
  //   if (!scrollRef.current) return;
  //   scrollRef.current.scrollLeft = x;
  // }, [x]);
  return (
    <Container>
      <Text.Esa_Bold_12
        onClick={() => {
          console.log(startX);
          if (!scrollRef.current) return;
          scrollRef.current.scrollLeft = startX + 265;
        }}
      >
        클릭ggg
      </Text.Esa_Bold_12>
      <ScrollView
        scrollDisenable={false}
        onTouchStart={(e) => {
          setDragging(true);
          setStartX(scrollRef.current!.scrollLeft);
        }}
        onTouchMove={(e) => {
          const currentX = scrollRef.current!.scrollLeft;
          const min = startX - caculMoveValue + caculMoveValue / 2;
          const max = startX + caculMoveValue - caculMoveValue / 2;
          if (currentX <= min) {
            setDragging(false);
            setDirection("L");
            return;
          } else if (currentX >= max) {
            setDragging(false);
            setDirection("R");
            return;
          } else {
          }
          console.log(`최소 ${min} 최대 ${max}`, "현재", currentX);
        }}
        onTouchEnd={(e) => {
          const isRef = scrollRef.current;
          if (!isRef) return;
          if (direction === "R") {
            const rightMove = startX + caculMoveValue;
            isRef.scrollLeft = rightMove;
          } else if (direction === "L") {
            const leftMove = startX - caculMoveValue;
            isRef.scrollLeft = leftMove;
          }
          setStartX(0);
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
