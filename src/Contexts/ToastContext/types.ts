export interface IToastContextData {
  toasts: IToastData[];
  addToast: (message: string, lifeTime?: number) => void;
  removeToast: (id: string) => void;
}

export interface IToastData {
  id: string;
  lifeTime: number;
  message: string;
}