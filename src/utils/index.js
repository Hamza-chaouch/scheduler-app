
export const toTimestamp = (year, month, day, hour, minute = 0, second = 0) => {
    var datum = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    return datum.getTime();
  }

export const exportDurationFromTImeStampWithMin = (start , end) => {

  
  var durationsMapping = [
    {30: 'Half an Hour'},
    {60: 'An Hour'},
    {90: 'An Hour & Half'},
    {120: 'Two Hours'} 
  ]

  const res =   durationsMapping.map( (key,val) => {
      if(key === (end - start) ) {
        return val
      }
    })

   return val
 

}  
