// Import objects
const responses = require('./responses') 
const parameters = require('./parameter') 

function parseSchemas(schemas) {

  const res = [] 
  let pathParameters = null 

  console.log(schemas)

  Object.keys(schemas).map(
    name => {
        let data = schemas[name]

        if (!('title' in data)) {
            console.log(`No tite, skipping ${name}`)
            return;
        }

        console.log(name)
        console.log(data)

        // Make path as a header
        res.push(`## ${data.title} \n`) 

        if ('description' in data) {
            res.push(`${data.description} \n`) 
        }

        if ('properties' in data) {
            res.push(`${parseProperties(data.properties)}\n`) 
        }

    }
  )
  return res.length ? res.join('\n') : null 
} 

function parseProperties(properties) {

    const res = [] 
    res.push('| Attribute | Type | Description | ') 
    res.push('| ---- | -------- | ---- |') 
    
    // Maps the parameters and set values into the parameters value line
    var arr =[]
    Object.keys(properties).map(
        name => {
            let data = properties[name]
            const line = [] 
            line.push(name)

            if ('$ref' in data) {
                let type = data['$ref'] 
                type = type.substr(type.lastIndexOf('/') + 1)
                line.push(`[${type}](#schema-${type})`)
            } else {
                line.push(data.type)
            }
            line.push(data.description)

            res.push(`|${line.map(el => ` ${el} `).join('|')}|`) 

        }
    )

    return res.join('\n') 
}

function parseRequestBody(requestBodyDefintion) {

    const res = [] 
    res.push('> Request \n')
    
    res.push('```json')
    res.push('{"foo": "bar"}')
    res.push('```')
    
    res.push('```python')
    res.push('{"foo": "bar"}')
    res.push('```')
    
    res.push('```ruby')
    res.push('{"foo": "bar"}')
    res.push('```')
    
    return res.join('\n') 

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

module.exports = {parseSchemas, parseRequestBody}
