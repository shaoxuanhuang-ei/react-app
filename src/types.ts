export interface QiankunProps {
  container?: HTMLElement;
  appName?: string;
  token?: string;
  onGlobalStateChange?: (callback: (state: any, prevState: any) => void, immediate?: boolean) => void;
  setGlobalState?: (state: any) => void;
}

export interface GlobalState {
  userInfo?: {
    name: string;
    id: string
  };
  [key: string]: any
}