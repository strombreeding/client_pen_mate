import { cdnDefaultURL } from "../configs/server";

interface gameAssets {
  [key: string]: string;
}

export const gameImg = {
  action_btn: cdnDefaultURL + "gameImg/action_btn.png",
  empty: cdnDefaultURL + "gameImg/empty.png",

  target: cdnDefaultURL + "gameImg/target.png",
  junkyard_ico_1: cdnDefaultURL + "gameImg/junkyard_ico_1.png",
  junkyard_ico_2: cdnDefaultURL + "gameImg/junkyard_ico_2.png",
  junkyard_ico_3: cdnDefaultURL + "gameImg/junkyard_ico_3.png",
  junkyard_ico_4: cdnDefaultURL + "gameImg/junkyard_ico_4.png",
  junkyard_ico_5: cdnDefaultURL + "gameImg/junkyard_ico_5.png",
  junkyard_ico_6: cdnDefaultURL + "gameImg/junkyard_ico_6.png",
  junkyard_ico_7: cdnDefaultURL + "gameImg/junkyard_ico_7.png",
  junkyard_ico_8: cdnDefaultURL + "gameImg/junkyard_ico_8.png",
  junkyard_ico_9: cdnDefaultURL + "gameImg/junkyard_ico_9.png",
  junkyard_ico_10: cdnDefaultURL + "gameImg/junkyard_ico_10.png",
  junkyard_ico_11: cdnDefaultURL + "gameImg/junkyard_ico_11.png",
  junkyard_ico_12: cdnDefaultURL + "gameImg/junkyard_ico_12.png",
  junkyard_ico_13: cdnDefaultURL + "gameImg/junkyard_ico_13.png",
  junkyard_ico_14: cdnDefaultURL + "gameImg/junkyard_ico_14.png",
  junkyard: cdnDefaultURL + "gameImg/junkyard.png",
  bang_img: cdnDefaultURL + "gameImg/bang_img.png",
  tetris_img: cdnDefaultURL + "gameImg/tetris_img.png",
  junkward_bg: cdnDefaultURL + "gameImg/junkward_bg.png",

  cow_jump_right_1x8: cdnDefaultURL + "gameImg/cow_jump_right_1x8.png",
  cow_jump_left_1x8: cdnDefaultURL + "gameImg/cow_jump_left_1x8.png",
  bounti_jump_right_1x8: cdnDefaultURL + "gameImg/bounti_jump_right_1x8.png",
  bounti_jump_left_1x8: cdnDefaultURL + "gameImg/bounti_jump_left_1x8.png",
  bounti_atk_left_3x2: cdnDefaultURL + "gameImg/bounti_atk_left_3x2.png",
  bounti_atk_right_3x2: cdnDefaultURL + "gameImg/bounti_atk_right_3x2.png",
  cow_atk_left_1x3: cdnDefaultURL + "gameImg/cow_atk_left_1x3.png",
  cow_atk_right_1x3: cdnDefaultURL + "gameImg/cow_atk_right_1x3.png",
  bounti_walk_left_1x4: cdnDefaultURL + "gameImg/bounti_walk_left_1x4.png",
  bounti_walk_right_1x4: cdnDefaultURL + "gameImg/bounti_walk_right_1x4.png",
  cow_walk_left_1x4: cdnDefaultURL + "gameImg/cow_walk_left_1x4.png",
  cow_walk_right_1x4: cdnDefaultURL + "gameImg/cow_walk_right_1x4.png",

  cow_stand_right: cdnDefaultURL + "gameImg/cow_stand_right.png",
  cow_stand_left: cdnDefaultURL + "gameImg/cow_stand_left.png",
  bounti_stand_right: cdnDefaultURL + "gameImg/bounti_stand_right.png",
  bounti_stand_left: cdnDefaultURL + "gameImg/bounti_stand_left.png",

  action_jump: cdnDefaultURL + "gameImg/action_jump.png",
  action_atk: cdnDefaultURL + "gameImg/action_atk.png",

  bg_bang_tile: cdnDefaultURL + "gameImg/bg_bang_tile.png",
  bg_bang: cdnDefaultURL + "gameImg/bg_bang.png",
  bg_bang2: cdnDefaultURL + "gameImg/bg_bang2.png",
  tile4: cdnDefaultURL + "gameImg/tile4.png",
  sun2: cdnDefaultURL + "gameImg/sun2.png",

  hit_1x3: cdnDefaultURL + "gameImg/hit_1x3.png",

  antimatter_1: cdnDefaultURL + "gameImg/antimatter_1.png",
  antimatter_2: cdnDefaultURL + "gameImg/antimatter_2.png",
  antimatter_3: cdnDefaultURL + "gameImg/antimatter_3.png",
  antimatter_4: cdnDefaultURL + "gameImg/antimatter_4.png",
  antimatter_5: cdnDefaultURL + "gameImg/antimatter_5.png",
  antimatter_6: cdnDefaultURL + "gameImg/antimatter_6.png",
  antimatter_7: cdnDefaultURL + "gameImg/antimatter_7.png",
  antimatter_8: cdnDefaultURL + "gameImg/antimatter_8.png",
  antimatter_9: cdnDefaultURL + "gameImg/antimatter_9.png",
  antimatter_10: cdnDefaultURL + "gameImg/antimatter_10.png",

  bullet_blood: cdnDefaultURL + "gameImg/bullet_blood.png",
  bullet_explosion: cdnDefaultURL + "gameImg/bullet_explosion.png",
  bullet_fragment: cdnDefaultURL + "gameImg/bullet_fragment.png",
  bullet_heal: cdnDefaultURL + "gameImg/bullet_heal.png",
  bullet_force: cdnDefaultURL + "gameImg/bullet_force.png",
  bullet_super: cdnDefaultURL + "gameImg/bullet_super.png",

  plate_2: cdnDefaultURL + "gameImg/plate_2.png",
  plate_3: cdnDefaultURL + "gameImg/plate_3.png",
  plate_5: cdnDefaultURL + "gameImg/plate_5.png",
};

