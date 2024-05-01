import { Button, Table } from "antd";
import { memo, useState } from "react";
import { amountOptions } from "../../constant/amountOptions";

const dataList = [
  {
    id: 1,
    foodName: "西红柿牛肉",
    amount: 2,
    heat: 200,
  },
  {
    id: 2,
    foodName: "西红柿牛肉",
    amount: 2,
    heat: 200,
  },
];

interface Props {
  onDetail: (id: number) => void;
}

const DishList: React.FC<Props> = memo(({ onDetail }) => {
  const [pagination, setPagination] = useState({
    showSizeChanger: true,
    showTotal: (total: number) => `${total} 条`,
    pageSize: 10,
    current: 1,
    total: 0,
    size: "small" as any,
    hideOnSinglePage: true,
  });

  const columns: any[] = [
    {
      title: "菜名",
      dataIndex: "foodName",
      key: "foodName",
    },
    {
      title: "份量",
      dataIndex: "amount",
      key: "amount",
      render: (value: number) => {
        const matchedItem = amountOptions.find((i) => i.value === value);
        return <div>{matchedItem ? matchedItem.label : "未知"}</div>;
      },
    },
    {
      title: "热量",
      dataIndex: "heat",
      key: "heat",
      render: (value: number) => `${value} kcal`,
    },
    {
      title: "操作",
      width: 152,
      fixed: "right",
      render: (_: any, record: any) => (
        <div className="flex">
          <Button type="link" onClick={() => onDetail(record.id)}>
            详情
          </Button>
          <Button type="link">删除</Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataList}
      columns={columns}
      pagination={pagination}
      scroll={{ x: columns.length * 120 || 800 }}
    />
  );
});

export default DishList;
