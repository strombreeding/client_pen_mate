export type BtnStatus = "default" | "pressed" | "disabled";

export type SignInFormData = {
  nickname: string;
  gender: "W" | "M" | "E";
  birthYear: string;
  country?: string;
  language?: any;
  avatar: any;
  agreement: boolean;
  interested?: string[];
};
