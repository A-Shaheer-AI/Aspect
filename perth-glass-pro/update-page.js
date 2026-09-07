const fs = require('fs');
let content = fs.readFileSync('app/case-studies/[slug]/page.tsx', 'utf8');

const injection = 
                        {/* Google Posts Links */}
                        {cs.googlePosts && cs.googlePosts.length > 0 && (
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-10">
                                <h3 className="text-lg font-bold text-brand-navy mb-3">View More on Google Updates</h3>
                                <p className="text-sm text-gray-600 mb-4">Check out our official Google Business Profile updates for more photos and behind-the-scenes details of this job.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {cs.googlePosts.map((link, index) => (
                                        <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-brand-navy font-semibold px-4 py-2.5 rounded-lg hover:border-action-gold hover:text-action-gold transition-colors text-sm shadow-sm">
                                            Google Update {index + 1} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Tags / backlink section */};

content = content.replace('{/* Tags / backlink section */}', injection);

fs.writeFileSync('app/case-studies/[slug]/page.tsx', content);
console.log('Updated page.tsx');
