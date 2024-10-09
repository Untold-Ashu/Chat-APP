import otpGenerator from 'otp-generator';
const otp = otpGenerator.generate(6, {
    digits: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, specialChars: true
  });
  console.log(otp);
  export default otp;