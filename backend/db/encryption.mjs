import bcrypt from 'bcrypt'

export const encrypt = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
}

export const compareHash = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}