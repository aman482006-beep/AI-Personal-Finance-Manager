(function(root,factory){
  const api=factory();
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
  if(root) root.MonetaDateUtils=api;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  "use strict";
  const pad=value=>String(value).padStart(2,"0");
  const toISODate=date=>date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getDate());
  function validLocalDate(year,month,day){
    const date=new Date(0);
    date.setFullYear(year,month-1,day);
    date.setHours(12,0,0,0);
    if(date.getFullYear()!==year||date.getMonth()!==month-1||date.getDate()!==day)return null;
    return date;
  }
  function parseDate(value,format="dmy"){
    if(value===null||value===undefined||String(value).trim()==="")return null;
    const source=String(value).trim();
    let match=source.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
    if(match){
      const date=validLocalDate(Number(match[1]),Number(match[2]),Number(match[3]));
      return date?toISODate(date):null;
    }
    match=source.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
    if(match){
      const first=Number(match[1]),second=Number(match[2]),rawYear=Number(match[3]);
      const year=rawYear<100?2000+rawYear:rawYear;
      let month,day;
      if(first>12){day=first;month=second;}
      else if(second>12){month=first;day=second;}
      else if(format==="mdy"){month=first;day=second;}
      else{day=first;month=second;}
      const date=validLocalDate(year,month,day);
      return date?toISODate(date):null;
    }
    const date=new Date(source);
    return Number.isNaN(date.getTime())?null:toISODate(date);
  }
  return {parseDate};
});
