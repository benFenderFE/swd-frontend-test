import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      name: "Name",
      age: "Age",
      email: "Email",
      phone: "Phone Number",
      phone_required: "Please enter your phone number!",
      phone_invalid: "Phone number must start with 0 and contain 9–10 digits.",
      actions: "Actions",
      add: "Add Person",
      edit: "Edit",
      delete: "Delete",
      changeLang: "Change Language",
      edit_button: "Save Edit",
      cancel_edit_button: "Cancel Edit",
      submit_button: "Submit",
      reset_button: "Reset",
    },
  },
  th: {
    translation: {
      name: "ชื่อ",
      age: "อายุ",
      email: "อีเมล",
      phone: "เบอร์โทรศัพท์",
      phone_required: "กรุณากรอกเบอร์โทรศัพท์!",
      phone_invalid: "เบอร์โทรต้องขึ้นต้นด้วยเลข 0 และมีความยาว 9–10 หลัก",
      actions: "การกระทำ",
      add: "เพิ่มบุคคล",
      edit: "แก้ไข",
      delete: "ลบ",
      changeLang: "เปลี่ยนภาษา",
      edit_button: "ยินยันแก้ไขข้อมูล",
      cancel_edit_button: "ยกเลิก แก้ไขข้อมูล",
      submit_button: "ยืนยัน",
      reset_button: "ล้างข้อมูล",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
