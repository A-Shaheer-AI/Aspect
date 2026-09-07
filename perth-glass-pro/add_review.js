const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const newReview = `
        ,{
            id: 6,
            name: "Katie Hunter",
            reviews: "4 reviews",
            rating: 5,
            date: "12 weeks ago",
            content: "Flynn cleaned the top story of our house including sky lights and solar panels. He did a fantastic job. The equipment he uses is amazing. I wouldn't hesitate to recommend Aspect Window Cleaning."
        }
    ];`;

content = content.replace(/(\}\s*)\n\s*\];/, `$1${newReview}`);

fs.writeFileSync('app/landing/page.tsx', content, 'utf8');