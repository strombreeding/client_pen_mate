export type BtnStatus = "default" | "pressed" | "disabled";

export type SignInFormData = {
  nickname: string;
  gender: "여자" | "남자" | "기타" | "";
  country?: string;
  language?: any;
  avatar: any;
  agreement: boolean;
  interested?: string[];
};

// max x = 8
/* 
"3,4/3,6/3,8/4,4/4,5/4,6/4,7/4,8/5,4/5,6/5,8/6,6/6,7/6,8/7,6/7,8/8,7/8,8/8,9"

*/

// max y = 9

export type SachunsungGameSetting = {
  matchAI: boolean;
  level: string;
  intAI: number;
};

export type NavTab = "home" | "ranking" | "store" | "profile";

// export interface GameProps {
//   id: string;
//   title: string;
//   description: string;
//   minReward: number;
//   cost: number;
//   matchType: string[];
//   player: string[];
// }
