import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      name: "Name",
      firstname: "Firstname",
      lastname: "Lastname",
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
      title: "Title",
      gender: "Gender",
      gender_male: "Male",
      gender_female: "Female",
      gender_unsex: "Unsex",
      title_placeholder: "-- Please Select --",
      title_Mr: "Mr.",
      title_Mrs: "Mrs.",
      title_Ms: "Ms.",
      citizen_id: "CitizenID :",
      nationality: "Nationality",
      nationality_placeholder: "-- Please Select --",
      nationality_thai: "Thai",
      nationality_other: "Other",
      birthday: "Birthday",
      birthday_required: "Please select your birthday!",
      birthday_placeholder: "Please select your birth date",
      passport_no: "Passport No.",
      expected_salary: "Expected Salary",
      expected_salary_required: "Please enter expected salary",
      next: "NEXT",
      previous: "PREV",
    },
  },
  th: {
    translation: {
      name: "ชื่อ-นามสกุล",
      firstname: "ชื่อจริง",
      lastname: "นามสกุล",
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
      title: "คำนำหน้า",
      gender: "เพศ",
      gender_male: "ชาย",
      gender_female: "หญิง",
      gender_unsex: "ไม่ระบุ",
      title_placeholder: "-- กรุณาเลือก --",
      title_Mr: "นาย",
      title_Mrs: "นาง",
      title_Ms: "นางสาว",
      citizen_id: "หมายเลขประจำตัวประชาชน :",
      nationality: "สัญชาติ",
      nationality_placeholder: "-- กรุณาเลือก --",
      nationality_thai: "ไทย",
      nationality_other: "อื่น ๆ",
      birthday: "วันเกิด",
      birthday_required: "กรุณาเลือกวันเกิด!",
      birthday_placeholder: "กรุณาเลือกวันเกิด",
      passport_no: "หมายเลขหนังสือเดินทาง",
      expected_salary: "เงินเดือนที่คาดหวัง",
      expected_salary_required: "กรุณากรอกเงินเดือนที่คาดหวัง",
      next: "ถัดไป",
      previous: "ก่อนหน้า",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
