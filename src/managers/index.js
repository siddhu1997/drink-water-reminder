const DPI = require('@DPI');

const list = ["WhatsappWebhookManager"];

try {
    let Manager;
    list.forEach((name) => {
        Manager = require(`./${name}`);
        DPI.factory(name, () => new Manager());
    });
} catch (error) {
    console.error(error);
}