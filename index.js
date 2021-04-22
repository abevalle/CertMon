const utils = require('./utils.js')
const http = require('http')


function getHTTPStatus(hostname, port, path, agent) {
    agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36."
    return new Promise ((resolve) => {
        http.get({"hostname": hostname, "port": port, "path": path, agent: agent}, (res, err) => {
            results = {
                code: res.statusCode,
                message: res.statusMessage
            
            }
            resolve(results)
        })
    })
}


function test(...domain) {
    for (let d in domain) {
        getHTTPStatus(domain[d], 80, '/').then(res => {
            console.log(res)
        })
    }
}

test('abevalle.com', 'valle.us', 'google.com')