const inquirer = require('inquirer');
const http = require('http');
const CacheableLookup = require('cacheable-lookup');
const sslCertificate = require('get-ssl-certificate');
const whois = require('whois')
const { Resolver } = require('dns');
const { resolve } = require('path');
const resolver = new Resolver();
const cacheable = new CacheableLookup();
resolver.setServers(['1.1.1.1'])

function getDNSCache(domain) {
    http.get(`http://${domain}`, {lookup: cacheable.lookup}, response => {
    console.log(response);
    });
}

function getCertInfo(domain) {
    sslCertificate.get(domain).then(function (certificate) {
        console.log(certificate)
    });
}

function getWhois(domain) {
    whois.lookup(domain, function(err, data) {
        if(err) {
            console.log(err); 
        } else {
            console.log(data)
        }
    });
}

function getIP(...domains) {
    for(let d in domains) {
        let resolvedList = {};
        resolver.resolve4(domains[d], (err, addresses) => {
            let resolved = {
                'domain': domains[d],
                'addresses': addresses
            }
            console.log(resolved);
            resolvedList.domains[d] = resolved;
        })
    }
    return resolvedList;
}

console.log(getIP('abevalle.com', 'valle.us', 'valle.gg'))