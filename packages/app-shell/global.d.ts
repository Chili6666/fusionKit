import { ShellApp } from "fusion-kit/core";

declare global {
  interface Window {
    shellApp: ShellApp;
  }
}