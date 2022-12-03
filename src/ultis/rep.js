const response = (success = true, data = {}, message = '') => {
    if (success) {
      return {
        success,
        data
      }
    } else {
      return {
        success,
        message
      }
    }
  }