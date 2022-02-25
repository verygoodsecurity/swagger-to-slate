// To parse the info object
function parse(info){

    // To store the info object
    const res = [] 

    if (info !== null && typeof info === 'object') {

        res.push(`--- \n`)

        // Introduction part
        res.push(`# ${info.title} \n`)

        if ('description' in info) {
            res.push(`${info.description} \n`) 
        }

        if ('version' in info) {
            res.push(`**Version:** ${info.version} \n`) 
        }

    }
    return res.length ? res.join('\n') : null 
}

// Export the parse object
module.exports = {parse}
