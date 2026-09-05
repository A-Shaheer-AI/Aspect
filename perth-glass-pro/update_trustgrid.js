const fs = require('fs');
const file = 'components/TrustGrid.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('openCertificateModal')) {
    content = content.replace('import { Shield, Clock, Award, Star } from "lucide-react";', 'import { Shield, Clock, Award, Star } from "lucide-react";\nimport { openCertificateModal } from "@/components/CertificateModalWrapper";');
}

const targetReturn = `return (
                            <motion.div
                                key={badge.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-[#ffe54d]/40 hover:shadow-lg transition-all duration-300"
                            >`;

const replaceReturn = `return (
                            <motion.div
                                key={badge.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => {
                                    if (badge.title.includes("Insured")) openCertificateModal('insured');
                                    if (badge.title.includes("Police")) openCertificateModal('police');
                                }}
                                className={"group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-[#ffe54d]/40 hover:shadow-lg transition-all duration-300 " + (badge.title.includes("Insured") || badge.title.includes("Police") ? "cursor-pointer" : "")}
                            >`;

content = content.replace(targetReturn, replaceReturn);
fs.writeFileSync(file, content, 'utf8');
console.log("Updated TrustGrid");