const fs = require('fs');
const file = 'components/CertificateModalWrapper.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    'insured: "", // To be filled',
    'insured: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1788618147/20_Million_Insurance_Cover_dyjc9i.jpg",'
);

content = content.replace(
    'police: ""   // To be filled',
    'police: "https://res.cloudinary.com/dr8tjrszy/image/upload/v1788618145/Police_Check_Clearance_ywnsjp.jpg"'
);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated CertificateModalWrapper with image URLs");