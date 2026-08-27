const fs = require("fs"); let content = fs.readFileSync("app/actions/gmb.ts", "utf8"); content = content.replace(/"use server";\s*/g, ""); fs.writeFileSync("app/actions/gmb.ts", content, "utf8");
