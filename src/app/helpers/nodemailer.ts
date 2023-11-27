import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "i97711662@gmail.com",
    pass: "rpvq kyem jmgy qbxg",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export default transporter;