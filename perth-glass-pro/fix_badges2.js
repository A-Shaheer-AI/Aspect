const fs = require('fs');

const targetDirs = [
    'app/services/commercial-window-cleaning/page.tsx',
    'app/services/residential-window-cleaning/page.tsx',
    'app/services/pressure-washing/page.tsx',
    'app/services/solar-panel-washing/page.tsx',
    'app/services/gutter-cleaning/page.tsx'
];

targetDirs.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // add lucide-react imports
    if (!content.includes('Shield') && content.includes('lucide-react')) {
        content = content.replace('} from "lucide-react";', ', Shield, BadgeCheck, Clock, Star, CheckCircle } from "lucide-react";');
    }

    // Replace the exact mojibake block. 
    // Wait! Since it's corrupted, it's easier to just match:
    // <div className="w-9 h-9 ... text-2xl flex-shrink-0"> WHATEVER IS HERE </div>
    // \s* <div className="min-w-0"> \s* <div className="font-semibold text-brand-navy text-sm md:text-base leading-tight"> \s* TEXT
    
    const block1Regex = /<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">[\s\S]*?<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*\$20M Insured/g;
    content = content.replace(block1Regex, '<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Shield className="w-5 h-5 text-action-gold" /></div>\n<div className="min-w-0">\n<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\n$20M Insured');

    const block2Regex = /<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">[\s\S]*?<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*Police Cleared/g;
    content = content.replace(block2Regex, '<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><BadgeCheck className="w-5 h-5 text-action-gold" /></div>\n<div className="min-w-0">\n<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\nPolice Cleared');

    const block3Regex = /<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">[\s\S]*?<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*Same-Week Bookings/g;
    content = content.replace(block3Regex, '<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Clock className="w-5 h-5 text-action-gold" /></div>\n<div className="min-w-0">\n<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\nSame-Week Bookings');

    const block4Regex = /<div className="w-9 h-9 flex items-center justify-center bg-action-gold\/10 rounded-xl text-2xl flex-shrink-0">[\s\S]*?<\/div>\s*<div className="min-w-0">\s*<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\s*5\.0 Google Reviews/g;
    content = content.replace(block4Regex, '<div className="w-9 h-9 flex items-center justify-center bg-action-gold/10 rounded-xl flex-shrink-0"><Star className="w-5 h-5 text-action-gold fill-action-gold" /></div>\n<div className="min-w-0">\n<div className="font-semibold text-brand-navy text-sm md:text-base leading-tight">\n5.0 Google Reviews');

    // 3-5 times
    content = content.replace(/3[^\w\s]+5 times per week/g, "3-5 times per week");

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Replaced mojibake with SVGs");