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

export enum gamelevel {
  BEGINNER = "3,4", // 4 까지
  FRESHMAN = "6,6", // 6까지
  SOPHOMORE = "9,8", // 8
  JUNIOR = "12,10", //
  SENIOR = "15,12",
  HARD = "18,12",
}

export type SachunsungGameSetting = {
  matchAI: boolean;
  level: gamelevel;
  intAI: number;
};

export type NavTab = "home" | "ranking" | "store" | "profile";
