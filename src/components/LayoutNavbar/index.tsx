"use client";
import React from "react";
import { Select } from "antd";
import i18n from "@/i18n/i18n";

const LayoutNavbar = () => {
  return (
    <div>
      <Select
        defaultValue="en"
        onChange={(lng) => i18n.changeLanguage(lng)}
        style={{ marginLeft: 8 }}
      >
        <Select.Option value="en">🇬🇧 English</Select.Option>
        <Select.Option value="th">🇹🇭 ไทย</Select.Option>
      </Select>
    </div>
  );
};

export default LayoutNavbar;
