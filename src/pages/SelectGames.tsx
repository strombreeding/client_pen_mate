import {
  Fragment,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { Text } from "../assets/fontStyles";
import { ScrollView, View } from "../nativeView";
import { Container, EmptyBox } from "../styles";
import GameCard from "../components/designs/Card";
import { imgSrc } from "../assets/img";
import { SCREEN_WIDTH } from "../configs/device";
import Carousel from "./test";

const initOffsetX = SCREEN_WIDTH - SCREEN_WIDTH * 0.2 * 2;
const caculMoveValue = SCREEN_WIDTH * 0.736111111;
let touchStartX = 0;
let touchEndX = 0;
const SelectGames = () => {
  const [games, setGames] = useState([
    { title: "사천성+", regDate: "오늘", img: imgSrc.apple },
    { title: "뱅", regDate: "어제", img: imgSrc.apple },
    { title: "테트리스", regDate: "그저께", img: imgSrc.apple },
  ]);
  const langeRef = useRef<number[]>([]);

  const [idx, setIdx] = useState(2);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // const [x, setX] = useState(initOffsetX);

  useEffect(() => {
    const startData = games[0];
    const endData = games[games.length - 1];
    const newList = [startData, endData, ...games, startData, endData];

    let subLange = initOffsetX;
    langeRef.current = newList.map((game, i) => {
      if (i === 0) return subLange - caculMoveValue;

      if (i === 1) return subLange;

      subLange = subLange + caculMoveValue;

      return subLange;
    });
    setGames(newList);
  }, []);

  useEffect(() => {
    if (scrollRef.current === null) return;
    console.log(idx);
    scrollRef.current.style.transform = `translateX(-${langeRef.current[idx]}px)`;
  }, [idx]);

  const moveToNthSlide = (index: number) => {
    setTimeout(() => {
      setIdx(index);
      if (scrollRef.current !== null) {
        scrollRef.current.style.transition = "";
      }
    }, 250);
  };

  const handleSwipe = (direction: number) => {
    const newIndex = idx + direction;

    if (newIndex === games.length - 2) {
      moveToNthSlide(2);
    } else if (newIndex === 1) {
      moveToNthSlide(games.length - 3);
    }

    setIdx((prev) => prev + direction);
    if (scrollRef.current !== null) {
      scrollRef.current.style.transition = "all 0.25s ease-in-out";
    }
  };

  const dragRef = useRef(0);
  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.changedTouches[0].clientX;
    dragRef.current = langeRef.current[idx];
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (scrollRef.current == null) return;
    if (dragRef.current < 0) return;
    const currTouchX = e.nativeEvent.changedTouches[0].clientX;
    if (touchStartX > currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        langeRef.current[idx] + 8
      }px)`;
      dragRef.current = -1;
    } else if (touchStartX < currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        langeRef.current[idx] - 8
      }px)`;
      dragRef.current = -1;
    }
  };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;
    dragRef.current = -1;
    if (touchStartX >= touchEndX) {
      handleSwipe(1);
    } else {
      handleSwipe(-1);
    }
  };

  return (
    <Container style={{ overflow: "hidden" }}>
      {/* <Carousel carouselList={games.map((item) => item.img)} /> */}
      <View
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        ref={scrollRef}
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          flexDirection: "row",
        }}
      >
        {games.map((gameProp, index) => {
          return (
            <GameCard
              img={gameProp.img}
              title={gameProp.title}
              key={index}
              anythings={index === idx}
            />
          );
        })}
      </View>
      <ScrollView scrollDisenable horizontal></ScrollView>
    </Container>
  );
};

export default SelectGames;
