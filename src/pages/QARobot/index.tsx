import { useState, useCallback } from "react";
import { debounce } from "lodash-es";
import PageLayout from "../../layout/PageLayout";

const QARobot: React.FC = () => {
  const [filterSearch, setFilterSearch] = useState<string>("");

  const debounceSearch = useCallback(
    debounce((e) => setFilterSearch(e.target.value?.trim()), 300),
    []
  );

  return (
    <>
      <PageLayout
        onSearch={debounceSearch}
        content={
          <div>111</div>
        }
      />
    </>
  );
};

export default QARobot;
