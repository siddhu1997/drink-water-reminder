const DPI = require('@DPI');

exports.fetchFormResponses = [
	async (_req, res) => {
		try {
			const responses = await DPI.get('Google').retrieveAllFormResponses();
			res.status(200).json({ ok: true, responses });
		} catch (error) {
			console.error(error);
			res.status(500).json({ ok: false, error: error.message });
		}
	}
];

exports.fetchForm = [
    async (req, res) => {
        try {
            const {formId} = req.query;
            const form = await DPI.get('Google').retrieveForm(formId);
            res.status(200).json({ ok: true, form });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, error: error.message });
        }
    }
];
