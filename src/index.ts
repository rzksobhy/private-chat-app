import express from "express";
import ExpressAppBuilder from "./builders/express";

async function main() {
    const app = ExpressAppBuilder.builder().build();

    app.listen();
}

main()
    .then(() => console.log("app is running successfully"))
    .catch((error) => {
        console.error("error someting went wrong");
        console.error(error);
    });
