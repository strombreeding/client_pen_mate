import styled from "styled-components";
import { imgSrc } from "../assets/img";
import { Pressable } from "../nativeView";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setNavTab } from "../store/slices/appState";
import { NavTab } from "../types";
import { useNavigate } from "react-router-dom";
import { IOS } from "../configs/device";

const Wrapper = styled.div`
  min-width: 360px;
  width: 100%;
  position: relative;
  /* position: absolute; */
  /* bottom: 0; */
  background: rgba(0, 0, 0, 0.2);
  background-blend-mode: overlay;
  box-shadow: 0px 10px 30px rgba(41, 39, 130, 0.1),
    inset 0px 1.5px 0.5px rgba(255, 255, 255, 0.5);
  /* backdrop-filter: blur(40px); */
  border-radius: 50px 50px 0px 0px;
`;

const IconWrapper = styled.div`
  margin: 5% 5% ${IOS ? 50 : 30}px 5%;
  width: 90%;
  height: 40%;
  /* background-color: #ffffff9b; */
  display: flex;
  justify-content: space-around;
`;

const NavIcon = styled.img`
  /* background-color: white; */
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const BottomNav = () => {
  const currentTab = useSelector((state: RootState) => state.appState.navTab);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const navTab = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const type = e.currentTarget.id;
    navigation("/" + type);
    dispatch(setNavTab(type));
  };

  return (
    <Wrapper>
      <IconWrapper>
        <Pressable id="home" onClick={navTab}>
          <NavIcon
            src={currentTab === "home" ? imgSrc.home_active : imgSrc.home_un}
            alt=""
          />
        </Pressable>
        <Pressable id="ranking" onClick={navTab}>
          <NavIcon
            src={
              currentTab === "ranking"
                ? imgSrc.ranking_active
                : imgSrc.ranking_un
            }
            alt=""
          />
        </Pressable>
        <Pressable id="store" onClick={navTab}>
          <NavIcon
            src={currentTab === "store" ? imgSrc.store_active : imgSrc.store_un}
            alt=""
          />
        </Pressable>
        <Pressable id="profile" onClick={navTab}>
          <NavIcon
            src={
              currentTab === "profile"
                ? imgSrc.profile_active
                : imgSrc.profile_un
            }
            alt=""
          />
        </Pressable>
      </IconWrapper>
    </Wrapper>
  );
};

export default BottomNav;
