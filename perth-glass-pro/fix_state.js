const fs = require('fs');
let content = fs.readFileSync('app/landing/page.tsx', 'utf8');

const injectionRegex = /const \[selectedPkg, setSelectedPkg\] = useState[\s\S]*?setIsPkgSubmitting\(false\);\s*\}\s*\};\s*/m;
content = content.replace(injectionRegex, '');

const target = 'const [submitted, setSubmitted] = useState(false);';
const insertionPoint = content.indexOf(target, content.indexOf('export default function WindowCleaningAdsPage()'));
if (insertionPoint > -1) {
    const splitPoint = insertionPoint + target.length;
    
    const newStates = `
    const [selectedPkg, setSelectedPkg] = useState<{name: string, price: string} | null>(null);
    const [pkgForm, setPkgForm] = useState({ name: "", phone: "", suburb: "" });
    const [isPkgSubmitting, setIsPkgSubmitting] = useState(false);
    const [pkgSubmitted, setPkgSubmitted] = useState(false);
    const [pkgError, setPkgError] = useState("");

    const handlePkgSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPkgSubmitting(true);
        setPkgError("");
        try {
            const res = await sendLeadEmail({
                name: pkgForm.name,
                phone: pkgForm.phone,
                suburb: pkgForm.suburb,
                serviceType: "Residential Window Cleaning",
                storeys: isDoubleStorey ? "Double Storey" : "Single Storey",
                selectedTier: selectedPkg?.name,
                quoteType: "Landing Page Package Selection",
                message: \`Selected Price: \${selectedPkg?.price}\`
            });
            if (res.error) throw new Error(res.error);
            
            trackFormCompleted();
            setPkgSubmitted(true);
            setPkgForm({ name: "", phone: "", suburb: "" });
        } catch (err) {
            setPkgError("Something went wrong. Please try again or call us.");
        } finally {
            setIsPkgSubmitting(false);
        }
    };
`;
    content = content.substring(0, splitPoint) + newStates + content.substring(splitPoint);
    fs.writeFileSync('app/landing/page.tsx', content, 'utf8');
    console.log("Fixed state injection");
}