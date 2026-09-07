const fs = require('fs');
let content = fs.readFileSync('app/case-studies/[slug]/page.tsx', 'utf8');

const galleryUI = 
                        {/* Project Gallery */}
                        {cs.images && cs.images.length > 0 && (
                            <div className="mb-10">
                                <h2 className="text-2xl font-heading font-bold text-brand-navy mb-6">Project Gallery</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {cs.images.map((img, idx) => (
                                        <div key={idx} className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                            <Image
                                                src={img}
                                                alt={\\ - Gallery Image \\}
                                                fill
                                                className="object-cover hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Google Posts Links */};

content = content.replace('{/* Google Posts Links */}', galleryUI);

fs.writeFileSync('app/case-studies/[slug]/page.tsx', content);
console.log('Added Image Gallery UI');
