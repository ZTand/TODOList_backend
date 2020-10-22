import Joi from '@hapi/joi';
import User from './models/user';

/*
  POST /register
  {
    username: 'ZTand',
    id: 'testID',
    password: 'testPW'
  }
*/
export const register = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    id: Joi.string()
      .alphanum() // [a-z, A-Z, 0-9]
      .min(4)
      .max(16)
      .required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // wrong request
    ctx.body = result.error;
    return;
  }

  const { username, id, password } = ctx.request.body;
  try {
    const existsUsername = await User.findByUsername(username);
    const existsId = await User.findById(id);
    if (existsUsername || existsId) {
      ctx.status = 409; // conflict
      return;
    }

    const user = new User({
      username,
      id,
    });
    await user.setPassword(password);
    await user.save();
    ctx.body = user;
  } catch (e) {
    ctx.throw(500, e); // Internal Server error
  }
};

/*
  POST /login
  {
    id: 'testID'
    password: 'testPW'
  }
*/
export const login = async (ctx) => {
  const { id, password } = ctx.request.body;

  if (!id || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      ctx.status = 401; // Unauthorized
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401; // Unauthorized
      return;
    }
    ctx.body = user;
  } catch (e) {
    ctx.throw(500, e); // Internal Server error
  }
};

export const shop = (ctx) => {};
