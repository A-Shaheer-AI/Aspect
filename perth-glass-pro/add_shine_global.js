const fs = require('fs');

const file = 'components/ui/StickyInterface.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find the <a href={`tel:${BUSINESS.phoneRaw}`}>
const targetLink = `className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 active:scale-95 transition-all md:hidden"`;
const replacementLink = `className="fixed bottom-20 right-4 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 active:scale-95 transition-all md:hidden shiny-call-btn"`;

if (content.includes(targetLink)) {
    content = content.replace(targetLink, replacementLink);
    
    // Add the shiny-call-btn css to the existing <style jsx> block
    const cssToInject = `
                @keyframes btn-shine {
                    0% { left: -100%; }
                    20% { left: 100%; }
                    100% { left: 100%; }
                }
                .shiny-call-btn {
                    position: relative;
                    overflow: hidden;
                }
                .shiny-call-btn::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
                    transform: skewX(-25deg);
                    animation: btn-shine 3s infinite;
                }
`;
    
    // insert right after <style jsx>{`
    content = content.replace("<style jsx>{`", "<style jsx>{`\n" + cssToInject);
    
    fs.writeFileSync(file, content, 'utf8');
    console.log("Added shiny animation to StickyInterface");
} else {
    console.log("Target link not found in StickyInterface.");
}