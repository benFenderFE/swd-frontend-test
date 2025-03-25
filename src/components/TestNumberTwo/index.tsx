"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Input, Select, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addPerson,
  editPerson,
  deletePerson,
  Person,
} from "@/redux/slice/personSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";
import styles from "@/components/TestNumberTwo/page.module.css";

const { Option } = Select;

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const people = useSelector((state: RootState) => state.person.people);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const [mounted, setMounted] = useState(false);

  const [form] = Form.useForm();

  const handleReset = () => {
    setEditingPerson(null);
    form.resetFields();
  };

  const handleEdit = (record: Person) => {
    setEditingPerson(record);
    form.setFieldsValue(record);
  };

  const handleDelete = (id: string) => {
    dispatch(deletePerson(id));
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { prefix, phone, ...rest } = values;

      const formattedPhone = phone.startsWith("0") ? phone.slice(1) : phone;

      const fullPhone = `+${prefix}${formattedPhone}`;

      if (editingPerson) {
        dispatch(editPerson({ ...editingPerson, ...rest, phone: fullPhone }));
      } else {
        dispatch(addPerson({ id: uuidv4(), ...rest, phone: fullPhone }));
      }

      form.resetFields();
    });
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="66">
      <Select style={{ width: 80 }}>
        <Select.Option value="66">+66</Select.Option>
      </Select>
    </Form.Item>
  );
  const columns = [
    { title: t("name"), dataIndex: "name", key: "name" },
    { title: t("age"), dataIndex: "age", key: "age" },
    { title: t("phone"), dataIndex: "phone", key: "phone" },
    { title: t("email"), dataIndex: "email", key: "email" },
    {
      title: t("actions"),
      key: "actions",
      render: (record: Person) => (
        <>
          <Button onClick={() => handleEdit(record)}>{t("edit")}</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            {t("delete")}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label={t("name")} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label={t("age")}
            rules={[{ required: true, type: "number", min: 1 }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="phone"
            label={t("phone")}
            rules={[
              {
                required: true,
                message: t("phone_required"),
              },
              {
                pattern: /^0[0-9]{8,9}$/,
                message: t("phone_invalid"),
              },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "40%" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label={t("email")}
            rules={[
              { required: true },
              { type: "email", message: t("invalid_email") },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>

      <div>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          {editingPerson ? t("edit_button") : t("submit_button")}
        </Button>
        <Button type="primary" htmlType="submit" onClick={handleReset}>
          {editingPerson ? t("cancel_edit_button") : t("reset_button")}
        </Button>
      </div>

      <Table
        dataSource={people}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />
    </div>
  );
};

export default HomePage;
