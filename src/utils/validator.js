let idCardValidator = (val) => {
  let p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return p.test(val)
}
let phoneValidator = (val)=>{
    return /^1[3-9]\d{9}$/.test(val)
}
export{
    idCardValidator,
    phoneValidator
}
