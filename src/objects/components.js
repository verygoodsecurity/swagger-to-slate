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

function parseRequestBody(requestBodyDefinition, inputDoc) {

    const res = [] 

    if ('$ref' in requestBodyDefinition) {
        let type = requestBodyDefinition['$ref'] 

        
        // need to resolve this reference
        let components = type.split('/')
        let definition = inputDoc;
        for (let i = 1;  i < components.length;  i++) {
            definition = definition[components[i]]
        }

        // definition now holds the referenced component so let's render it
        if (definition.content && 'application/json' in definition.content) {
            let examples = definition.content['application/json'].examples

            Object.keys(examples).map(
                language => {
                    if (!search(language, ['ruby', 'python', 'shell'])) {
                        return
                    }
                    res.push('```' + language)
                    res.push(examples[language].description)
                    res.push('``` \n')
                }
            )

        }


    } else {
        console.log(`No reference to request body for ${requestBodyDefinition}, skipping`)
    }

    // // find referenced doc and turn it into the response payload we want to show
    // res.push('> Request \n')
    
    // res.push('```shell')
    // res.push('{"foo": "bar"}')
    // res.push('```')
    
    // res.push('```python')
    // res.push('{"foo": "bar"}')
    // res.push('```')
    
    // res.push('```ruby')
    // res.push('{"foo": "bar"}')
    // res.push('```')
    
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
