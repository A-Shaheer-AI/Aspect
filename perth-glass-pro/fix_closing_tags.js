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
    
    // The missing closing tags!
    content = content.replace(/<div className="text-xs text-brand-slate">Fully protected<\/div>\s*<\/div>\s*\{\/\* Badge 2 \*\/\}/g, '<div className="text-xs text-brand-slate">Fully protected</div>\n                              </div>\n                          </ClickableBadge>\n                          {/* Badge 2 */}');
    content = content.replace(/<div className="text-xs text-brand-slate">Background checked<\/div>\s*<\/div>\s*\{\/\* Badge 3 \*\/\}/g, '<div className="text-xs text-brand-slate">Background checked</div>\n                              </div>\n                          </ClickableBadge>\n                          {/* Badge 3 */}');
    content = content.replace(/<div className="text-xs text-brand-slate">Fast service<\/div>\s*<\/div>\s*\{\/\* Badge 4 \*\/\}/g, '<div className="text-xs text-brand-slate">Fast service</div>\n                              </div>\n                          </ClickableBadge>\n                          {/* Badge 4 */}');
    content = content.replace(/<div className="text-xs text-brand-slate">Happy customers<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/g, '<div className="text-xs text-brand-slate">Happy customers</div>\n                              </div>\n                          </ClickableBadge>\n                      </div>\n                  </div>\n              </section>');
    
    // Oh wait, for badge 4, the original was:
    // </div>
    // </div>
    // </div>
    // </section>
    // Let me just replace the very next </div> before the grid closes.
    // Let's use a simpler approach for Badge 4 since its trailing elements might differ.
    // We just look for "Happy customers</div>\n </div>\n </div>"
    content = content.replace(/<div className="text-xs text-brand-slate">Happy customers<\/div>\s*<\/div>\s*(?!<\/ClickableBadge>)/g, '<div className="text-xs text-brand-slate">Happy customers</div>\n                              </div>\n                          </ClickableBadge>\n');

    fs.writeFileSync(file, content, 'utf8');
});
console.log("Fixed missing closing tags");