// Import objects
const responses = require('./responses') 
const parameters = require('./parameter') 
const Components = require('./components') 

// Allowed HTTP method
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'] 

function parse(path, data, inputDoc) {

  const res = [] 
  let pathParameters = null 

  if (path && data) {

    // Check if parameter for path are in the place
    if ('parameters' in data) {
      pathParameters = data.parameters 
    }

    // Go further method by methods
    Object.keys(data).map(method => {

      if (search(method, ALLOWED_METHODS)) {

        const pathInfo = data[method] 

        // Set summary
        if (!('summary' in pathInfo)) {
          return;
        }

        res.push(`## ${pathInfo.summary}\n`) 

        // Set path
        res.push(`<span class="url"><span class="method">\`${method.toUpperCase()}\`</span><span class="path">${path}</span> \n`)

        // Set description
        if ('description' in pathInfo) {
          res.push(`${pathInfo.description}\n`) 
        }

        // Build parameters
        if ('parameters' in pathInfo || pathParameters) {
          res.push(`${parameters.parse(pathInfo.parameters, pathParameters)}\n`) 
        }

        if ('requestBody' in pathInfo) {
          res.push(`${Components.parseRequestBody(pathInfo.requestBody, inputDoc)}\n`) 
        }

        // Build responses
        if ('responses' in pathInfo) {
          res.push(`${responses.parse(pathInfo.responses)}\n`) 
        }
      }
    }) 
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

module.exports = {parse}
