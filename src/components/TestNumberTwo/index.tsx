"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  Radio,
  DatePicker,
  Row,
  Col,
} from "antd";
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
import styles from "@/components/TestNumberTwo/page.module.scss";
import dayjs from "dayjs";

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const people = useSelector((state: RootState) => state.person.people);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const [mounted, setMounted] = useState(false);

  const [form] = Form.useForm();

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const handleReset = () => {
    setEditingPerson(null);
    form.resetFields();
  };

  const handleEdit = (record: Person) => {
    setEditingPerson(record);

    // แยก citizenId กลับเป็น 5 ช่อง
    const [c1 = "", c2 = "", c3 = "", c4 = "", c5 = ""] =
      record.citizenId.split("-");

    form.setFieldsValue({
      ...record,
      citizen1: c1,
      citizen2: c2,
      citizen3: c3,
      citizen4: c4,
      citizen5: c5,
      birthday: dayjs(record.birthday),
    });
  };

  const handleDelete = (id: string) => {
    dispatch(deletePerson(id));
  };

  const handleDeleteSelected = () => {
    selectedRowKeys.forEach((id) => {
      dispatch(deletePerson(id as string));
    });
    setSelectedRowKeys([]);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const {
        citizen1,
        citizen2,
        citizen3,
        citizen4,
        citizen5,
        prefix,
        phone,
        ...rest
      } = values;

      const citizenId = `${citizen1}-${citizen2}-${citizen3}-${citizen4}-${citizen5}`;

      const payload = {
        ...rest,
        citizenId,
        prefix,
        phone,
      };

      if (editingPerson) {
        dispatch(editPerson({ ...editingPerson, ...payload }));
      } else {
        dispatch(addPerson({ id: uuidv4(), ...payload }));
      }

      form.resetFields();
      setEditingPerson(null);
    });
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const columns = [
    {
      title: t("name"),
      key: "name",
      render: (record: Person) =>
        `${t(`title_${record.title}`)} ${record.firstname} ${record.lastname}`,
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      render: (value: string) => `${t(`gender_${value}`)}`,
    },
    {
      title: t("phone"),
      key: "phone",
      render: (record: Person) => {
        return `+${record.prefix}${record.phone}`;
      },
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      render: (value: string) =>
        value ? t(`nationality_${value.toLowerCase()}`) : "-",
    },
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
      <div className={styles.formContainer}>
        <Form form={form} layout="horizontal">
          {/* Row 1: Title | Firstname | Lastname */}
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="title"
                label={t("title")}
                rules={[{ required: true }]}
              >
                <Select placeholder={t("title_placeholder")}>
                  <Select.Option value="Mr">{t("title_Mr")}</Select.Option>
                  <Select.Option value="Mrs">{t("title_Mrs")}</Select.Option>
                  <Select.Option value="Ms">{t("title_Ms")}</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="firstname"
                label={t("firstname")}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="lastname"
                label={t("lastname")}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 2: Birthday | Nationality */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="birthday"
                label={t("birthday")}
                rules={[{ required: true, message: t("birthday_required") }]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  placeholder={t("birthday_placeholder")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nationality"
                label={t("nationality")}
                rules={[{ required: true }]}
              >
                <Select placeholder={t("nationality_placeholder")}>
                  <Select.Option value="Thai">
                    {t("nationality_thai")}
                  </Select.Option>
                  <Select.Option value="Other">
                    {t("nationality_other")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Row 3: CitizenID */}
          <div className={styles.citizenRow}>
            <div className={styles.label}>
              <span>*</span> {t("citizen_id")}
            </div>
            {["citizen1", "citizen2", "citizen3", "citizen4", "citizen5"].map(
              (field, index) => (
                <React.Fragment key={field}>
                  <Form.Item
                    name={field}
                    className={styles.formItemInline}
                    rules={[{ required: true }]}
                  >
                    <Input
                      maxLength={
                        index === 0 || index === 4
                          ? 1
                          : index === 1
                            ? 4
                            : index === 2
                              ? 5
                              : 2
                      }
                    />
                  </Form.Item>
                  {index < 4 && "-"}
                </React.Fragment>
              ),
            )}
          </div>

          {/* Row 4: Gender */}
          <Row>
            <Col span={24}>
              <Form.Item
                name="gender"
                label={t("gender")}
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="male">{t("gender_male")}</Radio>
                  <Radio value="female">{t("gender_female")}</Radio>
                  <Radio value="unsex">{t("gender_unsex")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          {/* Row 5: Mobile Phone */}
          <Row>
            <Col span={24}>
              <Form.Item
                name="phone"
                label={t("phone")}
                rules={[
                  { required: true, message: t("phone_required") },
                  { pattern: /^0[0-9]{9}$/, message: t("phone_invalid") },
                ]}
              >
                <Input
                  addonBefore={
                    <Form.Item name="prefix" noStyle initialValue="66">
                      <Select style={{ width: 100 }}>
                        <Select.Option value="66">🇹🇭 +66</Select.Option>
                        <Select.Option value="1">🇬🇧 +1</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    form.setFieldsValue({ phone: value });
                  }}
                  style={{ width: "50%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 6: Passport No */}
          <Row>
            <Col span={24}>
              <Form.Item
                name="passport"
                label={t("passport_no")}
                rules={[
                  { required: true, message: t("expected_salary_required") },
                ]}
              >
                <Input style={{ width: "50%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Row 7: Expected Salary | Reset | Submit */}
          <div className={styles.formButton}>
            <Row gutter={16} align="bottom" className={styles.formBottomRow}>
              <Col span={8}>
                <Form.Item
                  className={styles.rowItemInline}
                  name="expectedSalary"
                  label={t("expected_salary")}
                  rules={[
                    { required: true, message: t("expected_salary_required") },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} min={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <div className={styles.formSubmitButton}>
                  <Button block onClick={handleReset}>
                    {editingPerson
                      ? t("cancel_edit_button")
                      : t("reset_button")}
                  </Button>
                  <Button block type="primary" onClick={handleSubmit}>
                    {editingPerson ? t("edit_button") : t("submit_button")}
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Button
          danger
          onClick={handleDeleteSelected}
          disabled={selectedRowKeys.length === 0}
        >
          {t("delete_selected")}
        </Button>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0 && `${selectedRowKeys.length} selected`}
        </span>
      </div>

      <Table
        rowSelection={rowSelection}
        dataSource={people}
        columns={columns}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          nextIcon: <span>{t("next")}</span>,
          prevIcon: <span>{t("previous")}</span>,
        }}
        rowKey="id"
      />
    </div>
  );
};

export default HomePage;