// export const gameImg = {
//   action_btn: require("../assets/gameAssets/action_btn.png"),
//   empty: require("../assets/gameAssets/empty.png"),

//   target: require("../assets/gameAssets/target.png"),
//   junkyard_ico_1: require("../assets/gameAssets/junkyard_ico_1.png"),
//   junkyard_ico_2: require("../assets/gameAssets/junkyard_ico_2.png"),
//   junkyard_ico_3: require("../assets/gameAssets/junkyard_ico_3.png"),
//   junkyard_ico_4: require("../assets/gameAssets/junkyard_ico_4.png"),
//   junkyard_ico_5: require("../assets/gameAssets/junkyard_ico_5.png"),
//   junkyard_ico_6: require("../assets/gameAssets/junkyard_ico_6.png"),
//   junkyard_ico_7: require("../assets/gameAssets/junkyard_ico_7.png"),
//   junkyard_ico_8: require("../assets/gameAssets/junkyard_ico_8.png"),
//   junkyard: require("../assets/gameAssets/junkyard.png"),
//   bang_img: require("../assets/gameAssets/bang_img.png"),
//   tetris_img: require("../assets/gameAssets/tetris_img.png"),
//   junkward_bg: require("../assets/gameAssets/junkward_bg.png"),

//   cow_jump_right_1x8: require("../assets/gameAssets/cow_jump_right_1x8.png"),
//   cow_jump_left_1x8: require("../assets/gameAssets/cow_jump_left_1x8.png"),
//   bounti_jump_right_1x8: require("../assets/gameAssets/bounti_jump_right_1x8.png"),
//   bounti_jump_left_1x8: require("../assets/gameAssets/bounti_jump_left_1x8.png"),
//   bounti_atk_left_3x2: require("../assets/gameAssets/bounti_atk_left_3x2.png"),
//   bounti_atk_right_3x2: require("../assets/gameAssets/bounti_atk_right_3x2.png"),
//   cow_atk_left_1x3: require("../assets/gameAssets/cow_atk_left_1x3.png"),
//   cow_atk_right_1x3: require("../assets/gameAssets/cow_atk_right_1x3.png"),
//   bounti_walk_left_1x4: require("../assets/gameAssets/bounti_walk_left_1x4.png"),
//   bounti_walk_right_1x4: require("../assets/gameAssets/bounti_walk_right_1x4.png"),
//   cow_walk_left_1x4: require("../assets/gameAssets/cow_walk_left_1x4.png"),
//   cow_walk_right_1x4: require("../assets/gameAssets/cow_walk_right_1x4.png"),

//   cow_stand_right: require("../assets/gameAssets/cow_stand_right.png"),
//   cow_stand_left: require("../assets/gameAssets/cow_stand_left.png"),
//   bounti_stand_right: require("../assets/gameAssets/bounti_stand_right.png"),
//   bounti_stand_left: require("../assets/gameAssets/bounti_stand_left.png"),

//   action_jump: require("../assets/gameAssets/action_jump.png"),
//   action_atk: require("../assets/gameAssets/action_atk.png"),

//   bg_bang_tile: require("../assets/gameAssets/bg_bang_tile.png"),
//   bg_bang: require("../assets/gameAssets/bg_bang.png"),
//   bg_bang2: require("../assets/gameAssets/bg_bang2.png"),
//   tile4: require("../assets/gameAssets/tile4.png"),
//   sun2: require("../assets/gameAssets/sun2.png"),

//   hit_1x3: require("../assets/gameAssets/hit_1x3.png"),
// };
