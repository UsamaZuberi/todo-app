/* ------------------------------------------------------------------------- */
/* 1. ************************* Email Validation *************************** */
/* ------------------------------------------------------------------------- */
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      // eslint-disable-next-line
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
/* ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------- */
/* 2. ************************ Password Validation ************************* */
/* ------------------------------------------------------------------------- */
export const validatePassword = (password) => {
  // Min 8 letter password, with at least a symbol, upper and lower case letters and a number
  const regularExp =
  // eslint-disable-next-line
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-\"!@#%&\/,><\':;|_~`=+\\])\S{8,99}$/;
  return regularExp.test(password);
};
/* ------------------------------------------------------------------------- */

/* ------------------------------------------------------------------------- */
/* 2. ************************ Generates Random GUID ************************* */
/* ------------------------------------------------------------------------- */
export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //  return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};
