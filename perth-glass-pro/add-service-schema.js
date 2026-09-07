const fs = require('fs');
const path = require('path');

const services = [
    { id: 'residential-window-cleaning', title: 'Residential Window Cleaning' },
    { id: 'commercial-window-cleaning', title: 'Commercial Window Cleaning' },
    { id: 'gutter-cleaning', title: 'Gutter Cleaning' },
    { id: 'pressure-washing', title: 'Pressure Washing' },
    { id: 'solar-panel-washing', title: 'Solar Panel Washing' }
];

services.forEach(service => {
    const file = path.join('app/services', service.id, 'page.tsx');
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');

    const schema = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "${service.title}",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Aspect Window Cleaning"
            },
            "areaServed": {
              "@type": "State",
              "name": "Western Australia"
            },
            "url": "https://aspectwindowcleaning.com.au/services/${service.id}"
          })
        }}
      />
`;

    if (content.includes('className="bg-white text-brand-slate"')) {
        content = content.replace('className="bg-white text-brand-slate">', 'className="bg-white text-brand-slate">' + schema);
        fs.writeFileSync(file, content);
        console.log(`Injected schema to ${service.id}`);
    } else if (content.includes('className="min-h-screen bg-gray-50"')) {
        content = content.replace('className="min-h-screen bg-gray-50">', 'className="min-h-screen bg-gray-50">' + schema);
        fs.writeFileSync(file, content);
        console.log(`Injected schema to ${service.id}`);
    } else {
        console.log(`Failed to inject ${service.id}`);
    }
});
