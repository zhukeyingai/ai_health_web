import { useState, useCallback } from "react";
import { debounce } from "lodash-es";
import PageLayout from "../../layout/PageLayout";
import EditDish from "./EditDish";
import TodayMenu from "./TodayMenu";
import DishList from "./DishList";
import DishDetail from "./DishDetail";

enum OperType {
  edit = "edit",
  detail = "detail",
  default = "list",
}

const CustomRecipes: React.FC = () => {
  const [operType, setOperType] = useState<OperType>(OperType.default);
  const [filterSearch, setFilterSearch] = useState<string>("");

  const debounceSearch = useCallback(
    debounce((e) => setFilterSearch(e.target.value?.trim()), 300),
    []
  );

  const onDetail = (id: number) => {
    setOperType(OperType.detail);
  };

  const onBackToList = () => {
    setOperType(OperType.default);
  };

  const genContent = () => {
    if (operType === OperType.edit) {
      return <EditDish onBackToList={onBackToList} />;
    } else if (operType === OperType.detail) {
      return <DishDetail onBackToList={onBackToList} />;
    }
    return (
      <div className="flex h-full w-full gap-6">
        <TodayMenu onDetail={onDetail} />
        <PageLayout
          name="我的菜谱大全"
          className="flex-1"
          mainBtnTxt="菜品生成"
          onMain={() => setOperType(OperType.edit)}
          onSearch={debounceSearch}
          content={<DishList onDetail={onDetail} />}
        />
      </div>
    );
  };

  return <>{genContent()}</>;
};

export default CustomRecipes;
