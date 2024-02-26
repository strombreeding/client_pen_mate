import {
  Fragment,
  MouseEventHandler,
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
import { useNavigate, useNavigation } from "react-router-dom";
import { gameImg } from "../assets/gameImg";

const initOffsetX = SCREEN_WIDTH - SCREEN_WIDTH * 0.2 * 2;
const caculMoveValue = SCREEN_WIDTH * 0.736111111;
let touchStartX = 0;
let touchEndX = 0;

// == 컴포넌트

const SelectGames = () => {
  const [games, setGames] = useState([
    { idx: 0, title: "사천성", regDate: "오늘", img: gameImg.sachunsung },
    { idx: 1, title: "뱅", regDate: "어제", img: imgSrc.apple },
    { idx: 2, title: "테트리스", regDate: "그저께", img: imgSrc.apple },
  ]);

  const [idx, setIdx] = useState(2);

  const langeRef = useRef<number[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigation = useNavigate();
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

    return () => console.log("언마운트");
  }, []);

  useEffect(() => {
    if (scrollRef.current === null) return;
    // console.log(idx);
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

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.clientX;
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
      scrollRef.current.style.transition = "all 0.25s ease-in-out";

      // dragRef.current = -1;
    } else if (touchStartX < currTouchX) {
      scrollRef.current.style.transform = `translateX(-${
        langeRef.current[idx] - 8
      }px)`;
      scrollRef.current.style.transition = "all 0.25s ease-in-out";

      // dragRef.current = -1;
    }
  };

  // const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
  //   console.log("마우스 움직이는중");
  //   if (scrollRef.current == null) return;

  //   if (dragRef.current < 0) return;

  //   const currTouchX = e.clientX;

  //   if (touchStartX > currTouchX) {
  //     // console.log("우파");
  //     scrollRef.current.style.transform = `translateX(-${
  //       langeRef.current[idx] + 8
  //     }px)`;
  //     // dragRef.current = -1;
  //   } else if (touchStartX < currTouchX) {
  //     // console.log("좌파");
  //     scrollRef.current.style.transform = `translateX(-${
  //       langeRef.current[idx] - 8
  //     }px)`;
  //     // dragRef.current = -1;
  //   }
  // };

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;
    dragRef.current = -1;
    // if (touchStartX === touchEndX) return;
    if (touchStartX > touchEndX) {
      handleSwipe(1);
    } else if (touchStartX < touchEndX) {
      handleSwipe(-1);
    } else {
      onClick();
    }
  };

  const onMouseUp: MouseEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.clientX;
    dragRef.current = -1;
    console.log("마우스 뗏다");
    if (touchStartX > touchEndX) {
      handleSwipe(1);
    } else if (touchStartX < touchEndX) {
      handleSwipe(-1);
    } else {
      onClick();
    }
  };

  const onClick = () => {
    navigation("/" + games[idx].idx);
  };
  // 모바일 환경이 아닐때는 양 옆 클릭 이벤트나 방향키로 움직일 수 있게 해야할까 ?
  // 테트리스, 뱅은 마우스 없이도 가능하게 해야함.
  // 그러기 때문에 키보드 입력을 핸들링하여 동작하는 것
  // 그럼 컴포넌트 분리?

  return (
    <Container style={{ overflow: "hidden" }}>
      {/* <EmptyBox height={50} /> */}
      <View
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        // onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        ref={scrollRef}
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          flexDirection: "row",
          cursor: "pointer",
        }}
      >
        {games.map((gameProp, index) => {
          return (
            <GameCard
              img={gameProp.img}
              title={gameProp.title}
              key={index}
              anythings={{
                selected: index === idx,
                scrolling: dragRef.current < 0,
              }}
            />
          );
        })}
      </View>
      <ScrollView scrollDisenable horizontal></ScrollView>
    </Container>
  );
};

export default SelectGames;
