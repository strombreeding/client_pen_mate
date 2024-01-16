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
