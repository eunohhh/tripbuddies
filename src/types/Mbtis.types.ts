import { mbtis } from "@/data/mbtis";

export type MBTI = (typeof mbtis)[number]["mbti"];
export type MbtiColor = (typeof mbtis)[number]["color"];
