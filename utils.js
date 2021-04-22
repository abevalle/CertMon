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

const getDNSCache = (domain) => {
    http.get(`http://${domain}`, {lookup: cacheable.lookup}, response => {
    console.log(response);
    });
};

const getCertInfo = (domain) => {
    sslCertificate.get(domain).then((certificate) => {
        console.log(certificate)
    });
};

const getWhois = (domain) => {
    whois.lookup(domain, (err, data) => {
        if(err) {
            console.log(err); 
        } else {
            console.log(data)
        }
    });
};

// let resolvedList = {}

const getIP = (domain) => {
    let resolvedList = {}
    resolver.resolve4(domain, (err, addresses) => {
        if (err) {
            return err;
        } else {
            resolvedList[domain] = {
                'addresses': addresses
            }
            console.log('CL: '+JSON.stringify(resolvedList))
            return `${JSON.stringify(resolvedList)}`;
        }
    })
};

exports.getIP = getIP;
exports.getWhois = getWhois;
exports.getCertInfo = getCertInfo;
exports.getDNSCache = getDNSCache;