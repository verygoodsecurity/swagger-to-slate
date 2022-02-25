// Import objects
const responses = require('./responses') 
const parameters = require('./parameter') 

function parseSchemas(path, data) {

  const res = [] 
  let pathParameters = null 

  if (path && data) {

    // Make path as a header
    res.push(`## ${data.title} \n`) 

    if ('description' in data) {
        res.push(`${data.description} \n`) 
    }

    if ('properties' in data) {
        res.push(`${parameters.parse(null, data.properties)}\n`) 
    }
  }
  return res.length ? res.join('\n') : null 
} 

// To search entry into array
function search(key, array) {
  if (array === undefined || array === null) return false 
  if (array.length) {
    for (let i = 0;  i < array.length;  i++) {
      if (key === array[i]) {
        return true 
      }
    }
  }
  return false 
} 

module.exports = {parseSchemas}
