const companyInfo = (input) => {
  return input.map((el)=>{
    el.package = el.package.userCount
    el.status = el.payment[0].statusPayment
    return el
  })
};

export default companyInfo;
