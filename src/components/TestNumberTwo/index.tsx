"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
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
import {
  addPerson,
  editPerson,
  deletePerson,
  Person,
} from "@/redux/slice/personSlice";
import { Trans, useTranslation } from "react-i18next";
import { RootState } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";
import styles from "@/components/TestNumberTwo/page.module.scss";

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
      title: t("pageTestTwo.name"),
      key: "name",
      render: (record: Person) =>
        `${t(`pageTestTwo.title_${record.title}`)} ${record.firstname} ${record.lastname}`,
    },
    {
      title: t("pageTestTwo.gender"),
      dataIndex: "gender",
      key: "gender",
      render: (value: string) => `${t(`pageTestTwo.gender_${value}`)}`,
    },
    {
      title: t("pageTestTwo.phone"),
      key: "phone",
      render: (record: Person) => {
        return `+${record.prefix}${record.phone}`;
      },
    },
    {
      title: t("pageTestTwo.nationality"),
      dataIndex: "nationality",
      key: "nationality",
      render: (value: string) =>
        value ? t(`pageTestTwo.nationality_${value.toLowerCase()}`) : "-",
    },
    {
      title: t("pageTestTwo.actions"),
      key: "actions",
      render: (record: Person) => (
        <>
          <Button onClick={() => handleEdit(record)}>
            {t("pageTestTwo.edit")}
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            {t("pageTestTwo.delete")}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1>{t("pageTestTwo.form_and_table")}</h1>

        <div className={styles.titleContainer}>
          <span className={styles.title}>
            {t("pageTestTwo.test_description_title")}
          </span>
          <br />
          <span className={styles.titleDesc}>
            <Trans
              i18nKey="pageTestTwo.test_description_html"
              components={{ br: <br /> }}
            />
          </span>
        </div>
      </div>

      <div className={styles.formContainer}>
        <Form form={form} layout="horizontal">
          {/* Row 1: Title | Firstname | Lastname */}
          <Row gutter={16}>
            <Col span={6} xs={24} sm={8}>
              <Form.Item
                name="title"
                label={t("pageTestTwo.title")}
                rules={[
                  { required: true, message: t("pageTestTwo.title_required") },
                ]}
              >
                <Select placeholder={t("pageTestTwo.title_placeholder")}>
                  <Select.Option value="Mr">
                    {t("pageTestTwo.title_Mr")}
                  </Select.Option>
                  <Select.Option value="Mrs">
                    {t("pageTestTwo.title_Mrs")}
                  </Select.Option>
                  <Select.Option value="Ms">
                    {t("pageTestTwo.title_Ms")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={9} xs={24} sm={8}>
              <Form.Item
                name="firstname"
                label={t("pageTestTwo.firstname")}
                rules={[
                  {
                    required: true,
                    message: t("pageTestTwo.firstname_required"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={9} xs={24} sm={8}>
              <Form.Item
                name="lastname"
                label={t("pageTestTwo.lastname")}
                rules={[
                  {
                    required: true,
                    message: t("pageTestTwo.lastname_required"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* Row 2: Birthday | Nationality */}
          <Row gutter={16}>
            <Col span={12} xs={24} sm={8}>
              <Form.Item
                name="birthday"
                label={t("pageTestTwo.birthday")}
                rules={[
                  {
                    required: true,
                    message: t("pageTestTwo.birthday_required"),
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  placeholder={t("pageTestTwo.birthday_placeholder")}
                />
              </Form.Item>
            </Col>
            <Col span={12} xs={24} sm={8}>
              <Form.Item
                name="nationality"
                label={t("pageTestTwo.nationality")}
                rules={[
                  {
                    required: true,
                    message: t("pageTestTwo.nationality_required"),
                  },
                ]}
              >
                <Select placeholder={t("pageTestTwo.nationality_placeholder")}>
                  <Select.Option value="Thai">
                    {t("pageTestTwo.nationality_thai")}
                  </Select.Option>
                  <Select.Option value="Other">
                    {t("pageTestTwo.nationality_other")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Row 3: CitizenID */}
          <Form.Item label={t("pageTestTwo.citizen_id")} required>
            <div className={styles.citizenRow}>
              {["citizen1", "citizen2", "citizen3", "citizen4", "citizen5"].map(
                (field, index) => {
                  const maxLength =
                    index === 0 || index === 4
                      ? 1
                      : index === 1
                        ? 4
                        : index === 2
                          ? 5
                          : 2;

                  const placeholder = "x".repeat(maxLength);

                  return (
                    <React.Fragment key={field}>
                      <Form.Item
                        name={field}
                        className={styles.formItemInline}
                        rules={[
                          {
                            required: true,
                            message: t("pageTestTwo.citizen_required", {
                              digits: maxLength,
                            }),
                          },
                          {
                            len: maxLength,
                            message: t("pageTestTwo.citizen_exact_digits", {
                              digits: maxLength,
                            }),
                          },
                        ]}
                      >
                        <Input
                          maxLength={maxLength}
                          placeholder={placeholder}
                          className={`${styles.citizenInput} ${styles[`digit${maxLength}`]}`}
                        />
                      </Form.Item>
                      {index < 4 && <span className={styles.dash}>-</span>}
                    </React.Fragment>
                  );
                },
              )}
            </div>
          </Form.Item>

          {/* Row 4: Gender */}
          <Row>
            <Col span={24}>
              <Form.Item
                name="gender"
                label={t("pageTestTwo.gender")}
                rules={[
                  { required: true, message: t("pageTestTwo.gender_required") },
                ]}
              >
                <Radio.Group>
                  <Radio value="male">{t("pageTestTwo.gender_male")}</Radio>
                  <Radio value="female">{t("pageTestTwo.gender_female")}</Radio>
                  <Radio value="unsex">{t("pageTestTwo.gender_unsex")}</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {/* Row 5: Mobile Phone */}
          <Row>
            <Col span={24}>
              <Form.Item
                name="phone"
                label={t("pageTestTwo.phone")}
                rules={[
                  { required: true, message: t("pageTestTwo.phone_required") },
                  {
                    pattern: /^0[0-9]{9}$/,
                    message: t("pageTestTwo.phone_invalid"),
                  },
                ]}
              >
                <Input
                  className={styles.inputPhoneNumber}
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
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Row 6: Passport No */}
          <Row>
            <Col span={24}>
              <Form.Item
                name="passport"
                label={t("pageTestTwo.passport_no")}
                rules={[
                  {
                    required: true,
                    message: t("pageTestTwo.passport_required"),
                  },
                ]}
              >
                <Input className={styles.inputPassportNumber} />
              </Form.Item>
            </Col>
          </Row>
          {/* Row 7: Expected Salary | Reset | Submit */}
          <div className={styles.formButton}>
            <Row gutter={16} align="bottom" className={styles.formBottomRow}>
              <Col span={8} xs={24} sm={8}>
                <Form.Item
                  className={styles.rowItemInline}
                  name="expectedSalary"
                  label={t("pageTestTwo.expected_salary")}
                  rules={[
                    {
                      required: true,
                      message: t("pageTestTwo.expected_salary_required"),
                    },
                  ]}
                >
                  <InputNumber<string>
                    style={{ width: "300px" }}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value!.replace(/,/g, "")}
                    min={"0"}
                    addonAfter="บาท"
                  />
                </Form.Item>
              </Col>
              <Col span={8} sm={8}>
                <div className={styles.formSubmitButton}>
                  <Button block onClick={handleReset}>
                    {editingPerson
                      ? t("pageTestTwo.cancel_edit_button")
                      : t("pageTestTwo.reset_button")}
                  </Button>
                  <Button block type="primary" onClick={handleSubmit}>
                    {editingPerson
                      ? t("pageTestTwo.edit_button")
                      : t("pageTestTwo.submit_button")}
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
          {t("pageTestTwo.delete_selected")}
        </Button>

        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0 &&
            t("pageTestTwo.selected_count", { count: selectedRowKeys.length })}
        </span>
      </div>

      <Table
        rowSelection={rowSelection}
        scroll={{ x: "max-content" }}
        dataSource={people}
        columns={columns}
        pagination={{
          pageSize: 3,
          showSizeChanger: false,
          nextIcon: (
            <span className={styles.paginationButton}>
              {t("pageTestTwo.next")}
            </span>
          ),
          prevIcon: (
            <span className={styles.paginationButton}>
              {t("pageTestTwo.previous")}
            </span>
          ),
        }}
        rowKey="id"
      />
    </div>
  );
};

export default HomePage;
