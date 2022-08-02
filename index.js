#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

(async () => {

    // console.log(licenseData);
    await writeContributorData();
    await writeLicenseData();

})();

async function writeContributorData() {

    const licenseReq = await fetch('https://api.github.com/codes_of_conduct/contributor_covenant');
    const licenseData = await licenseReq.json();
    
    fs.writeFileSync(path.join(process.cwd(), './CONTRIBUTING.md'), cleanLicenseData(licenseData.body));

}

async function writeLicenseData() {

    const licenseReq = await fetch('https://api.github.com/licenses/mit');
    const licenseData = await licenseReq.json();
    
    fs.writeFileSync(path.join(process.cwd(), './LICENSE.md'), cleanLicenseData(licenseData.body));

}

function cleanLicenseData(licenseData) {

    licenseData = licenseData.split('\n').slice(2).join('\n')
    licenseData = licenseData.replace(/\[year\]/g, new Date().getFullYear());
    licenseData = licenseData.replace(/\[fullname\]/g, "William McGonagle");
    return licenseData;

}