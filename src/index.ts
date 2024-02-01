import ExpressAppBuilder from "./builders/express";
import { fromEnvOrThrow } from "./utils/env";
import ipaddress from "./utils/ipaddress";

async function main() {
    const port = +fromEnvOrThrow("PORT");
    const address = ipaddress();
    const app = ExpressAppBuilder.builder().build();

    app.listen(port, address);
}

main()
    .then(() => console.log("app is running successfully"))
    .catch((error) => {
        console.error("error someting went wrong");
        console.error(error);
    });
