import { useEffect, useState } from "react";
import { Tooltip, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import WaterDrink from "../../../assets/water.svg";
import EmptyCupSvg from "../../../assets/emptyCup.svg";
import WaterCupSvg from "../../../assets/waterCup.svg";
import CommonCard from "../../../components/CommonCard";
import diaryApi from "../../../services/diary";

interface WaterProps {
  userId?: string;
  onRefresh: () => void;
  waterQuantity: number;
}

const Water: React.FC<WaterProps> = ({ userId, onRefresh, waterQuantity }) => {
  const [images, setImages] = useState<string[]>(Array(8).fill(EmptyCupSvg));

  useEffect(() => {
    const initImages = Array(8).fill(EmptyCupSvg);
    for (let i = 0; i < waterQuantity; i++) {
      initImages[i] = WaterCupSvg;
    }
    setImages(initImages);
  }, [waterQuantity]);

  const genWord = (num: number) => {
    let text: string = "这样并不是很好呢！:-(";
    if (num >= 1 && num <= 4) {
      text = "请继续努力~ :-)";
    } else if (num >= 5 && num <= 7) {
      text = "请继续保持~ :-O";
    } else if (num === 8) {
      text = "真的很棒呀！！:-D";
    }
    return text;
  };

  const updateWaterQuantity = (quantity: number) => {
    if (!userId) return;
    const params = {
      user_id: userId,
      quantity,
    };
    diaryApi
      .updateWaterRecords(params)
      .then((res) => {
        if (res.data) {
          message.success("饮水记录上传成功");
          onRefresh();
        }
      })
      .catch((err) => message.error(`饮水记录上传失败：${err}`));
  };

  const handleWater = (index: number) => {
    const newImages = [...images];
    const curImage = newImages[index];
    let quantity: number = waterQuantity;
    if (curImage === EmptyCupSvg) {
      newImages[index] = WaterCupSvg;
      quantity = quantity + 1;
    } else {
      newImages[index] = EmptyCupSvg;
      quantity = quantity - 1;
    }
    setImages(newImages);
    updateWaterQuantity(quantity);
  };

  return (
    <CommonCard className="ml-6 w-1/2 overflow-hidden min-w-[350px]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={WaterDrink} className="w-8" />
          <div className="mx-1.5 text-[15px] font-semibold">饮水</div>
          <Tooltip
            title={
              <div>
                一杯水的容量差不多是办公室咖啡杯那样~
                <br />
                ps: 点击一杯 cup 表示您喝了一杯水喔~
              </div>
            }
          >
            <QuestionCircleOutlined />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <div className="text-[#a1a1aa] font-semibold">今天</div>
        </div>
      </div>
      <div className="h-[calc(100%-32px)] overflow-auto py-5">
        <div className="flex flex-wrap">
          {Array.from({ length: 8 }, (_, index) => (
            <img
              key={index}
              className="mx-5 my-2 cursor-pointer"
              src={images[index]}
              width={80}
              onClick={() => handleWater(index)}
            />
          ))}
        </div>
        <div className="mt-5 text-center">
          <span>共计喝了</span>
          <span className="text-[#20acf5]"> {waterQuantity} </span>
          <span>杯水</span>
          <span className="ml-4 font-medium text-[#9ad14b]">
            {genWord(waterQuantity)}
          </span>
        </div>
      </div>
    </CommonCard>
  );
};

export default Water;
