const validate = {
   required(value) {
      console.log('value: ', value)
      return value.trim() ? true : false
   },

   minLength(value, min) {
      return value.trim().length >= min ? true : false
   },

   checkErrors(object) {
      console.log('object: ', object)
      let error = false
      for (let key in object) {
         if (object[key]) error = true
      }

      return error
   },
}

export default validate
