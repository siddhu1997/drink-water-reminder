const dayjs = require('dayjs');
const BaseManager = require('../BaseManager');

class GoogleFormsManager extends BaseManager {
    constructor() {
        super();
        this.db = this.DPI.get("GoogleForms");
    }

    #serializeGoogleForm(form) {
        const { formId, info: { title }, items } = form;
        const document = {
            formId,
            title,
            items: items.map(item => {
                const { itemId, title: questionTitle, questionItem: { question } } = item;
                return {
                    itemId,
                    questionItem: {
                        title: questionTitle,
                        questionId: question.questionId
                    }
                };
            })
        }

        return document;
    }

    async fetchGoogleFormByFormId(formId, updateForm = false) {
        try {
            let form = await this.db.findOne({ formId });
            if (form && !updateForm) {
                return form.lean();
            }
            form = await this.DPI.get("Google").retrieveForm(formId);
            if (!form) {
                throw new Error("Form not found");
            }
            form = this.#serializeGoogleForm(form);
            await this.db.findOneAndUpdate({ formId }, form, { upsert: true });
            return form;
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
        
    }

    async serializeOnboardingFromResponse(formId, responses) {
        const form = await this.fetchGoogleFormByFormId(formId);
        return responses.map(({ answers }) => {
            const keys = Object.keys(answers);
            const userDetails = keys.reduce((acc, key) => {
                const questionItem = form.items.find(item => item.questionItem.questionId === key);
                if (questionItem) {
                    const questionTitle = questionItem.questionItem.title.toLowerCase();
                    const { value } =  answers[key].textAnswers.answers[0];
                    if (questionTitle.contains("name")) {
                        acc.name = value;
                    }
                    if (questionTitle.contains("phone number")) {
                        const phoneNumber = value.replace('+', '');
                        if (phoneNumber) {
                            acc.phoneNumber = phoneNumber;
                        }
                    }
                    if (questionTitle.contains("date of birth")) {
                        acc.dob = dayjs(value, 'YYYY-MM-DD').toDate();
                    }
                    if (questionTitle.contains("sex")) {
                        acc.sex = value.toLowerCase();
                    }
                    if (questionTitle.contains("activity level")) {
                        acc.activityLevel = value.toLowerCase();
                    }
                    if (questionTitle.contains("metric")) {
                        const [metric] = value.toLowerCase().split(' ');
                        acc.metric = metric;
                    }
                    if (questionTitle.contains("your weight")) {
                        acc.weight = Number(value);
                    }
                } else {
                    acc.hasError = true;
                }
                return acc;
            }, {});
            return userDetails;
        });
    }
}

module.exports = GoogleFormsManager;