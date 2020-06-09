//邮箱格式验证函数  用于element-ui
export function checkEmail(rule,value,callback) {
  const regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if(regEmail.test(value))
    callback()
  else
    callback(new Error('请检查邮箱格式'))
}

//手机号码格式验证函数  用于element-ui
export function checkMobile(rule,value,callback) {
  const regMobile = /^1[3456789]\d{9}$/
  if(regMobile.test(value))
    callback()
  else
    callback(new Error('请检查手机号码'))
}