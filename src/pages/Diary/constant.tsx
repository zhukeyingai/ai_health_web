import { SportKey } from "../../interface/diary";
// normal exercise
import Bike from "../../assets/exerciseIcon/bike.svg";
import Dance from "../../assets/exerciseIcon/dance.svg";
import RopeJumping from "../../assets/exerciseIcon/ropeJumping.svg";
import Run from "../../assets/exerciseIcon/run.svg";
import Swim from "../../assets/exerciseIcon/swim.svg";
import Walk from "../../assets/exerciseIcon/walk.svg";
import ECGames from "../../assets/exerciseIcon/ECGames.svg";
import Fishing from "../../assets/exerciseIcon/fishing.svg";
// ball games
import Shuttlecock from "../../assets/exerciseIcon/shuttlecock.svg";
import Baseball from "../../assets/exerciseIcon/baseball.svg";
import Bowling from "../../assets/exerciseIcon/bowling.svg";
import Squash from "../../assets/exerciseIcon/squash.svg";
import Puck from "../../assets/exerciseIcon/puck.svg";
import Golf from "../../assets/exerciseIcon/golf.svg";
import Basketball from "../../assets/exerciseIcon/basketball.svg";
import Softball from "../../assets/exerciseIcon/Softball.svg";
import Croquet from "../../assets/exerciseIcon/croquet.svg";
import Volleyball from "../../assets/exerciseIcon/volleyball.svg";
import Pingpong from "../../assets/exerciseIcon/pingpong.svg";
import Billiards from "../../assets/exerciseIcon/billiards.svg";
import SepakTakraw from "../../assets/exerciseIcon/sepakTakraw.svg";
import Tennis from "../../assets/exerciseIcon/tennis.svg";
import Badminton from "../../assets/exerciseIcon/badminton.svg";
import Football from "../../assets/exerciseIcon/football.svg";
// gym
import Fight from "../../assets/exerciseIcon/fight.svg";
import SpinningBike from "../../assets/exerciseIcon/spinningBike.svg";
import Barbell from "../../assets/exerciseIcon/barbell.svg";
import Treadmill from "../../assets/exerciseIcon/treadmill.svg";
import Kettlebell from "../../assets/exerciseIcon/kettlebell.svg";
import Grips from "../../assets/exerciseIcon/grips.svg";
import Yoga from "../../assets/exerciseIcon/yoga.svg";

export const amountTagColors = ["green", "cyan", "blue", "volcano", "red"];

export const genSubTitle = (n: number) => {
  let subTitle: string;
  switch (n) {
    case 1:
      subTitle = "今日";
      break;
    case 3:
      subTitle = "前三日";
      break;
    case 7:
      subTitle = "前七日";
      break;
    default:
      subTitle = "某日";
      break;
  }
  return subTitle;
};

export const normalExerciseList = [
  { src: Bike, value: "bike", label: "骑自行车" },
  { src: Dance, value: "dance", label: "舞蹈" },
  { src: RopeJumping, value: "ropeJumping", label: "跳绳" },
  { src: Run, value: "run", label: "跑步" },
  { src: Swim, value: "swim", label: "游泳" },
  { src: Walk, value: "walk", label: "步行" },
  { src: Fishing, value: "fishing", label: "钓鱼" },
  { src: ECGames, value: "ecGames", label: "电子竞技" },
];

export const ballGamesList = [
  { src: Shuttlecock, value: "shuttlecock", label: "踢毽子" },
  { src: Baseball, value: "baseball", label: "棒球" },
  { src: Bowling, value: "bowling", label: "保龄球" },
  { src: Squash, value: "squash", label: "壁球" },
  { src: Puck, value: "puck", label: "冰球" },
  { src: Golf, value: "golf", label: "高尔夫" },
  { src: Basketball, value: "basketball", label: "篮球" },
  { src: Softball, value: "softball", label: "垒球" },
  { src: Croquet, value: "croquet", label: "门球" },
  { src: Volleyball, value: "volleyball", label: "排球" },
  { src: Pingpong, value: "pingpong", label: "乒乓球" },
  { src: Billiards, value: "billiards", label: "台球" },
  { src: SepakTakraw, value: "sepakTakraw", label: "藤球" },
  { src: Tennis, value: "tennis", label: "网球" },
  { src: Badminton, value: "badminton", label: "羽毛球" },
  { src: Football, value: "football", label: "足球" },
];

export const gymList = [
  { src: Fight, value: "fight", label: "搏击" },
  { src: SpinningBike, value: "spinningBike", label: "动感单车" },
  { src: Barbell, value: "barbell", label: "杠铃" },
  { src: Treadmill, value: "treadmill", label: "跑步机" },
  { src: Kettlebell, value: "kettlebell", label: "壶铃" },
  { src: Grips, value: "grips", label: "握力器" },
  { src: Yoga, value: "yoga", label: "瑜伽" },
];

export const SportLabeLMap = {
  [SportKey.normalExercise]: { label: "普通运动", list: normalExerciseList },
  [SportKey.ballGames]: { label: "球类运动", list: ballGamesList },
  [SportKey.gym]: { label: "健身房", list: gymList },
};
