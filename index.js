#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

(async () => {

    const licenseReq = await fetch('https://api.github.com/licenses/mit');
    const licenseData = await licenseReq.json();
    
    fs.writeFileSync(path.join(process.cwd(), './LICENSE.md'), cleanLicenseData(licenseData.body));

    // console.log(licenseData);

})();

function cleanLicenseData(licenseData) {

    licenseData = licenseData.split('\n').slice(2).join('\n')
    licenseData = licenseData.replace(/\[year\]/g, new Date().getFullYear());
    licenseData = licenseData.replace(/\[fullname\]/g, "William McGonagle");
    return licenseData;

}