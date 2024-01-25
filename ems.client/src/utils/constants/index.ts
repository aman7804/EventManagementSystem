export const INTERNAL_SERVER_ERROR = "Internal Server Error";
export const SOMETHING_WENT_WRONG = "Something went wrong";

export const FOOTER_TEXT =
  "©2024 Navgujarat College of Computer Application Gandhinagar. All rights reserved.";

export const PAGE_SIZES = [
  { value: 5, label: 5, selected: true },
  { value: 10, label: 10 },
  { value: 20, label: 20 },
  { value: 50, label: 50 },
];

export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_PATTERN = 
/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>[~'"`?/\]]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/;