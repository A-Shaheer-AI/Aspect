const fs = require('fs');
const path = require('path');

const targetDirs = [
    'app/services/commercial-window-cleaning/page.tsx',
    'app/services/residential-window-cleaning/page.tsx',
    'app/services/pressure-washing/page.tsx',
    'app/services/solar-panel-washing/page.tsx',
    'app/services/gutter-cleaning/page.tsx'
];

targetDirs.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    ['Shield', 'BadgeCheck', 'Clock', 'Star', 'CheckCircle'].forEach(icon => {
        if (!content.includes(icon) && content.includes('lucide-react')) {
            content = content.replace('} from "lucide-react";', `, ${icon} } from "lucide-react";`);
        }
    });

    content = content.replace(/<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">\s*(?:.*?(?:\r\n|\n)?)*?\s*<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*\$20M Insured/gm, 
        `<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
            <Shield className="w-5 h-5 text-action-gold" />
        </div>
        <div className="min-w-0">
            <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                $20M Insured`);

    content = content.replace(/<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">\s*(?:.*?(?:\r\n|\n)?)*?\s*<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*Police Cleared/gm, 
        `<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
            <BadgeCheck className="w-5 h-5 text-action-gold" />
        </div>
        <div className="min-w-0">
            <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                Police Cleared`);

    content = content.replace(/<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">\s*(?:.*?(?:\r\n|\n)?)*?\s*<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*Same-Week Bookings/gm, 
        `<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
            <Clock className="w-5 h-5 text-action-gold" />
        </div>
        <div className="min-w-0">
            <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                Same-Week Bookings`);

    content = content.replace(/<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">\s*(?:.*?(?:\r\n|\n)?)*?\s*<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*5\.0 Google Reviews/gm, 
        `<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0">
            <Star className="w-5 h-5 text-action-gold fill-action-gold" />
        </div>
        <div className="min-w-0">
            <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">
                5.0 Google Reviews`);

    // Fix broken 3-5 times per week text
    content = content.replace(/3[^a-zA-Z0-9\s]+5 times per week/g, "3-5 times per week");

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed Trust Badges on all service pages");