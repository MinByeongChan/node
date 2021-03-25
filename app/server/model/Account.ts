import mongoose, { Model, Schema, Document, Collection } from "mongoose";
import crypto from "crypto";

// 인터페이스 선언
// interface AccountInterface {
//   profile: any;
//   email: string;
//   social: any;
//   password: string;
//   thoughtCount: number;
//   createdAt: Date;
// }

// interface AccountDocument extends AccountInterface, Document {
//   valadataPassword: (password: string) => Promise<boolean>;
// }

// interface AccountModel extends Model<AccountDocument> {
//   findByEmail: (email: string) => Promise<AccountDocument>;
//   findByUsername: (username: string) => Promise<AccountDocument>;
// }

const Account: Schema = new Schema({
  profile: {
    username: String,
    thumbnail: {
      type: String,
      default: "/static/images/default_thumbnail.png",
    },
  },
  email: {
    type: String,
  },
  social: {
    facebook: {
      id: String,
      accessToken: String,
    },
    google: {
      id: String,
      accessToken: String,
    },
  },
  password: String, // 로컬계정의 경우엔 비밀번호를 해싱해서 저장.
  thoughtCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const hash = (password) => {
  return crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
};

Account.statics.findByEmail = async (email: string) => {
  return this.findOne({ email }).exec();
};

Account.statics.findByUsername = async (username: string) => {
  return this.findOne({ username }).exec();
};

Account.statics.findByEmailOrUsername = (username: string, email: string) => {
  return this.findOne({
    $or: [{ "profile.username": username }, { email }],
  }).exec();
};

Account.statics.localRegister = ({ username, email, password }): string => {
  const account = new this({
    profile: {
      username,
    },
    email,
    password: hash(password),
  });

  return account.save();
};

Account.methods.valadataPassword = async (password: string) => {
  const hashed = hash(password);
  return this.password === hashed;
};

export default mongoose.model("Account", Account);
