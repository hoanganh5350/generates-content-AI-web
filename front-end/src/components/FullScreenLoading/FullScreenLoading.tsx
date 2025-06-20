import React from "react";
import { Spin } from "antd";
import "./FullScreenLoading.scss";
import { LoadingOutlined } from "@ant-design/icons";

const FullScreenLoading: React.FC = () => {
  return (
    <div className="fullScreenLoading">
      <Spin
        indicator={<LoadingOutlined spin style={{ fontSize: 48 }} />}
        tip="Loading..."
      />
    </div>
  );
};

export default FullScreenLoading;
