// Data types here
export type TUser = {
  id: string,
  username: string,
  email: string,
  description?: string,
  profileImageUrl?: string,
  form: TForm
}

export type TForm = {
  fields: TFormField[]
}

export type TFormField = {
  type: string,
  text: string,
  inputValue: string
}
