const fs = require("fs"); 

let tg = fs.readFileSync("components/TrustGrid.tsx", "utf8");
tg = tg.replace("import { useState, useEffect } from \"react\";\\nimport { getGmbData } from \"@/app/actions/gmb\";", "import { useGmb } from \"@/components/GmbProvider\";");
tg = tg.replace(/    const \[gmb, setGmb\] = useState\(\{ rating: "5\.0", reviewCount: "30\+" \}\);\r?\n\r?\n    useEffect\(\(\) => \{\r?\n        getGmbData\(\)\.then\(data => \{\r?\n            setGmb\(\{\r?\n                rating: data\.rating\.toFixed\(1\),\r?\n                reviewCount: data\.reviewCount \+ "\+"\r?\n            \}\);\r?\n        \}\);\r?\n    \}, \[\]\);\r?\n/, "    const gmb = useGmb();\n");
fs.writeFileSync("components/TrustGrid.tsx", tg, "utf8");

let lp = fs.readFileSync("app/landing/page.tsx", "utf8");
lp = lp.replace(/import \{ getGmbData \} from "@\/app\/actions\/gmb";/g, "import { useGmb } from \"@/components/GmbProvider\";");
lp = lp.replace(/    const \[gmb, setGmb\] = useState\(\{ rating: "5\.0", reviewCount: "40\+" \}\);\r?\n    useEffect\(\(\) => \{ getGmbData\(\)\.then\(data => setGmb\(\{ rating: data\.rating\.toFixed\(1\), reviewCount: data\.reviewCount \+ "\+" \}\)\); \}, \[\]\);/g, "    const gmb = useGmb();");
fs.writeFileSync("app/landing/page.tsx", lp, "utf8");

